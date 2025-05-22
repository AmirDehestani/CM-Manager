import { Router } from 'express';
import Workbook from '../models/workbook.js';
import WorkbookData from '../models/workbookData.js';

const workbookRouter = Router();

// Create a new workbook
workbookRouter.post('/', async (req, res) => {
    try {
        const workbookData = new WorkbookData({
            data: req.body.workbook,
        });

        const workbook = new Workbook({
            name: req.body.name,
            ticket: req.body.ticket,
            workbook: workbookData._id,
        });

        await workbookData.save();
        const savedWorkbook = await workbook.save();

        res.status(201).json(savedWorkbook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all workbooks, no workbook data is returned for performance reasons
workbookRouter.get('/', async (req, res) => {
    try {
        const workbooks = await Workbook.find().sort({ lastUpdate: -1 });
        res.json(workbooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single workbook by ID, including workbook data
workbookRouter.get('/:id', async (req, res) => {
    try {
        const workbook = await Workbook.findById(req.params.id).populate(
            'workbook'
        );
        if (!workbook) {
            return res.status(404).json({ message: 'Workbook not found' });
        }
        res.json(workbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a workbook by ID
workbookRouter.delete('/:id', async (req, res) => {
    try {
        const workbook = await Workbook.findByIdAndDelete(req.params.id);
        if (!workbook) {
            return res.status(404).json({ message: 'Workbook not found' });
        }
        res.json({ message: 'Workbook deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a workbook with new workbook data
workbookRouter.put('/:id', async (req, res) => {
    try {
        const workbook = await Workbook.findById(req.params.id);
        if (!workbook) {
            return res.status(404).json({ message: 'Workbook not found' });
        }

        const workbookData = await WorkbookData.findById(workbook.workbook);
        if (workbookData) {
            workbookData.data = req.body.workbook;
            await workbookData.save();
        } else {
            const newWorkbookData = new WorkbookData({
                data: req.body.workbook,
            });
            await newWorkbookData.save();
            workbook.workbook = newWorkbookData._id;
            workbook.save();
        }

        res.status(201).json(workbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default workbookRouter;
