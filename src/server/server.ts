import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { ServerErrorFilter } from "./middlewares/ErrorFIlter";
import { createEstabelecimento } from "./controller/EstabelecimentoSaude";
import { createAreaAbrangencia } from "./controller/AreaAbragenciaController";
import { createFormularioAntivetor } from "./controller/FormularioAntivetor";
import { createNotificacaoArbovirose } from "./controller/NotificacaoArbovirose";
import { createUsuario } from "./controller/Usuario";

const app = express();
const httpServer = createServer(app);


app.use(cors({ origin: "*" }));
app.use(json());
app.use(ServerErrorFilter);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/estabelecimento", createEstabelecimento);
app.post("/area-abrangencia", createAreaAbrangencia);
app.post("/form-antivetor", createFormularioAntivetor);
app.post("/notificacao-arbovirose", createNotificacaoArbovirose);
app.post("/user", createUsuario);

app.post("/post", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

export default app;
export { httpServer };
