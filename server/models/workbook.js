import mongoose from 'mongoose';
import WorkbookData from './workbookData.js';

const workbookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false, // TODO: make it required once we have user auth
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        lastUpdate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        ticket: {
            type: String,
            required: true,
            match: [
                /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
                'Please enter a valid link for the ticket',
            ],
        },
        workbook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkbookData',
            required: true,
        },
    },
    { versionKey: false }
);

// Delete the associated workbook data when a workbook is deleted
workbookSchema.pre('deleteOne', async function (next) {
    const workbookId = this.workbook;
    await WorkbookData.deleteOne({ _id: workbookId });
    next();
});

workbookSchema.pre('save', async function (next) {
    console.log('Saving workbook:', this);
    this.lastUpdate = Date.now();
    next();
});

const Workbook = mongoose.model('Workbook', workbookSchema);

export default Workbook;
