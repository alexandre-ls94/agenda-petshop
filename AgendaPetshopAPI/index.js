const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');
const Tabelas = require('./infra/tabelas');

connection.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('Conectado com sucesso !');

        Tabelas.init(connection);

        const app = customExpress();

        app.listen(3000, () => { console.log('Executando servidor na porta 3000') });
    }
});