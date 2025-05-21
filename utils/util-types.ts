// types.ts
export interface User {
    id: string;
    organizationId: string;
    email: string;
    role: 'admin' | 'member';
  }
  
  export interface Job {
    id: string;
    organizationId: string;
    fileName: string;
    fileSize: number;
    duration?: number;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    batchId?: string;
    transcription?: string;
    analysis?: AnalysisResult;
    error?: string;
    createdAt: number;
    updatedAt: number;
    completedAt?: number;
  }
  
  export interface Batch {
    id: string;
    organizationId: string;
    totalFiles: number;
    processedFiles: number;
    status: 'processing' | 'completed' | 'failed';
    createdAt: number;
    updatedAt: number;
    completedAt?: number;
  }
  
  export interface AnalysisResult {
    topics: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
    customerSatisfaction: number;
    problemResolved: boolean;
    summary: string;
    keyInsights: string[];
  }
  
  export interface QueueMessage {
    jobId: string;
    fileName: string;
    organizationId: string;
    batchId?: string;
  }
  
  export interface Env {
    AUDIO_BUCKET: R2Bucket;
    AUDIO_QUEUE: Queue;
    DB: D1Database;
    RATE_LIMITER: DurableObjectNamespace;
    GROQ_API_KEY: string;
    JWT_SECRET: string;
  }