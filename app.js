let listaNumerosSorteados = [];
let numeroMaximo = 50; 
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

function exibirTexto (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}
function exibirMensagemIniciar () {
    exibirTexto ("h1", "Jogo do Número Secreto");
    exibirTexto ("p", `Diga um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemIniciar();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        let palavraTentativa = numeroTentativas > 1 ? "tentativas" : "tentiva";
        exibirTexto ("h1", `Parabéns, você acertou!`);
        exibirTexto ("p", `Você descobriu o número secreto com apenas ${numeroTentativas} ${palavraTentativa}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTexto ("p", `O número é MENOR do que ${chute}`);
        } else {
            exibirTexto ("p", `O número é MAIOR do que ${chute}`);
        }
        numeroTentativas++
        limparCampo();
    } 
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeDeElementosnaLista = listaNumerosSorteados.length;
   if (quantidadeDeElementosnaLista == numeroMaximo) {
    listaNumerosSorteados = [];
   }
   if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
   }
}
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    exibirMensagemIniciar();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}