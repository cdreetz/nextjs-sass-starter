-- D1 Database Schema

-- Organizations Table
CREATE TABLE organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  billing_email TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT,
  usage_limit_hours REAL DEFAULT 10,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  organization_id TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Jobs Table
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  batch_id TEXT,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  duration REAL,
  status TEXT NOT NULL,
  transcription TEXT,
  analysis TEXT,
  error TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  completed_at INTEGER,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (batch_id) REFERENCES batches(id)
);

-- Batches Table
CREATE TABLE batches (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  total_files INTEGER NOT NULL,
  processed_files INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  completed_at INTEGER,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Usage Records Table (for billing)
CREATE TABLE usage_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_id TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  audio_duration REAL,
  recorded_at INTEGER NOT NULL,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Create indexes
CREATE INDEX idx_jobs_organization_id ON jobs(organization_id);
CREATE INDEX idx_jobs_batch_id ON jobs(batch_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_batches_organization_id ON batches(organization_id);
CREATE INDEX idx_usage_organization_id ON usage_records(organization_id);
CREATE INDEX idx_usage_recorded_at ON usage_records(recorded_at);