const fs = require("fs");
const path = require("path");
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
};

