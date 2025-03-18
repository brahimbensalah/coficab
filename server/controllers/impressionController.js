const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const db = require("../Models/index.js");
const Impression = db.Impression;

 //Dossier où les fichiers sont automatiquement récupérés
const uploadDir = path.join(__dirname, "../uploads");


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
function processFiles() {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Erreur de lecture du dossier uploads :", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);
      const fileExtension = path.extname(file);
      const filePrefix = file.substring(0, 5); // Récupère les 5 premiers caractères du nom du fichier

      if (fileExtension === ".csv") {
        parseCSV(filePath, filePrefix, { status: () => ({ json: () => {} }) });
      } else if (fileExtension === ".xls" || fileExtension === ".xlsx") {
        parseExcel(filePath, filePrefix, { status: () => ({ json: () => {} }) });
      } else if (fileExtension === ".txt") {
        parseTXT(filePath, filePrefix, { status: () => ({ json: () => {} }) });
      }
    });
  });
}
// Lancer le traitement toutes les 5 minutes (300 000 ms)
setInterval(processFiles, 1 * 60 * 1000);
console.log("✅ Automatisation activée : vérification des fichiers toutes les 5 minutes...");


function parseCSV(filePath,filePrefix, res) {
  const results = [];
 

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const lines = data.trim().split("\n"); // Split lines
    for (const line of lines) {
      const parts = line.trim().split(/\s+/); // Split by spaces

      if (parts.length > 4) {
        const Nparts4 = "20" + parts[4]
        console.log('================Nparts4====================');
        console.log(Nparts4);
        console.log('====================================');
        const rawDate = new Date(Nparts4);
        results.push({
          NameImp:filePrefix,
          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:rawDate,
          Time: parts[5],



        });
      } else {
        console.warn("Skipping invalid line:", line);
      }
    }

    
    saveToDatabase(results, res);
  });
}


//  Fonction pour lire un fichier .xls ou .xlsx
function parseExcel(filePath,filePrefix, res) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  saveToDatabase(data, res);
}

//  Fonction pour lire un fichier .txt
function parseTXT(filePath,filePrefix, res) {
  const results = [];
;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({  message: "Erreur de lecture du fichier." });
 

    const lines = data.split("\n");
    const line =lines.slice(2)

    
    line.forEach((linee) => {
      const part = linee.split(";");
      const parts = part[0].trim().split(/\s+/);   
      // const formattedDate = rawDate.toISOString().split("T")[0]; //  Garde seulement "YYYY-MM-DD"
      
      if (parts.length > 4) {
        const Nparts4 = "20" + parts[4]
        const rawDate = new Date(Nparts4);
     
    
        results.push({
          NameImp:filePrefix,
          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:rawDate,
          Time: parts[5],
        });
      }      
    });
   
    saveToDatabase(results, res);
  });
}

//  Fonction pour enregistrer les données en base MySQL avec Sequelize
async function saveToDatabase(data, res) {
  try {
    await Promise.all(data.map(row => Impression.create(row)));

    if (res && typeof res.status === "function") {
      return res.status(200).json({ message: "✅ Data saved successfully!" });
    } else {
      console.log("✅ Data saved successfully (Automated Task)!");
    }
  } catch (error) {
    if (res && typeof res.status === "function") {
      return res.status(500).json({ error: error.message });
    } else {
      console.error("❌ Error saving data (Automated Task):", error.message);
    }
  }
}
