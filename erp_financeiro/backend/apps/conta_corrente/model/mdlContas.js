const db = require("../../../database/databaseconfig");

const GetAllContas = async () => {
    return (
        await db.query(
            "SELECT * " + "FROM conta_corrente where removido = false ORDER BY nome_titular ASC"
        )
    ).rows;
};

const GetContaByID = async (contaIDPar) => {
    return (
        await db.query(
            "SELECT * " +
            "FROM conta_corrente WHERE contaid = $1 and removido = false ORDER BY nome_titular ASC",
            [contaIDPar]
        )
    ).rows;
};

const InsertContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO conta_corrente " + "values(default, $1, $2, $3, $4, $5)",
                [
                    registroPar.num_conta,
                    registroPar.nome_titular,
                    registroPar.saldo,
                    registroPar.data_abertura,
                    registroPar.removido,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContas|insertContas] " + error.message;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const UpdateContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE conta_corrente SET " +
                "num_conta = $2, " +
                "nome_titular = $3, " +
                "saldo = $4, " +
                "data_abertura = $5, " +
                "removido = $6 " +
                "WHERE contaid = $1",
                [
                    registroPar.contaid,
                    registroPar.num_conta,
                    registroPar.nome_titular,
                    registroPar.saldo,
                    registroPar.data_abertura,
                    registroPar.removido,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContas|UpdateContas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

const DeleteContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE conta_corrente SET " + "removido = true " + "WHERE contaid = $1",
                [registroPar.contaid]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContas|DeleteContas] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllContas,
    GetContaByID,
    InsertContas,
    UpdateContas,
    DeleteContas,
};