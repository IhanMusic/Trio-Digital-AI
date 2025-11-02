import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const generateImage = async () => {
  const payload = {
    prompt: "A hyper-realistic, cinematic shot of a sleek chrome robot riding a majestic camel in the Algerian Sahara desert. The scene is bathed in the colors #2d2d67 (dark blue) and #53dfb2 (turquoise). In the background, a futuristic city rises from the dunes with floating buildings and holographic displays. The lighting is dramatic with a golden desert sunset creating striking shadows. The composition should be eye-catching and suitable for high-end advertising, with the robot and camel as the central focus. Ultra-high detail, photorealistic quality.",
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
      const outputPath = "../client/public/images/landing-robot-camel.webp";
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
