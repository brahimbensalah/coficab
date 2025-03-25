const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const db = require("./Models/index.js"); // Assure-toi que c'est bien le fichier principal
const Impression = db.Impression ;

// 📂 Dossier des fichiers téléchargés
const uploadDirectory = path.join(__dirname, "uploads");
 // Dossier des fichiers cumulés
 const cumulativeDir = path.join(__dirname, "./cumules");
  // Vérifier si le dossier existe, sinon le créer
if (!fs.existsSync(cumulativeDir)) {
    fs.mkdirSync(cumulativeDir);
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
        console.log("⚠️ Aucun fichier trouvé dans `uploads` !");
        return;
    }

    console.log(`📂 ${newFiles.length} nouveaux fichiers détectés :`, newFiles);
    
    newFiles.forEach(file => {
        const filePath = path.join(uploadDirectory, file);
        console.log(`📄 Traitement du fichier : ${filePath}`);
        const fileExtension = path.extname(file);
        const printerName = file.substring(0, 5);

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

// 📝 Fonction pour parser un fichier CSV
function parseCSV(filePath,printerName) {
  const results = []; 

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }
    const id= parseInt(printerName[4]) ; 
    console.log('==============id======================');
    console.log(id);
    console.log('====================================');   
   
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
          PrinterId : 1,
        });
      } else {
        console.warn("Skipping invalid line:", line);
      }
    }    
    saveToDatabase(results, printerName, filePath);
  });
}


// 📝 Fonction pour parser un fichier Excel
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

// 📝 Fonction pour parser un fichier TXT
//  Fonction pour lire un fichier .txt
function parseTXT(filePath, printerName) {
  const results = [];

  fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
          console.error("Erreur de lecture du fichier:", err);
          return;
      }

      const lines = data.split("\n").slice(2); // Ignorer l'en-tête
      const printerId = parseInt(printerName[4]);

      lines.forEach((line) => {
          const parts = line.trim().split(/\s+/);

          if (parts.length >= 6) { 
              // 🟢 Identifier les indices des colonnes
              const lastIndex = parts.length - 1;
              const time = parts[lastIndex]; // Dernière colonne = Heure
              const date = parts[lastIndex - 1]; // Avant-dernière colonne = Date
              const result = parts[lastIndex - 2]; // Troisième avant-dernière = Résultat
              const page = parseInt(parts[lastIndex - 3]); // Quatrième avant-dernière = Pages

              // 🔵 Tout ce qui reste avant `page` est le nom de l'utilisateur
              const user = parts.slice(1, lastIndex - 3).join(" "); // Conserve le nom complet

              // 🔴 Correction de la date
              const formattedDate = new Date(`20${date.split("/").reverse().join("-")}`);

              results.push({
                  NameImp: printerName,
                  User: user,
                  Page: page,
                  Result: result,
                  Date: formattedDate,
                  Time: time,
                  PrinterId: 1,
              });
          } else {
              console.warn("❌ Ligne ignorée (format incorrect):", line);
          }
      });

      saveToDatabase(results, printerName, filePath);
  });
}

  function updateCumulativeFile(printerName, data) {
    const cumulativeFilePath = path.join(cumulativeDir, `${printerName}.txt`);
  
   // Convertir les données en format texte
    const fileData = data.map(row => 
      `${row.User} ${row.Page} ${row.Result} ${row.Date.toISOString().split("T")[0]} ${row.Time}`
    ).join("\n");
  
    // Ajouter les nouvelles données au fichier cumulé
    fs.appendFile(cumulativeFilePath, fileData + "\n"+ "**********************************************************"+"\n", (err) => {
      if (err) console.error(`❌ Erreur écriture fichier cumulé (${printerName}):`, err);
      else console.log(`✅ Fichier cumulé mis à jour : ${cumulativeFilePath}`);
    });
  }
//  Fonction pour enregistrer les données en base MySQL avec Sequelize
// async function saveToDatabase(data,printerName,originalFilePath) {
//     try {
//       await Impression.bulkCreate(data);
//       console.log(`✅ Données enregistrées pour ${printerName}`);
  
//       // Mettre à jour le fichier cumulé
//       updateCumulativeFile(printerName, data);
  
//       // Supprimer le fichier original
//       fs.unlink(originalFilePath, (err) => {
//         if (err) console.error(`❌ Erreur suppression fichier ${originalFilePath}:`, err);
//         else console.log(`🗑️ Fichier supprimé : ${originalFilePath}`);
//       });
  
//     } catch (error) {
//       console.error("❌ Erreur insertion BDD :", error);
//     }
//   }
async function saveToDatabase(data, printerName, originalFilePath) {
  try {
      for (const entry of data) {
          const exists = await Impression.findOne({
              where: {
                  NameImp: entry.NameImp,
                  User: entry.User,
                  Page: entry.Page,
                  Date: entry.Date,
                  Time: entry.Time
              }
          });

          if (!exists) {
              await Impression.create(entry);
          } else {
              console.log(`🔁 Donnée déjà existante pour ${entry.User} - Ignorée.`);
          }
      }

      console.log(`✅ Données enregistrées pour ${printerName}`);
      updateCumulativeFile(printerName, data);

      fs.unlink(originalFilePath, (err) => {
          if (err) console.error(`❌ Erreur suppression fichier ${originalFilePath}:`, err);
          else console.log(`🗑️ Fichier supprimé : ${originalFilePath}`);
      });

  } catch (error) {
      console.error("❌ Erreur insertion BDD :", error);
  }
}

// 📤 Exporter la fonction
module.exports = { processNewFiles };
