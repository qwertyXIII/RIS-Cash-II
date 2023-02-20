import {
    formInputNote,
    formInputName,
    formInputNumber,
    formInputReader,
    formInputBid,
    formInputDefect,
    formCheckboxMainsCahrger,
    formCheckboxCarCahrger,
    formInputKKT,
    formInputSN,
    formInputFrom,
    formInputLocation,
    formInputFn,
    formButtonAccept,
    formButtonIssue
} from '../utils/constants.js';

export function formSwitcher(switcher, selectorOne, selectorTwo) {

    for (let e of document.querySelectorAll('.switchable')) {
        e.classList.add('form__input_disabled');
    }

    formInputLocation.classList.add('form__input_disabled');


    formButtonAccept.classList.add('form__input_disabled'); 
    formButtonIssue.classList.add('form__input_disabled');

    formInputKKT.closest('.form__input-container').classList.remove('form__input_disabled');
    formInputSN.closest('.form__input-container').classList.remove('form__input_disabled');

    if (!switcher.checked) {
        formButtonIssue.closest('.switchable').classList.remove('form__input_disabled');
        formInputLocation.classList.remove('form__input_disabled');
        if (selectorOne.value == 'forwarder') {
            formInputNote.closest('.switchable').classList.remove('form__input_disabled');
            formInputReader.closest('.switchable').classList.remove('form__input_disabled');
            formInputName.closest('.switchable').classList.remove('form__input_disabled');
            formInputNumber.closest('.switchable').classList.remove('form__input_disabled');
            formCheckboxCarCahrger.closest('.switchable').classList.remove('form__input_disabled');
            formCheckboxMainsCahrger.closest('.switchable').classList.remove('form__input_disabled');
        } else if (selectorOne.value == 'repair') {
            formInputBid.closest('.switchable').classList.remove('form__input_disabled');
            formInputDefect.closest('.switchable').classList.remove('form__input_disabled');
        }

    } else {
        formButtonAccept.closest('.switchable').classList.remove('form__input_disabled');
        formInputFrom.classList.remove('form__input_disabled');
        if (selectorTwo.value == 'repair') {
            formInputFn.closest('.switchable').classList.remove('form__input_disabled');
        }
    }
}