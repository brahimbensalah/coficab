const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const db = require("../Models/index.js");
const Impression = db.Impression;

 //Dossier où les fichiers sont automatiquement récupérés
 const uploadDirectory = path.join(__dirname, "../uploads"); 

 // Dossier des fichiers cumulés
 const cumulativeDir = path.join(__dirname, "../cumules");

 // Vérifier si le dossier existe, sinon le créer
if (!fs.existsSync(cumulativeDir)) {
  fs.mkdirSync(cumulativeDir);
}

module.exports = {
  //  Récupérer toutes les impressions
  getAllImpressions: async function (req, res) {
    try {
      const impressions = await Impression.findAll({});
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération.", error });
    }
  },
  getAllImpressionsByNameImp: async function (req, res) {
    try {
      const nameImp = req.params.nameImp;
      const impressions = await Impression.findAll({ where: { NameImp: nameImp } });
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération.", error });
    }
  },
  getAllImpressionsByUser: async function (req, res) {
    try {
      const user = req.params.user;
      const impressions = await Impression.findAll({where: { User: user }});
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération.", error });
    }
  },
};


function updateCumulativeFile(printerName, data) {
  const cumulativeFilePath = path.join(cumulativeDir, `${printerName}.txt`);

 // Convertir les données en format texte
  const fileData = data.map(row => 
    `${row.User} ${row.Page} ${row.Result} ${row.Date.toISOString().split("T")[0]} ${row.Time}`
  ).join("\n");

  // Ajouter les nouvelles données au fichier cumulé
  fs.appendFile(cumulativeFilePath, fileData + "\n", (err) => {
    if (err) console.error(`❌ Erreur écriture fichier cumulé (${printerName}):`, err);
    else console.log(`✅ Fichier cumulé mis à jour : ${cumulativeFilePath}`);
  });
}


function getNewFiles() {
  const files = fs.readdirSync(uploadDirectory).map(file => ({
    name: file,
    time: fs.statSync(path.join(uploadDirectory, file)).mtime.getTime()
  })).sort((a, b) => b.time - a.time); // Trier du plus récent au plus ancien

  return files.map(file => file.name); // Retourner tous les fichiers
}


// ✅ Automatisation intelligente
function processNewFiles() {
  const newFiles = getNewFiles();

  if (newFiles.length === 0) {
    console.log("⚠️ Aucun fichier trouvé.");
    return;
  }

  console.log(`📂 ${newFiles.length} nouveaux fichiers détectés :`, newFiles);

  newFiles.forEach(file => {
    const filePath = path.join(uploadDirectory, file);
    const fileExtension = path.extname(file);
    const printerName = file.substring(0, 5); // Extraire le nom de l'imprimante

    if (fileExtension === ".csv") {
      parseCSV(filePath, printerName);
    } else if (fileExtension === ".xls" || fileExtension === ".xlsx") {
      parseExcel(filePath, printerName);
    } else if (fileExtension === ".txt") {
      parseTXT(filePath, printerName);
    } else {
      console.log(`❌ Format non pris en charge : ${file}`);
    }
  });
}
// ✅ Exécuter toutes les 5 minutes
setInterval(processNewFiles, 1 * 60 * 1000);
console.log("✅ Automatisation activée : Détection des nouveaux fichiers toutes les 5 minutes...");


function parseCSV(filePath,printerName) {
  const results = []; 

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    const id= parseInt(printerName[4]) ;    
   
    const lines = data.trim().split("\n"); // Split lines

    for (const line of lines) {
      const parts = line.trim().split(/\s+/); // Split by spaces
      if (parts.length > 4) {
        const Nparts4 = "20" + parts[4]
        const rawDate = new Date(Nparts4);
        results.push({
          NameImp:printerName,
          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:rawDate,
          Time: parts[5],
          PrinterId : id,
        });
      } else {
        console.warn("Skipping invalid line:", line);
      }
    }    
    saveToDatabase(results, printerName, filePath);
  });
}


//  Fonction pour lire un fichier .xls ou .xlsx
function parseExcel(filePath, printerName) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Convertir les données pour correspondre à la structure de la base de données
    const results = jsonData.map(row => ({
      NameImp: printerName,
      User: row["User"] || "Unknown", // Assurez-vous que la colonne User existe
      Page: parseInt(row["Page"], 10) || 0,
      Result: row["Result"] || "Unknown",
      Date: new Date(row["Date"]) || new Date(),
      Time: row["Time"] || "00:00",
    }));

    saveToDatabase(results, printerName, filePath);

  } catch (error) {
    console.error(`❌ Erreur lors du traitement du fichier Excel (${printerName}):`, error);
  }
}

//  Fonction pour lire un fichier .txt
function parseTXT(filePath,printerName) {
  const results = [];
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({  message: "Erreur de lecture du fichier." }); 

    const line = data.split("\n").slice(2);// Ignorer l'en-tête
    const id= parseInt(printerName[4]) ; 

    line.forEach((linee) => {
      const part = linee.split(";");
      const parts = part[0].trim().split(/\s+/);         
      if (parts.length > 4) {
        const Nparts4 = "20" + parts[4]
        const rawDate = new Date(Nparts4);     
    
        results.push({
          NameImp:printerName,
          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:rawDate,
          Time: parts[5],
          PrinterId : id,

        });
      }      
    });
   
    saveToDatabase(results, printerName, filePath);
  });
}

//  Fonction pour enregistrer les données en base MySQL avec Sequelize
async function saveToDatabase(data,printerName, originalFilePath) {
  try {
    await Impression.bulkCreate(data);
    console.log(`✅ Données enregistrées pour ${printerName}`);

    // Mettre à jour le fichier cumulé
    updateCumulativeFile(printerName, data);

    // Supprimer le fichier original
    fs.unlink(originalFilePath, (err) => {
      if (err) console.error(`❌ Erreur suppression fichier ${originalFilePath}:`, err);
      else console.log(`🗑️ Fichier supprimé : ${originalFilePath}`);
    });

  } catch (error) {
    console.error("❌ Erreur insertion BDD :", error);
  }
}

// cette fonction pour supprimer les fichiers cumulés après 7 jours :
function cleanOldCumulativeFiles() {
  fs.readdir(cumulativeDir, (err, files) => {
    if (err) {
      console.error("❌ Erreur lecture dossier cumulés :", err);
      return;
    }

    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    files.forEach(file => {
      const filePath = path.join(cumulativeDir, file);
      
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`❌ Erreur récupération stats fichier (${file}):`, err);
          return;
        }

        if ((now - stats.mtimeMs) > sevenDays) {
          fs.unlink(filePath, (err) => {
            if (err) console.error(`❌ Erreur suppression fichier cumulé (${file}):`, err);
            else console.log(`🗑️ Fichier cumulé supprimé : ${file}`);
          });
        }
      });
    });
  });
}
// ✅ Exécuter le nettoyage tous les jours
setInterval(cleanOldCumulativeFiles, 24 * 60 * 60 * 1000);