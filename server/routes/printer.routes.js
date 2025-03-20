const express = require("express");
const multer = require("multer");
const path = require("path");
const printerController = require("../controllers/printerController");

const router = express.Router();

router.get("/getAllPrinter", printerController.getAllPrints);
router.post("/addPrinter", printerController.addPrint);
router.delete("/deletePrinter/:id", printerController.deletePrint);
router.patch("/updatePrinter/:id", printerController.updatePrint);
// router.post("/upload", upload.single("file"), impressionController.uploadFile);
// router.get("/impressions/filter", impressionController.filterImpressions);

module.exports = router;
