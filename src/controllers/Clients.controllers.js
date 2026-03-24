import { Client } from "../models/Client.model.js";



export const getAll = async (req, res) => {
    Client.sync()
    try {
        const result = await Client.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"error al obtener los clientes"});
    }
};

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

