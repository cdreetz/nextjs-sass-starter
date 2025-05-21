// job-status-worker.ts
import { Env, Job } from './types';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Authenticate request
      const user = await authenticateRequest(request, env);
      
      const url = new URL(request.url);
      const path = url.pathname.split('/');
      
      // Handle different endpoints
      if (path[1] === 'jobs' && path[2]) {
        return await getJobStatus(path[2], user.organizationId, env);
      } else if (path[1] === 'batches' && path[2]) {
        return await getBatchStatus(path[2], user.organizationId, env);
      } else if (path[1] === 'organization' && path[2] === 'jobs') {
        return await listOrganizationJobs(user.organizationId, request.url, env);
      }
      
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Error in status worker:', error);
      return new Response(JSON.stringify({ error: 'Operation failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

async function getJobStatus(jobId: string, organizationId: string, env: Env): Promise<Response> {
  const job = await env.DB.prepare(`
    SELECT * FROM jobs WHERE id = ? AND organization_id = ?
  `).bind(jobId, organizationId).first();
  
  if (!job) {
    return new Response(JSON.stringify({ error: "Job not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Parse JSON fields
  if (job.analysis && typeof job.analysis === 'string') {
    job.analysis = JSON.parse(job.analysis);
  }
  
  return new Response(JSON.stringify(job), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getBatchStatus(batchId: string, organizationId: string, env: Env): Promise<Response> {
  const batch = await env.DB.prepare(`
    SELECT * FROM batches WHERE id = ? AND organization_id = ?
  `).bind(batchId, organizationId).first();
  
  if (!batch) {
    return new Response(JSON.stringify({ error: "Batch not found" }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Get job statuses for this batch
  const jobStats = await env.DB.prepare(`
    SELECT 
      status, 
      COUNT(*) as count
    FROM jobs 
    WHERE batch_id = ? 
    GROUP BY status
  `).bind(batchId).all();
  
  return new Response(JSON.stringify({
    ...batch,
    jobStats: jobStats.results
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function listOrganizationJobs(
  organizationId: string, 
  requestUrl: string, 
  env: Env
): Promise<Response> {
  const url = new URL(requestUrl);
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const status = url.searchParams.get('status');
  const batchId = url.searchParams.get('batchId');
  
  // Build query
  let query = `
    SELECT * FROM jobs 
    WHERE organization_id = ?
  `;
  const params: any[] = [organizationId];
  
  if (status) {
    query += ` AND status = ?`;
    params.push(status);
  }
  
  if (batchId) {
    query += ` AND batch_id = ?`;
    params.push(batchId);
  }
  
  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);
  
  const jobs = await env.DB.prepare(query).bind(...params).all();
  
  // Get total count for pagination
  let countQuery = `
    SELECT COUNT(*) as total FROM jobs 
    WHERE organization_id = ?
  `;
  const countParams: any[] = [organizationId];
  
  if (status) {
    countQuery += ` AND status = ?`;
    countParams.push(status);
  }
  
  if (batchId) {
    countQuery += ` AND batch_id = ?`;
    countParams.push(batchId);
  }
  
  const count = await env.DB.prepare(countQuery)
    .bind(...countParams)
    .first<{ total: number }>();
  
  // Parse JSON fields in each job
  const processedJobs = jobs.results.map(job => {
    if (job.analysis && typeof job.analysis === 'string') {
      job.analysis = JSON.parse(job.analysis);
    }
    return job;
  });
  
  return new Response(JSON.stringify({
    jobs: processedJobs,
    pagination: {
      total: count?.total || 0,
      limit,
      offset,
      hasMore: (offset + limit) < (count?.total || 0)
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Implement authentication as in the upload worker
async function authenticateRequest(request: Request, env: Env): Promise<any> {
  // Same as before
  return { id: 'user-123', organizationId: 'org-123', email: 'user@example.com', role: 'admin' };
}