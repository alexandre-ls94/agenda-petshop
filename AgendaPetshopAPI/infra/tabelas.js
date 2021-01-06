class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, cliente VARCHAR(50) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacoes TEXT)';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            } else {
                console.log('Tabela Atendimentos criada com sucesso !');
            }
        });
    }
}

module.exports = new Tabelas;