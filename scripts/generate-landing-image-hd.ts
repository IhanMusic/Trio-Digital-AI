import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const generateImage = async () => {
  const payload = {
    prompt: "Ultra-realistic photograph shot on a Canon EOS R5 with RF 24-70mm f/2.8L lens, golden hour lighting, f/2.8 aperture for cinematic depth of field. A humanoid figure with realistic human body proportions wearing sleek chrome armor but with a distinctive robotic head featuring glowing turquoise (#53dfb2) eyes, riding a majestic Arabian camel in the Algerian Sahara. The robot's posture is natural and elegant, suggesting human-like movement. Shot from a slightly low angle to emphasize grandeur, with the setting sun creating dramatic rim lighting and lens flares. In the background, a futuristic city emerges from the dunes with floating structures in deep blue (#2d2d67) and turquoise (#53dfb2) accents, holographic displays casting a soft glow. 8K resolution, hyperrealistic textures, atmospheric haze, and perfect exposure balance. The composition follows the rule of thirds with intentional negative space for text overlay. Photographic style similar to National Geographic meets sci-fi concept art.",
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
      const outputPath = "../client/public/images/landing-hero-hd.webp";
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
