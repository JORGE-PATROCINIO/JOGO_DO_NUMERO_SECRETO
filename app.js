
/*Para evitar repetição de código para definir os valores para os seletores, criamos uma função que
, recebe o nome da tag e o texto para otimiozar o nosso código!
let titulo = document.querySelector('h1');
titulo.innerHTML = 'JOGO DO CHUTE';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2}); // leitura por voz!
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'JOGO DO CHUTE');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10 !');

}

exibirMensagemInicial();


function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOU !!!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !!!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{ 
        if(chute > numeroSecreto){
            exibirTextoNaTela('h1', 'ERROU !!!!!');
            exibirTextoNaTela('p', 'Número secrete é menor que o chute !!!');
        }else{
            exibirTextoNaTela('h1', 'ERROU !!!!!');
            exibirTextoNaTela('p', 'Número secreto é maior que o chute !!!');
        }
        tentativas++;
        limparCampo();

    }

}

function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeLista = listaDeNumerosSorteados.length;

    if(quantidadeLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}