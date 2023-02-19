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
    formInputFn
} from '../utils/constants.js';

export function formSwitcher (switcher, selectorOne, selectorTwo) {

    for (let e of document.querySelectorAll('.form__input-container')) {
        e.classList.add('form__input_disabled');
    }

    formInputLocation.classList.add('form__input_disabled');
    
    formInputKKT.closest('.form__input-container').classList.remove('form__input_disabled');
    formInputSN.closest('.form__input-container').classList.remove('form__input_disabled');

    if (!switcher.checked) {
        formInputLocation.classList.remove('form__input_disabled');
        if (selectorOne.value == 'forwarder') {
            formInputNote.closest('.form__input-container').classList.remove('form__input_disabled');
            formInputReader.closest('.form__input-container').classList.remove('form__input_disabled');
            formInputName.closest('.form__input-container').classList.remove('form__input_disabled');
            formInputNumber.closest('.form__input-container').classList.remove('form__input_disabled');
            formCheckboxCarCahrger.closest('.form__input-container').classList.remove('form__input_disabled');
            formCheckboxMainsCahrger.closest('.form__input-container').classList.remove('form__input_disabled');
        } else if (selector.value == 'repair') {
            formInputBid.closest('.form__input-container').classList.remove('form__input_disabled');
            formInputDefect.closest('.form__input-container').classList.remove('form__input_disabled');
        }
        
    } else {
        formInputFrom.classList.remove('form__input_disabled');
        if (selectorTwo.value == 'repair') {
            formInputFn.closest('.form__input-container').classList.remove('form__input_disabled');
        }
    }
}