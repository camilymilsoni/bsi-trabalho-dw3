const axios = require("axios");
const moment = require("moment");

const manutContas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        const resp = await axios.get(process.env.servidorBackend + "/getAllContas", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).catch(error => {
            if (error.code === "ECONNREFUSED") {
                remoteMSG = "Servidor indisponível.";
            } else if (error.code === "ERR_BAD_REQUEST") {
                remoteMSG = "Usuário não autenticado.";
            } else {
                remoteMSG = error;
            }
            res.render("conta_corrente/view/vwManutContas.njk", {
                title: "Manutenção de Contas Correntes",
                data: null,
                erro: remoteMSG,
                userName: userName,
            });
        });

        if (!resp) {
            return;
        }

        res.render("conta_corrente/view/vwManutContas.njk", {
            title: "Manutenção de Contas Correntes",
            data: resp.data.registro,
            erro: null,
            userName: userName,
        });
    })();

const insertContas = async (req, res) =>
    (async () => {
        if (req.method == "GET") {
            return res.render("conta_corrente/view/vwCrContas.njk", {
                title: "Cadastro de Conta Corrente",
                data: null,
                erro: null,
                userName: null,
            });
        } else {
            const regData = req.body;
            const token = req.session.token;

            try {
                const response = await axios.post(process.env.servidorBackend + "/insertContas", regData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 5000,
                });

                res.json({
                    status: response.data.status,
                    msg: response.data.status,
                    data: response.data,
                    erro: null,
                });
            } catch (error) {
                console.error('Erro ao inserir dados no servidor backend:', error.message);
                res.json({
                    status: "Error",
                    msg: error.message,
                    data: response.data,
                    erro: null,
                });
            }
        }
    })();

const viewContas = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;

        try {
            if (req.method == "GET") {
                const id = req.params.id;
                oper = req.params.oper;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getContaByID",
                    {
                        contaid: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].data_abertura = moment(response.data.registro[0].data_abertura).format(
                        "YYYY-MM-DD"
                    );

                    res.render("conta_corrente/view/vwRUDContas.njk", {
                        title: "Visualização da Conta Corrente",
                        data: response.data.registro[0],
                        disabled: true,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlContas|viewContas] ID de conta corrente não localizado!");
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlContas|viewContas] Conta corrente não localizada!" });
            console.log("[ctlContas.js|viewContas] Try Catch: Erro não identificado", erro);
        }
    })();

const updateConta = async (req, res) =>
    (async () => {
        const userName = req.session.userName;
        const token = req.session.token;
        try {
            if (req.method == "GET") {
                const id = req.params.id;
                parseInt(id);

                response = await axios.post(
                    process.env.servidorBackend + "/getContaByID",
                    {
                        contaid: id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );

                if (response.data.status == "ok") {
                    response.data.registro[0].data_abertura = moment(response.data.registro[0].data_abertura).format(
                        "YYYY-MM-DD"
                    );

                    res.render("conta_corrente/view/vwRUDContas.njk", {
                        title: "Atualização de Dados da Conta Corrente",
                        data: response.data.registro[0],
                        disabled: false,
                        userName: userName,
                    });
                } else {
                    console.log("[ctlContas|updateConta] Dados não localizados!");
                }
            } else {
                const regData = req.body;
                const token = req.session.token;

                try {
                    const response = await axios.post(process.env.servidorBackend + "/updateContas", regData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        timeout: 5000,
                    });

                    res.json({
                        status: response.data.status,
                        msg: response.data.status,
                        data: response.data,
                        erro: null,
                    });
                } catch (error) {
                    console.error('[ctlContas.js|updateConta] Erro ao atualizar dados da conta corrente no servidor backend:', error.message);
                    res.json({
                        status: "Error",
                        msg: error.message,
                        data: response.data,
                        erro: null,
                    });
                }
            }
        } catch (erro) {
            res.json({ status: "[ctlContas.js|updateConta] Conta corrente não localizada!" });
            console.log(
                "[ctlContas.js|updateConta] Try Catch: Erro não identificado",
                erro
            );
        }

    })();

const deleteConta = async (req, res) =>
    (async () => {
        const regData = req.body;
        const token = req.session.token;

        try {
            const response = await axios.post(process.env.servidorBackend + "/deleteContas", regData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                timeout: 5000,
            });

            res.json({
                status: response.data.status,
                msg: response.data.status,
                data: response.data,
                erro: null,
            });
        } catch (error) {
            console.error('[ctlContas.js|deleteConta] Erro ao deletar dados da conta corrente no servidor backend:', error.message);
            res.json({
                status: "Error",
                msg: error.message,
                data: response.data,
                erro: null,
            });
        }
    })();

module.exports = {
    manutContas,
    insertContas,
    viewContas,
    updateConta,
    deleteConta
};