import express from 'express'
import connectDB from './utils/db.js';
import CONFIG from './utils/config.js';
import cors from 'cors'
import workbookRouter from './controllers/workbook.controller.js';


const app = express();
app.use(express.json({limit: '16mb'}));
app.use(cors()); // TODO: limit before deployment

connectDB();

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/workbooks', workbookRouter)

app.listen(CONFIG.PORT, () => {
    console.log(`Started express app. Listening on port ${CONFIG.PORT}`)
})