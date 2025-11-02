import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const generateImage = async () => {
  const payload = {
    prompt: "A vibrant, dynamic shot of a futuristic cyborg with glowing turquoise (#53dfb2) accents and deep blue (#2d2d67) armor, riding a majestic chrome-plated robotic camel in a sci-fi desert scene. The image should be extremely colorful and energetic, with bright neon lights, floating holographic elements, and light streaks. Shot with dramatic lighting and lens flares, creating a high-energy cyberpunk atmosphere. The character should be in a dynamic pose, similar to a superhero, with glowing effects and energy trails. Ultra-detailed 8K quality, photorealistic rendering with strong contrast and vivid colors. The composition should leave space on the left for text overlay. Inspired by modern sci-fi movie posters and high-end gaming visuals.",
    output_format: "webp"
  };

  try {
    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: { 
          Authorization: `Bearer sk-0rPxRciQYj6okYo30O66DZ6FJg57Qn47rxzX1LbpJhAJrTRm`, 
          Accept: "image/*" 
        },
      },
    );

    if(response.status === 200) {
      const outputPath = "../client/public/images/landing-hero-vibrant.webp";
      fs.writeFileSync(outputPath, Buffer.from(response.data));
      console.log(`Image generated successfully and saved to ${outputPath}`);
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

generateImage().catch(console.error);
