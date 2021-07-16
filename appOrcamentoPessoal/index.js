const select = document.querySelector('#ano');
    select.addEventListener('focus', () => {
      setYear();
    })

    const menuOpenner = document.querySelector('.menu-openner');
    menuOpenner.addEventListener('click', () => {
      toggleMenu();
});

function toggleMenu() {
  const menu = document.querySelector('.menu');
  if (menu.className === 'menu closed') {
    menu.className = 'menu openned';
  } else {
    menu.className = 'menu closed';
  }
}

let option;
function setYear() {
  if(!option) {
    const date = new Date();
    let ano = date.getFullYear();
    option = document.createElement('option');
    option.setAttribute('value', ano)
    option.innerHTML = ano;
    select.appendChild(option);
  }
}

class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = this.setMes(mes);
    this.dia = this.setDia(dia);
    this.tipo = this.setTipo(tipo);
    this.descricao = descricao;
    this.valor = valor;
  }

  setMes(mes) {
    if (mes.length == 1){
      mes = '0'+ mes;
    }
    return mes;
  }

  setDia(dia) {
    if (dia.length == 1) {
      dia = '0' + dia;
    }
    return dia;
  }

  setTipo(tipo) {
     switch(tipo) {
      case '1':
        return 'Alimentação'
      case '2':
        return 'Educação';
      case '3':
        return 'Lazer';
      case '4':
        return 'Saúde';
      case '5':
        return 'Transporte';
      default:
        return '';
     }
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {

  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0);
    }
  }
  getProximoId() {
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) + 1;
  }

  gravar(despesa) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(despesa))
    
    localStorage.setItem('id', id)
  }

  recuperarTodosRegistros() {

    let despesas = Array();
    let id = localStorage.getItem('id');

    for (let i = 1; i <= id; i++){
      let despesa = JSON.parse(localStorage.getItem(i));

      if (despesa != null) {
        despesa.id = i;
        despesas.push(despesa);
      }
    }
    return despesas;
  }

  pesquisar(despesa) {

    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarTodosRegistros();

    // ano
    if (despesa.ano != ''){
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
    }
    // mes
    if (despesa.mes != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);

    }
    // dia
    if (despesa.dia != ''){
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
    }
    // tipo
    
    if (despesa.tipo != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
    }
    // descricao
    if (despesa.descricao != '') {
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
    }
    // valor
    if (despesa.valor != ''){
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
    }
    return despesasFiltradas;

  }
}

let bd = new Bd();

const ano = document.querySelector('#ano');
const mes = document.querySelector('#mes');
const dia = document.querySelector('#dia');
const tipo = document.querySelector('#tipo');
const descricao = document.querySelector('#desc');
const valor = document.querySelector('#valor');

const modalContent = document.querySelector('#modal .content')
const modal = document.querySelector('#modal');
function cadastrarDespesa() {
  
  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
    );
    
    if (despesa.validarDados()) {
      bd.gravar(despesa);
      geraModalSucess();
    } else {
      geraModalError();
    }
    console.log();

    const voltar = document.querySelector('#voltar');
    voltar.addEventListener('click', () => {
      limpaValores();   
      modal.className = 'hide';
      modalContent.innerHTML = '';
    })
}

function limpaValores() {
  if (modal.className == 'sucess show') {
    ano.value = '';
    mes.value = '';
    dia.value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = '';
  }
}

function geraModalSucess() {
  modalContent.innerHTML += '<h1>Registro inserido com sucesso</h1>';
  modalContent.innerHTML+= '<p>Despesa cadastrada com sucesso!</p>';
  let modalButton = document.createElement('button');
  modalButton.innerHTML = 'Voltar';
  modalButton.setAttribute('id', 'voltar');
  modalContent.appendChild(modalButton);
  modal.className = 'sucess show';
  modalButton.focus()
}

function geraModalError() {
  modalContent.innerHTML += '<h1>Erro na gravação</h1>';
  modalContent.innerHTML+= '<p>Existem campos obrigatórios que não foram preenchidos!</p>';
  let modalButton = document.createElement('button');
  modalButton.innerHTML = 'Voltar e corrigir';
  modalButton.setAttribute('id', 'voltar');
  modalContent.appendChild(modalButton); 
  modal.className = 'error show';
  modalButton.focus()
}

const listaDespesas = document.querySelector('#listaDespesas');
function carregaListaDespesas() {
  if (localStorage.length == 1) {
    localStorage.setItem('id', 0)
  }
  pesquisarDespesa();
}

function geraBotaoExcluir() {
  const botaoExcluir = document.createElement('button');
  botaoExcluir.innerHTML = 'x';
  botaoExcluir.className = 'error';
  return botaoExcluir;
}

function pesquisarDespesa() {
  listaDespesas.innerHTML = '';
  let ano = document.querySelector('#ano').value;
  let mes = document.querySelector('#mes').value;
  let dia = document.querySelector('#dia').value;
  let tipo = document.querySelector('#tipo').value;
  let descricao = document.querySelector('#desc').value;
  let valor = document.querySelector('#valor').value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
  let despesas = bd.pesquisar(despesa);

  despesas.forEach(despesa => {
    
    let linha = listaDespesas.insertRow();
    
    linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`
    linha.insertCell(1).innerHTML = `${despesa.tipo}`
    linha.insertCell(2).innerHTML = `${despesa.descricao}`
    linha.insertCell(3).innerHTML = `${despesa.valor}`
    let btn = geraBotaoExcluir();
    btn.addEventListener('click', () => {
      localStorage.removeItem(despesa.id);
      pesquisarDespesa();
    })
    linha.insertCell(4).appendChild(btn);

    console.log(despesa)
  })
}