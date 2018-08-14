import { createServer, Server } from "http";
import app from "./app";

const server: Server = createServer(app);

server.listen(3000, () => { console.log(`Listening on port ${3000}`) })