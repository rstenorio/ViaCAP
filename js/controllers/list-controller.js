function State() {
  this.listSection = null;
}

const state = new State();

export function init(){
    state.listSection = document.querySelector("#list-section");
}

export function addCard(address){
    const card = createCard(address);
    state. listSection.appendChild(card);
}

function createCard(address) {
    const  div = document.createElement("div");
    div.classList.add("card-list-item")

    const city = document.createElement("h3");
    city.innerHTML = address.city;

    const street = document.createElement("p");
    street.classList.add("address-line");
    street.innerHTML = `${address.street}, ${address.number}`;
    
    const cep = document.createElement("p");
    cep.classList.add("address-cep");
    cep.innerHTML = address.cep;


    div.appendChild(city);
    div.appendChild(street);
    div.appendChild(cep);

    return div;
}

