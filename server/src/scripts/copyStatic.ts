import fs from 'fs-extra';
import path from 'path';

async function copyStaticFiles() {
    try {
        const publicDir = path.join(process.cwd(), 'public');
        const distPublicDir = path.join(process.cwd(), 'dist', 'public');
        const imagesDir = path.join(publicDir, 'images');

        // S'assurer que les dossiers existent
        await fs.ensureDir(publicDir);
        await fs.ensureDir(imagesDir);

        // Créer le fichier test-upload.html s'il n'existe pas
        const testUploadPath = path.join(publicDir, 'test-upload.html');
        const testUploadContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Upload</title>
</head>
<body>
    <h1>Test d'upload d'image avec OpenCV</h1>
    <form id="uploadForm">
        <input type="file" name="product_image" accept="image/*"><br><br>
        <input type="text" name="prompt" placeholder="Enter prompt" value="a professional product photo with white background"><br><br>
        <input type="text" name="aspect_ratio" value="1:1"><br><br>
        <input type="submit" value="Upload">
    </form>

    <div id="result"></div>

    <script>
        document.getElementById('uploadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const resultDiv = document.getElementById('result');
            
            try {
                const response = await fetch('http://localhost:5000/api/ai/stability/generate', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer test@thirdadvertising.dz'
                    },
                    body: formData
                });
                
                const result = await response.json();
                console.log('Response:', result);
                
                if (result.error) {
                    resultDiv.innerHTML = 'Error: ' + result.error.message;
                } else {
                    resultDiv.innerHTML = 'Success! Image URL: ' + result.data[0].url;
                    // Afficher l'image
                    const img = document.createElement('img');
                    img.src = result.data[0].url;
                    resultDiv.appendChild(img);
                }
            } catch (error) {
                console.error('Error:', error);
                resultDiv.innerHTML = 'Error: ' + error.message;
            }
        });
    </script>
</body>
</html>`;

        await fs.writeFile(testUploadPath, testUploadContent);
        console.log('Fichiers statiques copiés avec succès');
        console.log('Dossier images créé avec succès');

    } catch (error) {
        console.error('Erreur lors de la copie des fichiers statiques:', error);
        process.exit(1);
    }
}

copyStaticFiles();
