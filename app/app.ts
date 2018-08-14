import express, { Express } from "express";
import { TimeStampController } from "./controllers";

const app : Express = express()

app.use('/api/timestamp', TimeStampController)

export default app;