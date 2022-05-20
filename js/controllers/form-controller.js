import Address from "../models/address.js";
import * as addressService from '../services/address-service.js';

//funcao construtora
function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  let pathForm = document.forms.newAddress;

  state.inputCep = pathForm.cep;
  state.inputStreet = pathForm.street;
  state.inputNumber = pathForm.number;
  state.inputCity = pathForm.city;

  state.btnSave = pathForm.btnSave;
  state.btnClear = pathForm.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.inputNumber.addEventListener('change',handleInpuNumberChange);
  state.inputNumber.addEventListener('keyup',handleInpuNumberKeyup);

  state.inputCep.addEventListener('change', handleInpuCepChange);


  state.btnClear.addEventListener('click', handleBtnClearClick);  
  state.btnSave.addEventListener('click', handleBtnSaveClick);

}

function handleInpuNumberKeyup(e){
    state.address.number = e.target.value;
}

async function handleInpuCepChange(e){
    const cep = e.target.value;

    try {
        const address = await addressService.findByCep(cep);

        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;
        state.address = address;
    
        setFormError("cep","");
        state.inputNumber.focus();
            
    } catch (error) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        
        setFormError("cep","Informe um cep valido!!");

    }

}


async function handleBtnSaveClick(e){
    e.preventDefault();
    console.log(state.address);
}

function handleBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

function clearForm() {
    state.inputCep.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();

    state.inputCep.focus();
}



function handleInpuNumberChange(e) {
  if (e.target.value == "") {
    setFormError("number", "Campo Requerido");
  } else {
    setFormError("number", "");
  }
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
