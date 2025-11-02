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

const testimonials = [
  {
    name: 'sophie',
    prompt: `Professional corporate headshot photograph of a woman in business attire, natural lighting, office background, high quality, 4k, photorealistic portrait, professional photography`,
  },
  {
    name: 'thomas',
    prompt: `Professional corporate headshot photograph of a man in business casual attire, natural lighting, office background, high quality, 4k, photorealistic portrait, professional photography`,
  },
  {
    name: 'marie',
    prompt: `Professional corporate headshot photograph of a woman in executive business attire, natural lighting, office background, high quality, 4k, photorealistic portrait, professional photography`,
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

async function generateTestimonials() {
  console.log('Generating testimonial profile images...');
  
  // Create testimonials directory if it doesn't exist
  const testimonialDir = path.join(__dirname, '..', 'client', 'public', 'images', 'testimonials');
  await fs.mkdir(testimonialDir, { recursive: true });
  
  for (const testimonial of testimonials) {
    console.log(`Generating ${testimonial.name}'s profile image...`);
    try {
      const imageBuffer = await generateImage(testimonial.prompt);
      const outputPath = path.join(testimonialDir, `${testimonial.name}.webp`);
      await fs.writeFile(outputPath, imageBuffer);
      console.log(`Successfully generated ${testimonial.name}'s profile image`);
    } catch (error) {
      console.error(`Failed to generate ${testimonial.name}'s profile image:`, error);
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
generateTestimonials().catch(console.error);
