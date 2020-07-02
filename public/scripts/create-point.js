function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

    /* Função anonima que retorna um valor, essea é a reduzido */
    /* Existe tbm a não tão reduzida () => {}  */
    /* Existe a função anonima normal que é function() {} */
    .then(res =>  res.json())
    .then( states => {
        for(x of states){
            ufSelect.innerHTML += `<option value="${x.id}">${x.nome}</option>`
        }
    } )
}

populateUFs()


function getCities(event){ 
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    let ufValue = (event.target.value)

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML="<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(res => res.json())
    .then( city =>{

        for(y of city){
            citySelect.innerHTML += `<option value="${y.nome}">${y.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    //Itens de coleta
    //Pegar todos os li's
    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (item of itemsToCollect) {
        item.addEventListener("click",handSelectedItem)
    }

    const collectedItems =  document.querySelector("input[name=items]")

    let selectedItems = []


        function handSelectedItem(event){
            
            const itemLi = event.target
            //adicionar ou remover uma classe com javascript
            itemLi.classList.toggle("selected")
            
            const itemId = itemLi.dataset.id

            console.log('ITEM ID:', itemId)

        //Verificar se existem itens selsecionados, se sim
        // Pegar os itens selecionados
        //essa function(item) é uma função anonima
        //Mas posso simplificar com a arrow e como so tem uma propriedade 
        //eu posso tirar os ()
        const alreadySelected = selectedItems.findIndex(item =>{
            /* Faz a verificação se o itemId já existe no array selectedItems */
            return item == itemId
        })

        //Se ja estiver selecionado tirar da seleção
        /* Verifica se o index existe no array */
        if(alreadySelected >= 0){
            const filtereditems = selectedItems.filter(item =>{
                const itemIsDifferent = item != itemId //isso será true ou false
                return itemIsDifferent
            })
            selectedItems = filtereditems
        }else{
            //Se não estiver selecionado, adicionar a seleção
            /* Push coloca dentro do array o valor */
            selectedItems.push(itemId)
        }        

        console.log('selectedItems: ', selectedItems)
        //Atualizar o campo escondido com os itens selecionados
        collectedItems.value = selectedItems

            
        
    }
