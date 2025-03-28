const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const imprimeRoutes = require("./routes/imprime.routes");
const printRoutes = require("./routes/printer.routes");
const { downloadFile } = require("./ftpDownload"); // 🔹 Importation du script FTP
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
    await downloadFile();

    console.log("📂 Traitement des nouveaux fichiers...");
    processNewFiles();

    // 🔄 Vérification automatique toutes les 5 minutes
    setInterval(() => {
      console.log("📡 Téléchargement des fichiers depuis le serveur FTP...");
      downloadFile();
        console.log("🔍 Vérification des nouveaux fichiers...");
        processNewFiles();
        
    }, 1 * 60 * 1000);

    // 🏁 Démarrer le serveur après le FTP et le traitement
    app.listen(PORT, () => {
        console.log(`✅ Serveur Express en cours d'exécution sur http://localhost:${PORT}`);
    });
}

// 🔥 Exécuter le serveur
startServer();
