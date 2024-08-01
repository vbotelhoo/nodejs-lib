import fs from 'fs';
import path from 'path';
import tratarError from './erros/funcoesErros.js';
import { contaPalavra } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultado')
    .action((options) => {
        const { texto, destino } = options;
        
        if (!texto || !destino){
            console.error(chalk.red('erro: favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Texto processado com sucesso'));
        } catch (err) {
            console.log('Ocorreu um erro no processamento', err)
        }
    })

program.parse();


function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (err, texto) => {
        try {
            if (err) throw err;
            const resultado = contaPalavra(texto);
            criaESalvaArquivo(resultado, destino);
        } catch (err){
            tratarError(err);
        }
    });
}


async function criaESalvaArquivo(listaPalavras, endereco){
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo (listaPalavras);
    try{
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('Arquivo criado');
    } catch (err) {
        throw err;
    }
};