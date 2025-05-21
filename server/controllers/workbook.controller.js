import { Router } from "express";
import Workbook from "../models/workbook.js";

const workbookRouter = Router()

workbookRouter.post('/', async (req, res) => {
    try {
        const workbook = new Workbook({
            name: req.body.name,
            ticket: req.body.ticket,
            workbook: req.body.workbook
        })

        const newWorkbook = await workbook.save();
        res.status(201).json(newWorkbook);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    
})

workbookRouter.get('/', async (req, res) => {
    try {
        const workbooks = await Workbook.find().sort({ lastUpdate: -1})
        res.json(workbooks);
    } catch (error) {
        res.status(500).json({message: err.message })
    }
})

export default workbookRouter;