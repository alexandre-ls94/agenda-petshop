const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
    });

    // :id - parametro que sera enviado atraves da url da requisição
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscarPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const dadosAtendimento = req.body;

        Atendimento.adiciona(dadosAtendimento)
            .then(atendimendoCadastrado => res.status(201).json(atendimendoCadastrado))
            .catch(erros => res.status(400).json(erros))
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