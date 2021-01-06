const moment = require('moment');
const connection = require('../infra/connection');

class Atendimento {
    adiciona(atendimento, res) {
        // data da criação do atendimento, pegando a data atual automaticamente
        atendimento.dataCriacao = new Date();

        // data agendada do atendimento, enviada pelo usuario
        atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD');

        // comparativo para verificar se a data do agendamento é maior que a data de criação
        // isSameOrAfter esta verificando se atendimento.dataCriacao é maior ou igual a atendimento.data
        const dataValida = moment(atendimento.data).isSameOrAfter(atendimento.dataCriacao);

        // verifica se o nome do cliente tem mais de 3 ou mais letras
        const clienteValido = atendimento.cliente.length >= 3;

        // array de validacoes com mensagens de erro 
        const validacoes = [
            {
                campo: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                campo: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos três caracteres'
            }
        ]

        // array de erros, sendo preeenchido caso o campo das validacoes for false
        const erros = validacoes.filter(campo => !campo.valido);

        // o if verifica se contem erros e se tiver retorna status code 400 e o json com os erros. Caso não tenha erros , faz o cadastro do atendimento
        if (erros.length) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO Atendimentos SET ?';

            connection.query(sql, atendimento, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimento);
                }
            });
        }

    };

    lista(res) {
        const sql = 'SELECT * FROM atendimentos';

        connection.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    };

    buscarPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        connection.query(sql, (erro, resultados) => {
            // resultados é um array, e como o metodo só retorna um objeto, pois o id é unico, então retiramos esse objeto do array para então apresenta-lo
            const atendimentoBuscado = resultados[0]; 

            if (erro) {
                res.status(400).json(erro);
            // } else if (!atendimentoBuscado) {
            //     res.status(204);
            } else {
                res.status(200).json(atendimentoBuscado);
            }
        })
    };

    atualizar(id, dadosAtualizados, res) {
        if (dadosAtualizados.data) {
            dadosAtualizados.data = moment(dadosAtualizados.data, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';

        connection.query(sql, [dadosAtualizados, id], (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(202).json({...dadosAtualizados, id});
            }
        });
    };

    deletar(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        connection.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(202).json({mensagem: 'Deletado com sucesso'});
            }
        });
    };
}

module.exports = new Atendimento;