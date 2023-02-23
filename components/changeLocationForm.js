
// ?table=base&action=issue&data={"location":"forwarder","kkt":"000004","sn":"0004","forwarder":"testtesttesttest","reader":"1","number":"89006007878",

import { formCheckboxCarCahrger, formCheckboxMainsCahrger, formCheckboxSwitch, formInputBid, formInputDefect, formInputFn, formInputFrom, formInputKKT, formInputLocation, formInputName, formInputNumber, formInputReader, formInputSendAccept, formInputSendIssue, formInputSN } from "../utils/constants.js"
import { addNotifications } from "./addNotifications.js";
import { activeUser } from "./authorisation.js";
import { changeData } from "./communicator.js";
import { printReceiptForwarder, printReceiptRepair } from "./printRceipt.js";

export function changeLocationGive() {
  formInputSendIssue.classList.add('form__send_disabled')
  formInputSendIssue.setAttribute('disabled', true);
  formCheckboxSwitch.setAttribute('disabled', true);
  formInputSendIssue.querySelector('.form__preloader').classList.remove('form__preloader_disabled');
  let obj = {}
  obj.kkt = formInputKKT.value;
  obj.sn = formInputSN.value;
  obj.location = formInputLocation.value;
  obj.equipment = ''
  if (formInputLocation.value == 'forwarder') {

    if (!formValidator(['form__input-kkt', 'form__input-sn', 'form__input-name', 'form__input-number'])) {
      addNotifications('error', 'Заполните все необходимые поля!');
      formInputSendIssue.classList.remove('form__send_disabled');
      formInputSendIssue.removeAttribute('disabled');
      formCheckboxSwitch.removeAttribute('disabled');
      formInputSendIssue.querySelector('.form__preloader').classList.add('form__preloader_disabled');
      return;
    }

    obj.reader = formInputReader.value;
    obj.forwarder = formInputName.value;
    obj.number = formInputNumber.value;
    if (formInputNumber.value == '') {
      obj.number = 'none'
    }
    if (formCheckboxCarCahrger.checked) {
      obj.equipment += 'АЗУ ';
    }
    if (formCheckboxMainsCahrger.checked) {
      obj.equipment += 'СЗУ';
    }
  } else {
    if (!formValidator(['form__input-kkt', 'form__input-sn', 'form__input-bid', 'form__input-defect'])) {
      addNotifications('error', 'Заполните все необходимые поля!')
      formInputSendIssue.classList.remove('form__send_disabled')
      formInputSendIssue.removeAttribute('disabled');
      formCheckboxSwitch.removeAttribute('disabled');
      formInputSendIssue.querySelector('.form__preloader').classList.add('form__preloader_disabled');
      return;
    }
    obj.number = formInputBid.value;
    obj.defect = formInputDefect.value;
  }
  changeData({ table: 'base', action: 'issue', data: obj }).then((answer) => {
    for (let e of answer.answerText) {
      addNotifications(answer.answer, e)
    }
    if (answer.answer == 'ok' && obj.location == 'forwarder') {
      printReceiptForwarder(obj, activeUser.name);
    } else if (answer.answer == 'ok' && obj.location == 'repair') {
      printReceiptRepair(obj, activeUser.name);
    }
    formInputSendIssue.classList.remove('form__send_disabled')
    formInputSendIssue.removeAttribute('disabled');
    formCheckboxSwitch.removeAttribute('disabled');
    formInputSendIssue.querySelector('.form__preloader').classList.add('form__preloader_disabled');
  })
}

export function changeLocationGet() {
  formInputSendAccept.classList.add('form__send_disabled')
  formInputSendAccept.setAttribute('disabled', true);
  formCheckboxSwitch.setAttribute('disabled', true);
  formInputSendAccept.querySelector('.form__preloader').classList.remove('form__preloader_disabled');
  let obj = {}
  obj.kkt = formInputKKT.value;
  obj.sn = formInputSN.value;
  obj.location = formInputFrom.value;


  if (!formValidator(['form__input-kkt', 'form__input-sn'])) {
    addNotifications('error', 'Заполните все необходимые поля!')
    formInputSendIssue.classList.remove('form__send_disabled')
    formInputSendIssue.removeAttribute('disabled');
    formCheckboxSwitch.removeAttribute('disabled');
    formInputSendIssue.querySelector('.form__preloader').classList.add('form__preloader_disabled');
    return;
  }

  if (formInputFrom.value == 'repair') {
    obj.FNValidityPeriod = formInputFn.value;
  }
  changeData({ table: 'base', action: 'accept', data: obj }).then((answer) => {
    console.log(answer);
    for (let e of answer.answerText) {
      addNotifications(answer.answer, e)
    }
    formInputSendAccept.classList.remove('form__send_disabled')
    formInputSendAccept.removeAttribute('disabled');
    formCheckboxSwitch.removeAttribute('disabled');
    formInputSendAccept.querySelector('.form__preloader').classList.add('form__preloader_disabled');
  })
}

function formValidator(selectors) {
  for (let e of document.querySelectorAll('.form__input')) {
    if (selectorContains(e, selectors).value == '') {
      e.classList.add('form__input_wrong')
      setTimeout(() => {
        e.classList.remove('form__input_wrong')
      }, 1500);
      console.log(e);
      return false;
    }
  }
  return true;
  function selectorContains(el, selectors) {
    for (let selector of selectors) {
      if (el.classList.contains(selector) && el.value == '') {
        console.log(el);
        return el;
      }
    }
    return false;
  }
}