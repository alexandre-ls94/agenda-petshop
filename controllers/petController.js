const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => {
        const dadosPet = req.body;

        Pet.adiciona(dadosPet, res);
    });

    return app;
}