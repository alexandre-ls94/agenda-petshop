const connection = require('./connection');

const executaQuery = (query, parametros = '') => {
    // Promise recebe o resultado da query (se teve sucesso ou teve erros) e repassa para outra camada do codigo, no caso para o repository
    return new Promise((resolve, reject) => {
        connection.query(query, parametros, (erros, resultados, campos) => {
            if (erros) {
                reject(erros);
            } else {
                resolve(resultados)
            }
        })
    })    
}

module.exports = executaQuery;