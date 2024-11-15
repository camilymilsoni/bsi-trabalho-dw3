var express = require('express');
var router = express.Router();
var contasApp = require("../apps/conta_corrente/controller/ctlContas");

function authenticationMiddleware(req, res, next) {
    const isLogged = req.session.isLogged;

    if (!isLogged) {
        return res.redirect("/Login");
    }
    next();
}

router.get('/ManutContas', authenticationMiddleware, contasApp.manutContas);
router.get('/InsertContas', authenticationMiddleware, contasApp.insertContas);
router.get('/ViewContas/:id', authenticationMiddleware, contasApp.viewContas);
router.get('/UpdateContas/:id', authenticationMiddleware, contasApp.updateConta);

router.post('/InsertContas', authenticationMiddleware, contasApp.insertContas);
router.post('/UpdateContas', authenticationMiddleware, contasApp.updateConta);
router.post('/DeleteContas', authenticationMiddleware, contasApp.deleteConta);

module.exports = router;