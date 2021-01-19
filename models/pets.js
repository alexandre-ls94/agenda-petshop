const uploadDeArquivos = require('../infra/arquivos/uploadDeArquivos');
const connection = require('../infra/database/connection');

class Pet {
    adiciona(pet, res) {
        const sql = 'INSERT INTO Pets SET ?';

        //                (enviando, enviando, recebendo)
        uploadDeArquivos(pet.image, pet.nome, (erro, novoCaminho) => {
            if (erro) {
                res.status(400).json({ erro });
            } else {
                const novoPet = { nome: pet.nome, image: novoCaminho}
                connection.query(sql, novoPet, (erro) => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.status(201).json(novoPet);
                    }
                })
            }
        });        
    }
}

module.exports = new Pet;