import { cores } from "./cores.js";
let rodada = 1;
const VELOCIDADE_1 = 2000;
const VELOCIDADE_2 = 1500;
const VELOCIDADE_3 = 1000;
const VELOCIDADE_4 = 500;
let TURNO = true;
let filaSetas = [];

iniciarJogo();

function iniciarJogo() {
  jogarRodada(VELOCIDADE_1);
  alterarTitulo("Nível 1");
}

function jogarRodada(velocidade) {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const coresJogador1 = sortearCores();
  const coresJogador2 = sortearCores();

  const coresDaRodada = intercalarArrays(coresJogador1, coresJogador2);
  let indiceCor = 0;
  const intervalo = setInterval(() => {
    desenharSeta(coresDaRodada[indiceCor]);
    indiceCor++;
    if (indiceCor === coresDaRodada.length) {
      clearInterval(intervalo);
      mostrarCores(coresJogador1, coresJogador2);
    }
  }, velocidade);
}

function desenharSeta(cor) {
  const main = document.querySelector("main");
  if (filaSetas.length > 0) {
    const setaAnterior = filaSetas.shift();
    main.removeChild(setaAnterior);
  }
  const seta = criarSeta(cor, TURNO);
  main.appendChild(seta);
  filaSetas.push(seta);
  TURNO = !TURNO;
}

function sortearCores() {
  let coresSorteadas = [];
  while (coresSorteadas.length < 8) {
    let cor = "";
    while (!cores.some((c) => c === cor) || coresSorteadas.includes(cor)) {
      cor = cores[gerarNumero()];
    }
    coresSorteadas.push(cor);
  }
  return coresSorteadas;
}

function criarSeta(cor, paraCima = true) {
  const seta = document.createElement("img");
  if (paraCima) {
    seta.src = `src/setaParaCima${cor.replace("#", "%23")}.svg`;
  } else {
    seta.src = `src/setaParaBaixo${cor.replace("#", "%23")}.svg`;
  }
  seta.style.width = "50%";
  return seta;
}

function gerarNumero() {
  return Math.floor(Math.random() * cores.length);
}

function intercalarArrays(array1, array2) {
  const intercalado = [];
  const maxLength = Math.max(array1.length, array2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) {
      intercalado.push(array1[i]);
    }
    if (i < array2.length) {
      intercalado.push(array2[i]);
    }
  }

  return intercalado;
}

function mostrarCores(coresJogador1, coresJogador2) {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const divCores1 = criarDivCores(coresJogador1);
  const divCores2 = criarDivCores(coresJogador2);

  main.append(
    gerarTituloJogador("Jogador 1"),
    divCores1,
    gerarTituloJogador("Jogador 2"),
    divCores2,
    criarBotaoProximoNivel()
  );
}

function criarDivCores(cores) {
  const divCores = document.createElement("div");
  divCores.style.height = "200px";
  divCores.style.width = "fit-content";
  divCores.style.display = "flex";
  divCores.append(...gerarDivsCor(cores));
  return divCores;
}

function criarBotaoProximoNivel() {
  const botaoProximoNivel = document.createElement("button");
  botaoProximoNivel.style.marginTop = "1rem";
  if (rodada < 4) {
    botaoProximoNivel.textContent = "Próximo Nível";
    botaoProximoNivel.addEventListener("click", proximoNivel);
  } else {
    botaoProximoNivel.textContent = "Jogar Novamente";
    botaoProximoNivel.addEventListener("click", reiniciarJogo);
  }
  return botaoProximoNivel;
}

function gerarDivsCor(cores) {
  return cores.map((c) => gerarDivCor(c));
}

function gerarDivCor(cor) {
  const divCor = document.createElement("div");
  divCor.style.backgroundColor = cor;
  divCor.style.borderRadius = "0.5rem";
  divCor.style.margin = "0.2rem";
  divCor.style.height = "100%";
  divCor.style.width = "2rem";
  return divCor;
}

function gerarTituloJogador(texto) {
  const h3 = document.createElement("h3");
  h3.textContent = texto;
  return h3;
}

function proximoNivel() {
  rodada++;
  if (rodada === 2) {
    jogarRodada(VELOCIDADE_2);
    alterarTitulo("Nível 2");
  } else if (rodada === 3) {
    jogarRodada(VELOCIDADE_3);
    alterarTitulo("Nível 3");
  } else if (rodada === 4) {
    jogarRodada(VELOCIDADE_4);
    alterarTitulo("Nível 4");
  }
}

function reiniciarJogo() {
  rodada = 1;
  TURNO = true;
  filaSetas = [];
  const main = document.querySelector("main");
  main.innerHTML = "";
  iniciarJogo();
}

function alterarTitulo(texto) {
  const output = document.querySelector("output");
  output.textContent = texto;
}
