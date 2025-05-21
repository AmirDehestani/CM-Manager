import mongoose from 'mongoose'

const workbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // TODO: make it required once we have user auth
    },
    createdAt : {
        type: Date,
        default: Date.now,
        required: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
        required: true
    },
    ticket: {
        type: String,
        required: true,
        match: [/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/, 'Please enter a valid link for the ticket']
    },
    workbook: {
        type: Object,
        required: true
    }
})

workbookSchema.pre('save', function(next) {
    this.lastUpdate = Date.now()
    return next();
})

const Workbook = mongoose.model('Workbook', workbookSchema);

export default Workbook;