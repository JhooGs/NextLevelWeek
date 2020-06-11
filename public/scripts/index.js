/* Procura na page home, dentro da main, e então o "a" e pega tudo para dentro
da const buttonSearch */
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

/* O elemento addEventListener não funciona em lista ou seja 
quando se usa o querySelectorAll */
buttonSearch.addEventListener("click",()=>{
    /* classList lista as funções que podem ser usadas em cima do retorno modal  */
    modal.classList.remove("hide")
})


close.addEventListener("click", ()=>{
    modal.classList.add("hide")
})