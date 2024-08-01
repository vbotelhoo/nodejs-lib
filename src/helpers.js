function filtraOcorrencia (paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1);
}

function montaSaidaArquivo (listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, index) => {
        const duplicadas = filtraOcorrencia(paragrafo).join(', ');
        if(duplicadas){
            textoFinal += `palavras duplicadas no paragrafo ${index}: ${duplicadas} \n`
        }
    });
    return textoFinal;
}

export { montaSaidaArquivo };