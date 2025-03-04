const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const db = require("../Models/index.js");
const Impression = db.Impression;

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
 

  //  Upload et traitement du fichier
  uploadFile: async function (req, res) {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé. Vérifiez votre requête." });
    }   
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const fileExtension = path.extname(req.file.originalname);
    const filePrefix = req.file.originalname.substring(0, 5);

  
    
    if (fileExtension === ".csv") {
      parseCSV(filePath,filePrefix, res);
    } else if (fileExtension === ".xls" || fileExtension === ".xlsx") {
      parseExcel(filePath,filePrefix, res);
    } else if (fileExtension === ".txt") {
      parseTXT(filePath,filePrefix, res);
    } else {
      res.status(400).json({ message: "Format non pris en charge." });
    }
   },
  




};


function parseCSV(filePath,filePrefix, res) {
  const results = [];
  console.log('================filePrefix====================');
  console.log(filePrefix);
  console.log('====================================');

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const lines = data.trim().split("\n"); // Split lines
    for (const line of lines) {
      const parts = line.trim().split(/\s+/); // Split by spaces

      if (parts.length === 6) {
        results.push({
          NameImp:filePrefix,

          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:parts[4],
          Time: parts[5],



        });
      } else {
        console.warn("Skipping invalid line:", line);
      }
    }

    console.log(results);
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
      if (parts.length > 4) {
        // console.log(parts);     
        results.push({
          NameImp:filePrefix,
          User: parts[1],
          Page: parseInt(parts[2]),
          Result: parts[3],
          Date:parts[4],
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
    const impressions = await Promise.all(data.map(row => Impression.create(row)));
    res.status(200).send(impressions);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
