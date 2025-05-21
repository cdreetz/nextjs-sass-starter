// queue-consumer.ts
import { Env, QueueMessage, AnalysisResult } from './util-types';

export default {
  async queue(batch: MessageBatch<QueueMessage>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const job = message.body;
      
      try {
        // Update job status
        await env.DB.prepare(`
          UPDATE jobs 
          SET status = ?, updated_at = ? 
          WHERE id = ?
        `).bind('processing', Date.now(), job.jobId).run();
        
        // Get file from R2
        const audioFile = await env.AUDIO_BUCKET.get(job.fileName);
        if (!audioFile) throw new Error("File not found");
        
        // Apply rate limiting using Durable Objects
        const rateLimiter = env.RATE_LIMITER.get(
          env.RATE_LIMITER.idFromName(job.organizationId)
        );
        await rateLimiter.fetch("https://dummy-url/acquire");
        
        try {
          // Process with Groq for transcription
          const audioBuffer = await audioFile.arrayBuffer();
          const transcription = await processWithGroq(
            audioBuffer,
            env.GROQ_API_KEY
          );
          
          // Get audio duration
          const duration = await extractAudioDuration(audioBuffer);
          
          // Process with Groq for analysis
          const analysis = await analyzeWithGroq(
            transcription,
            env.GROQ_API_KEY
          );
          
          // Update job with results
          await env.DB.prepare(`
            UPDATE jobs 
            SET status = ?, 
                transcription = ?,
                analysis = ?,
                duration = ?,
                completed_at = ?,
                updated_at = ? 
            WHERE id = ?
          `).bind(
            'completed', 
            transcription,
            JSON.stringify(analysis),
            duration,
            Date.now(),
            Date.now(),
            job.jobId
          ).run();
          
          // Update batch progress
          if (job.batchId) {
            await updateBatchProgress(env, job.batchId);
          }
          
        } finally {
          // Release rate limiter token
          await rateLimiter.fetch("https://dummy-url/release");
        }
        
      } catch (error) {
        console.error(`Error processing job ${job.jobId}:`, error);
        
        // Update job with error
        await env.DB.prepare(`
          UPDATE jobs 
          SET status = ?, 
              error = ?,
              updated_at = ? 
          WHERE id = ?
        `).bind(
          'failed', 
          error instanceof Error ? error.message : String(error),
          Date.now(),
          job.jobId
        ).run();
        
        // Update batch status if needed
        if (job.batchId) {
          await updateBatchProgress(env, job.batchId);
        }
      }
    }
  }
};

async function processWithGroq(audioBuffer: ArrayBuffer, apiKey: string): Promise<string> {
  // Implementation to call Groq API for transcription
  // This would use fetch to call Groq's API with the audio data
  
  // Placeholder
  return "This is a sample transcription text.";
}

async function analyzeWithGroq(transcription: string, apiKey: string): Promise<AnalysisResult> {
  // Implementation to call Groq API for analysis
  // This would send the transcription to Groq's API for analysis
  
  // Placeholder
  return {
    topics: ["billing", "account access"],
    sentiment: "positive",
    customerSatisfaction: 8,
    problemResolved: true,
    summary: "Customer called about accessing their account and was helped successfully.",
    keyInsights: ["Customer was satisfied with the resolution"]
  };
}

async function extractAudioDuration(audioBuffer: ArrayBuffer): Promise<number> {
  // In reality, this would use audio processing libraries
  // Since we're in a Cloudflare Worker, we might need to use a lightweight solution
  // or rely on metadata if available
  
  // Placeholder: return estimated duration based on file size and bit rate
  return Math.floor(audioBuffer.byteLength / (128 * 1024 / 8)); // Rough estimate assuming 128kbps
}

async function updateBatchProgress(env: Env, batchId: string): Promise<void> {
  // Get current batch stats
  const batchStats = await env.DB.prepare(`
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM jobs
    WHERE batch_id = ?
  `).bind(batchId).first<{ total: number, completed: number, failed: number }>();
  
  if (!batchStats) return;
  
  const processedFiles = batchStats.completed + batchStats.failed;
  const isComplete = processedFiles === batchStats.total;
  const status = isComplete ? 'completed' : 'processing';
  const completedAt = isComplete ? Date.now() : null;
  
  await env.DB.prepare(`
    UPDATE batches
    SET 
      processed_files = ?,
      status = ?,
      updated_at = ?,
      completed_at = ?
    WHERE id = ?
  `).bind(
    processedFiles,
    status,
    Date.now(),
    completedAt,
    batchId
  ).run();
}