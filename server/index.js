const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const imprimeRoutes = require("./routes/imprime.routes");
const printRoutes = require("./routes/printer.routes");
const { downloadFile } = require("./ftpDownload"); // 🔹 Importation du script FTP
const { downloadFromAllPrinters } = require("./ftpDownload");
const { processNewFiles } = require("./processFiles"); // 🔹 Importation du script de traitement
require("./Models/index");
const app = express();
const PORT = process.env.PORT || 5000;






app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));
app.use("/api/imprime", imprimeRoutes);
app.use("/api/printer", printRoutes);

// 🚀 **Lancer le FTP et le traitement avant de démarrer le serveur**
async function startServer() {
    console.log("📡 Téléchargement des fichiers depuis le serveur FTP...");
    await downloadFromAllPrinters();// Corrected to downloadAllFiles

    console.log("📂 Traitement des nouveaux fichiers...");
    processNewFiles();

    // 🔄 Vérification automatique toutes les 5 minutes
    setInterval(() => {
        console.log("📡 Running periodic download...");
        downloadFromAllPrinters();
        console.log("🔍 Vérification des nouveaux fichiers...");
        processNewFiles();
        
    }, 10 * 60 * 1000);




app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

    // 🏁 Démarrer le serveur après le FTP et le traitement
    // app.listen(PORT, () => {
    //     console.log(`✅ Serveur Express en cours d'exécution sur http://localhost:${PORT}`);
    // });
}

// 🔥 Exécuter le serveur
startServer();
