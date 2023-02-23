
// ?table=base&action=issue&data={"location":"forwarder","kkt":"000004","sn":"0004","forwarder":"testtesttesttest","reader":"1","number":"89006007878",

import { formCheckboxCarCahrger, formCheckboxMainsCahrger, formInputBid, formInputDefect, formInputFn, formInputFrom, formInputKKT, formInputLocation, formInputName, formInputNumber, formInputReader, formInputSN } from "../utils/constants.js"
import { addNotifications } from "./addNotifications.js";
import { changeData } from "./communicator.js";

export function changeLocationGive() {
  let obj = {}
  obj.kkt = formInputKKT.value;
  obj.sn = formInputSN.value;
  obj.location = formInputLocation.value;
  if (formInputLocation.value == 'forwarder') {
    obj.reader = formInputReader.value;
    obj.forwarder = formInputName.value;
    obj.number = formInputNumber.value;
    if (formCheckboxCarCahrger) {
      obj.equipment += 'АЗУ';
    }
    if (formCheckboxMainsCahrger) {
      obj.equipment += 'СЗУ';
    }
  } else {
    obj.number = formInputBid.value;
    obj.defect = formInputDefect.value;
  }
  changeData({table: 'base', action: 'issue', data: obj}).then((answer) => {
    for (let e of answer.answerText) {
      addNotifications(answer.answer, e)
    }
  })
}

export function changeLocationGet() {
  let obj = {}
  obj.kkt = formInputKKT.value;
  obj.sn = formInputSN.value;
  obj.location = formInputFrom.value;

  if (formInputFrom.value == 'repair') {
    obj.FNValidityPeriod = formInputFn.value;
  }
  changeData({table: 'base', action: 'accept', data: obj}).then((answer) => {
    console.log(answer);
    for (let e of answer.answerText) {
      addNotifications(answer.answer, e)
    }
  })
}