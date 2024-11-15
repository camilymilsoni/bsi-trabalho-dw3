const express = require("express");
const routerApp = express.Router();

const appContas = require("../apps/conta_corrente/controller/ctlContas");
const appLogin = require("../apps/login/controller/ctlLogin");

routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

routerApp.get("/GetAllContas", appLogin.AutenticaJWT, appContas.GetAllContas);
routerApp.post("/GetContaByID", appLogin.AutenticaJWT, appContas.GetContaByID);
routerApp.post("/InsertContas", appLogin.AutenticaJWT, appContas.InsertContas);
routerApp.post("/UpdateContas", appLogin.AutenticaJWT, appContas.UpdateContas);
routerApp.post("/DeleteContas", appLogin.AutenticaJWT, appContas.DeleteContas);

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;