// import { Category } from "../models/categorias.model.js";



// export const getAllCat = async (req, res) => {
//     Category.sync()
//     try {
//         const result = await Category.findAll();
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({message:"error al obtener las categorias"});
//     }
// };

// export const add = async (req, res) => {
//     Category.sync()
//     const {description, imgUrl} = req.body;
//     try {
//         const result = await Category.create({description:description ,imgUrl:imgUrl});
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Error al agregar categorias." });
//     }
// };

// export const update = async (req, res) => {
//     Category.sync()
//     const {id} = req.params
//     const {description, imgUrl} = req.body;
//     try {
//         const result = await Category.update({description:description ,imgUrl:imgUrl},{where:{id:id}});
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Error al actualizar categoria" });
//     }
// };

