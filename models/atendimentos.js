const axios = require('axios');
const moment = require('moment');
const connection = require('../infra/database/connection');
const repository = require('../repositories/atendimentoRepository');

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = tamanho => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        // data da criação do atendimento, pegando a data atual automaticamente
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')

        // data agendada do atendimento, enviada pelo usuario
        const data = moment(atendimento.data, 'DD/MM/YYYY').format(
            'YYYY-MM-DD HH:MM:SS'
        )

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        // array de erros, sendo preeenchido caso o campo das validacoes for false
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))

            // o if verifica se contem erros e se tiver retorna status code 400 e o json com os erros. Caso não tenha erros , faz o cadastro do atendimento

        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repository.adiciona(atendimentoDatado).then(resultados => {
                const id = resultados.insertId
                return { ...atendimento, id }
            })
        }
    }

    lista() {
        return repository.lista();
    }

    buscarPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        connection.query(sql, async (erro, resultados) => {
            // resultados é um array, e como o metodo só retorna um objeto, pois o id é unico, então retiramos esse objeto do array para então apresenta-lo
            const atendimentoBuscado = resultados[0];
            const cpf = atendimentoBuscado.cliente;

            if (erro) {
                res.status(400).json(erro);
                // } else if (!atendimentoBuscado) {
                //     res.status(204);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                atendimentoBuscado.cliente = data;

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
                res.status(202).json({ ...dadosAtualizados, id });
            }
        });
    };

    deletar(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        connection.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(202).json({ mensagem: 'Deletado com sucesso' });
            }
        });
    };
}

module.exports = new Atendimento;