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

    let ul = document.getElementById('listaTarefas');
    let listaLis = document.querySelectorAll('li');
    for( let i = 0; i<listaLis.length; i++){
        listaLis[i].remove();
    }
    for(let i = 0; i<listaTarefas.length; i++){
        let li = document.createElement('li');
        li.innerText = listaTarefas[i].texto;
        li.addEventListener('dblclick', deleteTarefa);
        li.addEventListener('click', marcarComoConcluido);
        li.addEventListener('mouseover', toogleIcone);
        li.addEventListener('mouseout', toogleIcone)
        if(listaTarefas[i].urgente){
            li.classList.add('urgente');
        }else{
            li.classList.remove('urgente');
        }
        let image = document.createElement('img');
        image.classList.add('icone');
        image.src = './assets/exclamation-thick.svg'
        image.addEventListener('click', toogleUrgente)
        li.appendChild(image);
        ul.appendChild(li);
    }
}
btn.addEventListener('click', adicionarTarefa);

function toogleUrgente(event){
    let nodes = Array.from(event.target.closest('ul').children);
    let index = nodes.indexOf(event.target.parentElement);

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
        let nodes = Array.from(event.target.closest('ul').children);
        let index = nodes.indexOf(event.target);
        listaTarefas.splice(index, 1);
        criarLista();
    }

}

function toogleIcone(event){
    if(!hasClass(event.target.querySelector('img'), 'icone')){
        event.target.querySelector('img').classList.add('icone');
    }else{
        event.target.querySelector('img').classList.remove('icone');
    }
}