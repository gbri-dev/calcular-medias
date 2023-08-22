const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />'
const arrayAtividades = []
const arrayNotas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
let notaMinima = 0 
let linhas = ''

document.addEventListener('DOMContentLoaded', function(){
  getNotaMinima()
})

form.addEventListener('submit', function(e){
    e.preventDefault()    
    adicionandoLinha()
    atualizaTabela()    
    atualizaMedia()
})

function getNotaMinima(){
  let minNota = parseFloat(prompt('Digite a nota mínima para aprovação: ')) 
  if(minNota != 0 && minNota != null && minNota != undefined && minNota != NaN){    
    console.log(notaMinima)
    notaMinima = minNota
  }    
  else{
    alert('Nota mínima inválida')
    return getNotaMinima()
  }
}
  
function adicionandoLinha(){
  const nomeAtividade = document.getElementById('nome')
  const notaAtividade = document.getElementById('nota')

  if(arrayAtividades.includes(nomeAtividade.value)){
    alert('Atividade já cadastrada \nNome: ' + nomeAtividade.value + '\nNota: ' + notaAtividade.value + '\n')  
    nomeAtividade.value = ''
    notaAtividade.value = ''
    nomeAtividade.focus()
  }else{
    arrayAtividades.push(nomeAtividade.value)
    arrayNotas.push(notaAtividade.value)  
  
    let linha = '<tr>'
    linha += `<td>${nomeAtividade.value}</td>`
    linha += `<td>${notaAtividade.value}</td>`
    linha += `<td>${notaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`
    linha += '</tr>'
    linhas += linha 
  }

  nomeAtividade.value = ''
  notaAtividade.value = ''
}

function atualizaTabela(){
  let tableBody = document.querySelector('tbody')
  tableBody.innerHTML = linhas
}

function calcularMedia(){
  let soma = 0
  for(let i = 0; i < arrayNotas.length; i++){
    soma += parseFloat(arrayNotas[i])
  }
  return soma / arrayNotas.length
}

function atualizaMedia(){
  let media = calcularMedia()
  document.getElementById('media').innerHTML = media
  if(notaMinima != 0 && notaMinima != null && notaMinima != undefined && notaMinima != NaN)
    document.getElementById('resultado-media').innerHTML = media >= notaMinima ? spanAprovado : spanReprovado
  else{
    alert('Nota mínima inválida')
    notaMinima
  }
}