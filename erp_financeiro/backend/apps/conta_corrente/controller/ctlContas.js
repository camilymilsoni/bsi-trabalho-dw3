const mdlContas = require("../model/mdlContas");

const GetAllContas = (req, res) =>
    (async () => {
        let registro = await mdlContas.GetAllContas();
        for (let i = 0; i < registro.length; i++) {
            const row = registro[i];   
            const formattedDate = row.data_abertura.toISOString().split('T')[0];
            row.data_abertura = formattedDate;
            
        }
        res.json({ status: "ok", registro: registro });
    })();

const GetContaByID = (req, res) =>
    (async () => {
        const contaID = parseInt(req.body.contaid);
        let registro = await mdlContas.GetContaByID(contaID);

        res.json({ status: "ok", registro: registro });
    })();

const InsertContas = (request, res) =>
    (async () => {
        const registro = request.body;
        let { msg, linhasAfetadas } = await mdlContas.InsertContas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const UpdateContas = (request, res) =>
    (async () => {
        const registro = request.body;
        let { msg, linhasAfetadas } = await mdlContas.UpdateContas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

const DeleteContas = (request, res) =>
    (async () => {
        const registro = request.body;
        let { msg, linhasAfetadas } = await mdlContas.DeleteContas(registro);
        res.json({ status: msg, linhasAfetadas: linhasAfetadas });
    })();

module.exports = {
    GetAllContas,
    GetContaByID,
    InsertContas,
    UpdateContas,
    DeleteContas
};