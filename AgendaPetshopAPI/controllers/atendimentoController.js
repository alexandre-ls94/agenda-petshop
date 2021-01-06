const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    // :id - parametro que sera enviado atraves da url da requisição
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscarPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const dadosAtendimento = req.body;

        // res esta sendo enviado como parametro para poder ser tratado no model e enviado ao usuario com melhor precisao 
        Atendimento.adiciona(dadosAtendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const dadosAtualizados = req.body;

        Atendimento.atualizar(id, dadosAtualizados, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deletar(id, res);
    })

    return app;
}