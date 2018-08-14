import express, { Express } from "express";
import {
    TimeStampController,
    WhoAmIController
} from "./controllers";

const app: Express = express()

app.use('/api/timestamp', TimeStampController)
app.use('/api/whoami', WhoAmIController)

export default app;