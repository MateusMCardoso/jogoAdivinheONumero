let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    }

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto!');
    exibirTextoNaTela('p', 'Adivinhe o número de 1 a 500:');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (isNaN(chute) || chute < 1 || chute > 500) {
        exibirTextoNaTela('p', 'Por favor, insira um número válido entre 1 e 500.');
        return;
    }
    chute = parseInt(chute);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você acertou o número com ${tentativas} ${palavraTentativas}! Parabéns`;
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'Número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random()*500+1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   if (quantidadeDeElementosNaLista == 500){
    listaDeNumerosSorteados = [];
  }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = null;
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarChute();
    }
});