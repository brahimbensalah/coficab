const express = require("express");
const multer = require("multer");
const path = require("path");
const impressionController = require("../controllers/impressionController");

const router = express.Router();

//  Configuration Multer : stocker les fichiers dans "uploads/"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Stocke les fichiers dans "uploads/"
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier
    },
  });
  
  const upload = multer({ storage: storage });

router.get("/impressions", impressionController.getAllImpressions);
router.get("/impressionsByImp/:nameImp", impressionController.getAllImpressionsByNameImp);
router.get("/impressionsByStartDate/:date", impressionController.getAllImpressionsByStartDate);
router.get("/impressionsByStartEndDate/:startDate/:endDate", impressionController.getAllImpressionsByStartEndDate);
router.get("/impressionsByImp&StartDate/:nameImp/:startDate", impressionController.getAllImpressionsByImp_StartDate);
router.get("/impressionsByUser/:user", impressionController.getAllImpressionsByUser);
// router.post("/upload", upload.single("file"), impressionController.uploadFile);
// router.get("/impressions/filter", impressionController.filterImpressions);

module.exports = router;
