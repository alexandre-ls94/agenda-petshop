const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    // BodyParser está convertendo os dados enviados em urlencoded e json para serem utilizados no app
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Consign está carregando automaticamente os controllers quando inicia a aplicação
    consign()
        .include('controllers')
        .into(app);

    return app;
}