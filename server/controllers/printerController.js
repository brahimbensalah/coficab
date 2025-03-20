const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const db = require("../Models/index.js");
const Printer = db.Printer;



module.exports = {
    //  Récupérer toutes les impressions
    getAllPrints: async function (req, res) {
      try {
        const printer = await Printer.findAll({});
        res.status(200).json(printer);
      } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération.", error });
      }
    },
    addPrint: async function (req, res) {
      try {
        const printer= await db.Printer.create(req.body)
        res.status(200).send(printer)    
    } catch (error) {
        throw error    
    }
    },
    deletePrint: async function (req, res) {
      try {
        const printer=db.Printer.destroy({where:{
            id:req.params.id,
           
        }})
        res.json(printer)
    } catch (err) {
        throw err
    }
    },
    updatePrint: async function (req, res) {
      try {
        const printer=db.Printer.update(req.body , {where:{
            id:req.params.id,
           
        }})
        res.json(printer)
    } catch (err) {
        throw err
    }
    },
  };