const Atendimento = require('../models/atendimentos');

module.exports = app => {
    // os verbos HTTP recebem como parametros um caminho da url e uma função que tem como parametros req (requisição) e res(resposta)
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            // then é uma promise que devolve um resultado quando o metodo acima é executado com sucesso
            .then(resultados => res.status(200).json(resultados))
            // catch é uma promisse que devolve os erros caso o metodo acima tenha falha
            .catch(erros => res.status(400).json(erros))
    });

    // :id - parametro que sera enviado atraves da url da requisição
    app.get('/atendimentos/:id', (req, res) => {
        // req.params é onde ficam os parametros enviados na url da requisição
        const id = parseInt(req.params.id);

        Atendimento.buscarPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        // req.body é onde ficam os dados enviados no corpo da requisição 
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