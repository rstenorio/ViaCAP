import Address from "../models/address.js";

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
