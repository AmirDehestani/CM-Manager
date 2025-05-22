import mongoose from 'mongoose';
import Workbook from './workbook.js';

const workbookDataSchema = new mongoose.Schema(
    {
        data: {
            type: Object,
            required: true,
        },
    },
    { versionKey: false }
);

// Updates the lastUpdate field for the associated workbook
workbookDataSchema.pre('save', async function (next) {
    try {
        await Workbook.findOneAndUpdate(
            { workbook: this._id },
            { lastUpdate: Date.now() },
            { new: true }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const WorkbookData = mongoose.model('WorkbookData', workbookDataSchema);
export default WorkbookData;
