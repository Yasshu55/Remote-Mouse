import express from 'express'
import cors from 'cors'
import expressWs from 'express-ws'
import { GlobalWebSocket } from './utils/ws'

const app = express()
expressWs(app)

app.use(express.json())
app.use(cors())
const PORT = 8000;

GlobalWebSocket(app)

app.listen(PORT, () => console.log(`Server running on PORT : `,PORT))