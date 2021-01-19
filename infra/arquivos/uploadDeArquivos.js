// fs(File System) - module nativo do node para trabalhar com arquivos
const fs = require('fs');
const path = require('path');

// ########### BUFFER ###########

// // readFile - usado para fazer a leitura do arquivo
// // recebe como parametros ('caminho do arquivo', função callback com erro e buffer do arquivo)
// fs.readFile('./assets/doguinho.png', (erro, buffer) => {
//     console.log(buffer);

//     // writeFile - usado para fazer a escrita do arquivo
//     // recebe como parametros ('caminho do arquivo a ser escrito', buffer do arquivo lido, função callback com erro)
//     fs.writeFile('./assets/doguinho2.png', buffer, (erro) => {
//         console.log('imagem escrita')
//     })
// });

// ########### STREAM ###########

//            (recebido de pets.js, recebido de pets.js, resposta enviada)
module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    // pega a extensão do caminho enviado
    const extensao = path.extname(caminho);
    
    // ******** VALIDAÇÃO ********
    //array com extensoes de arquivo aceitas
    const extensoesAceitas = ['.jpg', '.png', '.jpeg'];

    //indexOf percorrer o array e compara com o parametro enviado 
    const extensaoEhValida = extensoesAceitas.indexOf(extensao) !== -1;

    if (!extensaoEhValida) {
        const erro = 'Extensão do arquivo inválido!';
        callbackImagemCriada(erro);
    // ******** VALIDAÇÃO ********

    } else {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${extensao}`;

        // createReadStream - usado para fazer a leitura do arquivo em Stream (lendo aos poucos)
        // recebe como parametros ('caminho do arquivo') - não retorna callback
        fs.createReadStream(caminho)
            // pipe faz o retorno do createReadStream
            .pipe(fs.createWriteStream(novoCaminho))
            // on recebe um evento da Stream e executa uma função desejada quando o evento acontecer
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
            // callbackImagemCriada(false, novoCaminho) -> primeiro parametro false, se não houver erro 
    }    
}