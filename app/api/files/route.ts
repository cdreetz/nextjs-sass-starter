import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
  }
});

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
    });

    const response = await S3.send(command);
    
    const files = response.Contents?.map(file => ({
      key: file.Key,
      size: file.Size,
      lastModified: file.LastModified,
      url: `${process.env.R2_PUBLIC_URL}/${file.Key}`
    })) || [];

    return new Response(
      JSON.stringify({ files }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error listing files:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to list files' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 