import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { ServerErrorFilter } from "./middlewares/ErrorFIlter";
import { CriarUsuarioController } from "./controller/Criar-Usuario";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*" }));
app.use(json());
app.use(ServerErrorFilter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/user", CriarUsuarioController);

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

export default app;

export { httpServer };
