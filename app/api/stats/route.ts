import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
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

        const response = await s3Client.send(command);
        const files = response.Contents || [];

        // Calculate statistics
        const totalFiles = files.length;
        const totalSize = files.reduce((acc, file) => acc + (file.Size || 0), 0);
        
        // Estimate audio duration (assuming average bitrate of 128kbps)
        const averageBitrate = 128 * 1024; // 128kbps in bits per second
        const totalDurationSeconds = (totalSize * 8) / averageBitrate;
        const totalDurationMinutes = Math.round(totalDurationSeconds / 60);

        return NextResponse.json({
            totalFiles,
            totalSize,
            totalDurationMinutes,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
} 