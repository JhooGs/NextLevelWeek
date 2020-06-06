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

    