import express, { Express } from "express";
import {
    TimeStampController,
    WhoAmIController,
    UrlShortenerController
} from "./controllers";

const app: Express = express()

app.use('/api/timestamp', TimeStampController)
app.use('/api/whoami', WhoAmIController)
app.use('/api/shorturl', UrlShortenerController)

export default app;