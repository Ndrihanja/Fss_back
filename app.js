import express from "express";
import mongoose from "mongoose";
import auth from "./routes/auth-routes";
import client from "./routes/client-routes";
import agent from "./routes/agent-routes";
import dossier from "./routes/dossier-routes";
import dashboard from "./routes/dash-routes";
import etape from "./routes/etape-routes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Controll-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api", auth);
app.use("/api/client", client);
app.use("/api/agent", agent);
app.use("/api/dossier", dossier);
app.use("/api/etape", etape);
app.use("/api/dashboard", dashboard);

const PORT = 5000;
const IP_ADDRESS = "localhost";

mongoose
  .connect("suivi_dossier")
  .then(() => app.listen(PORT, IP_ADDRESS))
  .then(() => console.log("Connexion avec succès"))
  .catch((err) => console.log(err));
