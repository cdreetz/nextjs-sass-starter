import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { audio } = await req.json();

    const transcription = await groq.audio.transcriptions.create({
        file: audio,
        model: 'whisper-large-v3-turbo',
        language: 'en',
    });

    return new Response(JSON.stringify(transcription), {
        status: 200,
    });
}
