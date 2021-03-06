// Inicializaremos o mapa e definiremos sua visualização para nossas coordenadas geográficas escolhidas e um nível de zoom:
// O objeto L existe devido ao JS chamado no HTML
const map = L.map('mapid').setView([-23.4244096,-51.9418853],15);

/* Primeira camada que irá receber o map */
/* Depois adiciona a variavel map inicializada */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// Criando o icone 
const icon = L.icon({
    iconUrl: "/images/map-marker.svg", // Localização do icone
    iconSize: [58,68], // Largura e altura do iconSize
    iconAnchor: [29,68], // Onde estará ancorado
})


/* Let deixa alterar o valor */
let marker;

/* O map tem uma funcionalidade devido a class leafleft vinda da biblioteca */
/* Função on -> Está ouvindo algo -> esperando o click */
/* Teve o click, executará uma função */
/* O click passará um parametro event */
/* A variavel marker é declarada somente uma vez, mas essa função pode ser chamada
   varias vezes */
map.on('click', (event) => {
    /* event terá a latitude e longitude por meio do objeto latlng*/
    const lat = event.latlng.lat; /* Pegando somente a latitude */
    const lng = event.latlng.lng; /* Pegando somente a longitude */

    /* Pegar um elemento (inputs) no document (HTML) e atribuir lat e lng */
    /* Insere value nos inputs selecionados */
    /* Esses values aparecerá na url quando o formulário for enviado */
    document.querySelector('[name=lat]').value = lat; // [name=lat] -> Qualquer tipo de tag que tiver tag com name = lat 
    document.querySelector('[name=lng]').value = lng;

    // REMOVER ICONE ANTERIOR E COLOCANDO OUTRO(Caso haja mais que um clique)
    // Se ja estiver um marker(primeiro verdadeiro), ele excluirá do mapa o marker, com o removeLayer
    marker && map.removeLayer(marker)
    // E colocara o novo abaixo
    
    /* - Objeto L cria uma marcação em uma posição, adiciona ao mapa com icone*/
    marker = L.marker([lat,lng], {icon}).addTo(map);
})


/* Adicionando ao campo de fotos */
function addPhotoField(){
    // Pegar o container de Fotos #images
    /* Selecionar no documento o bloco de fotos(#images)*/
    /* Na variavel é retornado exatamente o html dessa parte, incluido o images e new upload */
    const container = document.querySelector("#images");

    // Pegar o container para duplicar (new-upload) -> Pegar todos newupload e colocar na const
    /* Pegar todos os blocos new-upload contido no bloco de images */
    /* Retorna exatamente uma List com cada elemento sendo uma div de new-upload */
    const fieldsContainer = document.querySelectorAll(".new-upload");
    
    //console.log(fieldsContainer) // Testes
    
    // Realizar o clone da ultima imagem adicionada. 
    /* Dado o array acima, basta selecionar o ultimo elemento */
    /* Teremos o bloco HTML(uma div de new-upload) do ultimo elemento do bloco images */
    /* Em vez de pegar o ultimo elemento propriamente dito, é pego um clone dele(copia) */
    /* Quando armazenamos algo do documento, como esses blocos, não estamos pegando uma copia 
       e sim propriamente o elemento, por isso precisa-se fazer um clone*/
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    
    // Se o valor estiver vazio, ou seja, se ninguem digitou nada, não pode-se adicionar 
    // Explicação do newFieldContainer.children[0].value está nos comentarios debaixo
    // Verificar se o campo esta vazio, se sim, nao adicionar ao container de imagens
    const input = newFieldContainer.children[0];
    
    if(input.value == ""){
        return // Se estiver vazio, retornar e termina a execução  
    }

    //console.log(newFieldContainer) // Testes
    
    // Antes de adicionar, tem que limpar o campo para não ficar com o mesmo texto do clonado
    // Limpando o campo antes de adicionar ao container de images
    // Sendo o newFieldContainer um bloco div, iremos ver os filhos dentro do bloco  
    // Filhos serão HTMLCollection(2) [input, span, images: input]
    // Sendo [0] então o campo que queremos para limpar o nome do clonado
    // No console do browser é possivel ver que o input tem uma propriedade chamada value
    // Esse value armazena o texto digitado, assim basta coloca-lo como vazio
    input.value = ""

    // adicionar o clone ao container de #images
    /* Irá adicionar ao container images este ultimo que é igual ao ultimo elemento (Adicionar um filho) */
    /* Assim o bloco images tera adicionado um novo filho(uma div de new-upload)*/
    container.appendChild(newFieldContainer);
}

/* Deletar uma foto adicionada*/
// O event é o evento de quem está clicando nela
function deleteField(event){
    //console.log(event.currentTarget) // Ao ver no console é possivel ver varias funcionalidades que o event possibilita
    const span = event.currentTarget; // Mostra exatamente a tag span selecionada

    // Armazena na const todos os blocos de new upload presentes
    const fieldsContainer = document.querySelectorAll(".new-upload");

    //console.log(fieldsContainer.length) // Mostrar quantos elementos de new upload existem
    
    // A função retorna nenhuma funcionalidade de deletar, se tiver somente um elemento
    if(fieldsContainer.length < 2){
        // A funcionalidade opcional, é tendo somente um elemento
        // Limpar o campo desse elemento se clicado no delete
        // Vai no span, remete a raiz dele com parentNode, voltando para o bloco principal div
        // Chama os filhos desse bloco e seleciona o [0] -> input, e atribui value=""
        // Sera retirado o que foi digitado
        span.parentNode.children[0].value = ""       
        
        return
    }

    //Deletar o campo selecionado
    /* Maneira é pegar o pai do span é usando o parentNode*/
    //console.log(span.parentNode) // Faz com que pegue todo bloco div que span pertence
    // Com o bloco selecionado, basta aplicar o remove
    span.parentNode.remove();
}

// Select yes or no
/* Mudança da class active para o botao selecionado */
// Toggle - Alternância
function toggleSelect(event){
    // Retirar a class.active dos botões 
    /* Irar procurar todos os botoes dentro do bloco button-selection*/
    /* Retorna uma Nodelist com os dois botões -> document.querySelectorAll(".button-select button")*/
    /* Sendo uma lista basta percorrer cada elemento eliminando as classes active */
    /* Para percorrer usa-se o forEach */
    /* Dentro de cada elemento(botão), têm-se a classList, que mostra as classes presentes*/
    /* Basta colocar o remove na classe especifica -> active */
    document.querySelectorAll(".button-select button")
    .forEach((button)=>{
        button.classList.remove("active");
    })
    
    //console.log(document.querySelectorAll(".button-select button")) //Testes
    

    // Colocar a class .active no botão clicado
    // Apos tirar todos class active dos botoes, segue-se a ordem:
    /* 1: Armazena em const o botao que esta clicado */
    /* 2: Dado que tenha o bloco button retornado, basta pegar a lista de classes ->classList */
    /* 3: E com a classList utilizar o add para adicionar uma classe ao botao clicado */
    const button_click = event.currentTarget // Retorna o botão clicado <button>....
    button_click.classList.add("active");

    // Atualizar o input hidden com o valor selecionado
    /* O input hidden tem o um nome especificado -> open_on_weekends */
    /* Com esse nome, é feito uma busca por esse input pelo nome */
    const input = document.querySelector('[name="open_on_weekends"]') // Retorna a tag input

    //console.log(input)

    /* Cada botão tem um data-value para indicar se é sim ou nao*/
    /* Basta aplicar esse valor ao input*/
    /* Com o data-value nos botões,basta acessar o atributo especifico, com .dataset.value */
    input.value = button_click.dataset.value;
    /* Para ver esta ultima funcionalidade, basta preencher o formulario, colocando não para o
       o valor e na url é possivel ver este parametro atribuido -> 
       Ex: ...sadfdsafsda&open_on_weekends=0 */
}   

// Verifica se foi colocado um ponto no mapa, senão nao deixa enviar o formulário
function validate(event){

    const needsLatAndLng = false;

    
    // Validar se lat e lng estão preenchidos
    if(needsLatAndLng){
        // Faz não enviar o formulário
        event.preventDefault();

        // Mandar um alertar
        alert('Selecione um ponto no mapa')
    }
}