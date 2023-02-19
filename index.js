import { formSwitcher } from "./components/formSwitcher.js";
import { formCheckboxSwitch, formInputFn, formInputLocation } from "./utils/constants.js";

formInputLocation.addEventListener("change", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFn);
})

document.querySelector('.form__input-fn').addEventListener("change", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFn);
    console.log(123);
})

formCheckboxSwitch.addEventListener("click", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFn);
})
