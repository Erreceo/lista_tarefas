var btn = document.getElementById('incluir');
var listaTarefas = [];

class Tarefa {

    constructor(texto, urgente = false) {
        this.texto = texto;
        this.urgente = urgente;
    }
}

let input = document.getElementById('tarefaTxt');
input.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        adicionarTarefa()
    }
})

function adicionarTarefa(){
    let input = document.getElementById('tarefaTxt');


    let tarefaTxt = input.value;
    if(tarefaTxt.length > 0){
        let novaTarefa = new Tarefa(tarefaTxt, false);
        listaTarefas.push(novaTarefa);
        criarLista()
    }
    input.value = '';
}

function criarLista () {
    listaTarefas = listaTarefas.sort(item => item.urgente === true? -1: 1);

    let divBase = document.getElementById('listaTarefas');
    let listaLis = document.querySelectorAll('#listaTarefas > div');
    for( let i = 0; i<listaLis.length; i++){
        listaLis[i].remove();
    }
    for(let i = 0; i<listaTarefas.length; i++){
        let divContainer = document.createElement('div');

        divContainer.addEventListener('dblclick', deleteTarefa);
        divContainer.addEventListener('click', marcarComoConcluido);
        divContainer.addEventListener('mouseover', toogleIcone);
        divContainer.addEventListener('mouseout', toogleIcone)
        divContainer.classList.add('container')

        let divRow = document.createElement('div');
        divRow.classList.add('row');

        let divCelulaTexto = document.createElement('div')
        divCelulaTexto.classList.add('col-11');
        let paragrafo = document.createElement('p')

        if(listaTarefas[i].urgente){
            paragrafo.classList.add('urgente');
        }else{
            paragrafo.classList.remove('urgente');
        }
        paragrafo.classList.add('h2');
        paragrafo.innerText = listaTarefas[i].texto;
        divCelulaTexto.appendChild(paragrafo)
        let divCelulaImagem = document.createElement('div');
        divCelulaImagem.classList.add('col-1');
        divCelulaImagem.classList.add('centralizar-imagem')
        divCelulaImagem.addEventListener('click', toogleUrgente)
        let image = document.createElement('img');
        image.classList.add('icone');
        image.src = './assets/exclamation-thick.svg'
        divCelulaImagem.appendChild(image)
        divRow.appendChild(divCelulaImagem);
        divRow.appendChild(divCelulaTexto)
        divContainer.appendChild(divRow);

        divBase.appendChild(divContainer);
    }
}
btn.addEventListener('click', adicionarTarefa);

function toogleUrgente(event){
    let nodes = Array.from(event.target.closest('#listaTarefas').children);
    let index = nodes.indexOf(event.target.parentElement.parentElement.parentElement);

    console.log(listaTarefas[index])
    listaTarefas[index].urgente = !listaTarefas[index].urgente;

    criarLista();

}

function marcarComoConcluido(event){
    if(!hasClass(event.target, 'concluido')){
        event.target.classList.add('concluido');
    }else{
        event.target.classList.remove('concluido');
    }
}

function hasClass(element, className) {
    if(element && element.classList){
        for (let i = 0; i < element.classList.length; i++){
            if(element.classList[i] === className){
                return true
            }
        }
    }
    return false;
}

function deleteTarefa(event){

    let confirmAction = confirm("Tem certeza que deseja excluir essa tarefa?");

    if(confirmAction){
        let nodes = Array.from(event.target.closest('div').children);
        let index = nodes.indexOf(event.target);
        listaTarefas.splice(index, 1);
        criarLista();
    }

}

function toogleIcone(event){

    console.log('funcionou')
    if(!hasClass(event.target.parentElement.parentElement.querySelector('div > img'), 'icone')){
        event.target.parentElement.parentElement.querySelector('div > img').classList.add('icone');
    }else{
        event.target.parentElement.parentElement.querySelector('div > img').classList.remove('icone');
    }
}