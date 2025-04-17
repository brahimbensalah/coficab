const express = require("express");
const multer = require("multer");
const path = require("path");
const printerController = require("../controllers/printerController");

const router = express.Router();

router.get("/getAllPrinter", printerController.getAllPrints);
router.get("/getAllPrinterName", printerController.getAllPrintsName);
router.get("/getPrinterId/:name", printerController.getPrintsId);
router.post("/addPrinter", printerController.addPrint);
router.delete("/deletePrinter/:id", printerController.deletePrint);
router.patch("/updatePrinter/:id", printerController.updatePrint);
// router.post("/upload", upload.single("file"), impressionController.uploadFile);
// router.get("/impressions/filter", impressionController.filterImpressions);

module.exports = router;
