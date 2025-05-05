// const db = require("../Models/index.js");

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
//   }
// };

// exports.addUser = async (req, res) => {
//   try {
//     const { userName, departement } = req.body;
//     const [user, created] = await User.findOrCreate({
//       where: { userName },
//       defaults: { departement: departement || "all" },
//     });
//     res.status(created ? 201 : 200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userName, departement } = req.body;
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

//     await user.update({ userName, departement });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Erreur lors de la mise à jour" });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

//     await user.destroy();
//     res.json({ message: "Utilisateur supprimé" });
//   } catch (err) {
//     res.status(500).json({ error: "Erreur lors de la suppression" });
//   }
// };
