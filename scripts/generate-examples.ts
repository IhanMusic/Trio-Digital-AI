import { config } from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

if (!STABILITY_API_KEY) {
  throw new Error('Missing Stability API key');
}

const examples = [
  {
    name: 'fashion',
    prompt: `A professional lifestyle product photography of high-end fashion items arranged in a modern, minimalist setting. Clean background, soft lighting, and luxurious textures. Instagram-worthy composition with attention to detail and brand aesthetics. Photorealistic, high resolution, trending on social media`,
  },
  {
    name: 'tech',
    prompt: `A sleek and modern tech workspace with cutting-edge devices, holographic displays, and clean design. Professional corporate environment with blue and white color scheme. Perfect for B2B marketing. Photorealistic, 4K, professional lighting`,
  },
  {
    name: 'food',
    prompt: `A beautifully plated gourmet dish in a high-end restaurant setting. Professional food photography with perfect lighting, shallow depth of field, and mouth-watering presentation. Instagram-worthy composition. Photorealistic, high resolution`,
  }
];

async function generateImage(prompt: string): Promise<Buffer> {
  const payload = {
    prompt,
    output_format: 'webp'
  };

  const response = await axios.postForm(
    'https://api.stability.ai/v2beta/stable-image/generate/ultra',
    axios.toFormData(payload, new FormData()),
    {
      validateStatus: undefined,
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        Accept: 'image/*'
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`Generation failed: ${response.data.toString()}`);
  }

  return Buffer.from(response.data);
}

async function generateExamples() {
  console.log('Generating example images for Trio landing page...');
  
  // Create examples directory if it doesn't exist
  const examplesDir = path.join(__dirname, '..', 'client', 'public', 'images', 'examples');
  await fs.mkdir(examplesDir, { recursive: true });
  
  for (const example of examples) {
    console.log(`Generating ${example.name} image...`);
    try {
      const imageBuffer = await generateImage(example.prompt);
      const outputPath = path.join(examplesDir, `${example.name}.webp`);
      await fs.writeFile(outputPath, imageBuffer);
      console.log(`Successfully generated ${example.name} image`);
    } catch (error) {
      console.error(`Failed to generate ${example.name} image:`, error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
        });
      }
    }
  }
}

// Execute the script
generateExamples().catch(console.error);
