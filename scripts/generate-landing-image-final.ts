import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const generateImage = async () => {
  const payload = {
    prompt: "Professional photograph shot on a Hasselblad H6D-100c with 80mm f/2.8 lens, golden hour in the Sahara desert. A hyper-realistic humanoid figure with anatomically correct proportions wearing sleek chrome and turquoise (#53dfb2) armor that reflects the desert light. The figure has a distinctive robotic head with elegant design and glowing deep blue (#2d2d67) eyes, sitting majestically on a beautifully detailed Arabian camel with chrome and turquoise accents. Shot from a cinematic low angle at f/2.8 for shallow depth of field, capturing the figure against a breathtaking backdrop where a futuristic city emerges from the dunes. The city features floating structures with holographic displays and energy fields in deep blue and turquoise. Natural lens flares and atmospheric desert haze add depth. The composition follows the rule of thirds with the subject positioned to allow text overlay space. The lighting creates dramatic rim lights on the armor and camel, with the setting sun casting long shadows across the dunes. 16K resolution, photorealistic rendering with ultra-fine details in the armor, sand textures, and city architecture. Style reference: combination of National Geographic documentary photography and high-end sci-fi concept art.",
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
      const outputPath = "../client/public/images/landing-hero-final.webp";
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
