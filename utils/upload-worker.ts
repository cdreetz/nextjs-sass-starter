// upload-worker.ts
import { User, Job, Env } from './util-types';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Verify authentication
      const user = await authenticateRequest(request, env) as User;
      
      // Handle multipart form upload
      const formData = await request.formData();
      const audioFile = formData.get('file') as File;
      
      if (!audioFile) {
        return new Response(JSON.stringify({ error: 'No file provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Validate file type
      if (!audioFile.type.startsWith('audio/')) {
        return new Response(JSON.stringify({ error: 'Invalid file type. Only audio files are accepted.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Store file in R2
      const fileName = `${user.organizationId}/${Date.now()}-${audioFile.name}`;
      await env.AUDIO_BUCKET.put(fileName, audioFile.stream(), {
        customMetadata: {
          uploadedBy: user.id,
          originalName: audioFile.name
        }
      });
      
      // Create batch or use existing
      const batchId = formData.get('batchId')?.toString() || crypto.randomUUID();
      
      // Create job record in D1
      const jobId = crypto.randomUUID();
      await env.DB.prepare(`
        INSERT INTO jobs (
          id, organization_id, file_name, file_size, status, batch_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        jobId, 
        user.organizationId, 
        fileName, 
        audioFile.size, 
        'queued', 
        batchId, 
        Date.now(), 
        Date.now()
      ).run();
      
      // Update or create batch record
      if (formData.get('batchId')) {
        await env.DB.prepare(`
          UPDATE batches 
          SET total_files = total_files + 1, updated_at = ? 
          WHERE id = ?
        `).bind(Date.now(), batchId).run();
      } else {
        await env.DB.prepare(`
          INSERT INTO batches (
            id, organization_id, total_files, processed_files, status, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          batchId, 
          user.organizationId, 
          1, 
          0, 
          'processing', 
          Date.now(), 
          Date.now()
        ).run();
      }
      
      // Add to processing queue
      await env.AUDIO_QUEUE.send({
        jobId,
        fileName,
        organizationId: user.organizationId,
        batchId
      });
      
      // Track usage for billing
      await trackUsage(env, user.organizationId, audioFile.size);
      
      return new Response(JSON.stringify({ 
        jobId, 
        batchId,
        status: 'queued' 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      return new Response(JSON.stringify({ error: 'Upload failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

async function authenticateRequest(request: Request, env: Env): Promise<User | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  
  const token = authHeader.split(' ')[1];
  // Implement JWT verification using env.JWT_SECRET
  // Return user object with id and organizationId
  
  // Placeholder implementation
  return { id: 'user-123', organizationId: 'org-123', email: 'user@example.com', role: 'admin' };
}

async function trackUsage(env: Env, organizationId: string, fileSize: number): Promise<void> {
  await env.DB.prepare(`
    INSERT INTO usage_records (
      organization_id, file_size, recorded_at
    ) VALUES (?, ?, ?)
  `).bind(organizationId, fileSize, Date.now()).run();
}