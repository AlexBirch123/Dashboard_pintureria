import { Client } from "../models/Client.model.js";



export const getAll = async (req, res) => {
    try {
        const result = await Client.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"error al obtener los clientes"});
    }
};

export const add = async (req, res) => {
    const {dni, cuit, name, address, phone, painter} = req.body;
    try {
        const result = await Client.create({dni:dni ,cuit:cuit, name:name, address:address, phone:phone, painter:painter});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar clientes." });
    }
};

// export const update = async (req, res) => {
//     const {id} = req.params
//     const {description, imgUrl} = req.body;
//     try {
//         const result = await Client.update({description:description ,imgUrl:imgUrl},{where:{id:id}});
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Error al actualizar cliente" });
//     }
// };

