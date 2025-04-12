import express from "express";
import cors from "cors";
import { createServer } from "http";
import { ServerErrorFilter } from "./middlewares/ErrorFIlter";
import { BodyParserMiddleware } from "./middlewares/BodyParser";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*" }));

app.use(BodyParserMiddleware);  
app.use(ServerErrorFilter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

export default app;

export { httpServer };
