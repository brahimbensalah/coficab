const fs = require("fs");
const path = require("path");
const db = require("../Models/index.js");
const Impression = db.Impression;
const { Op,fn, col, where  } = require("sequelize");



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
  getAllImpressionsByStartDate: async function (req, res) {
    try {
      const date = req.params.date;
  
      const impressions = await Impression.findAll({
        where: {
          Date: {
            [Op.gte]: date, // Get records where Date is greater than the provided date
          },
        },
      });
  
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération.",
        error,
      });
    }
  },
  getAllImpressionsByImp_StartDate: async function (req, res) {
    try {
      const date = req.params.startDate;
      const nameImp = req.params.nameImp;
  
      const impressions = await Impression.findAll({
        where: {
          Date: {
            [Op.gte]: date, // Get records where Date is greater than the provided date
          },
          NameImp: nameImp 
        },
      });
  
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération.",
        error,
      });
    }
  },
  getAllImpressionsByImp_StartEndDate: async function (req, res) {
    try {
      const nameImp = req.params.nameImp;
      const startdate = req.params.startDate;
      const endDate = req.params.endDate;
  
      console.log("🔍 Recherche :", { nameImp, startdate, endDate });
  
      const impressions = await Impression.findAll({
        where: {
          Date: {
            [Op.between]: [startdate, endDate],
          },
          NameImp: nameImp,
        },
      });
  
      res.status(200).json(impressions);
    } catch (error) {
      console.error("❌ Erreur:", error);
      res.status(500).json({
        message: "Erreur lors de la récupération.",
        error,
      });
    }
  },
  getAllImpressionsByStartEndDate: async function (req, res) {
    try {
      const { startDate, endDate } = req.params; // 🟡 On suppose que tu les envoies dans l’URL comme query params
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Les dates de début et de fin sont requises." });
      }
  
      const impressions = await Impression.findAll({
        where: {
          Date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
  
      res.status(200).json(impressions);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération.",
        error,
      });
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
  // GET /impressionsByMonth/:month (ex: '2025-05')
getMonthlyImpressions: async (req, res) => {
  const { month } = req.params; // Format attendu: YYYY-MM
  try {
    const impressions = await Impression.findAll({
      where: where(fn('DATE_FORMAT', col('Date'), '%Y-%m'), month),
      attributes: [
        'NameImp',
        [fn('DAY', col('Date')), 'day'],
        [fn('COUNT', col('UID')), 'count']
      ],
      group: ['NameImp', fn('DAY', col('Date'))],
      raw: true
    });

    res.json({ data: impressions });
  } catch (error) {
    console.error('Erreur lors de la récupération des impressions mensuelles :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
},
};

