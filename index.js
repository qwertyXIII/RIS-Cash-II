import { formSwitcher } from "./components/formSwitcher.js";
import { formCheckboxSwitch, formInputFn, formInputFrom, formInputLocation } from "./utils/constants.js";

formInputLocation.addEventListener("change", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
})

formInputFrom.addEventListener("change", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
    console.log(123);
})

formCheckboxSwitch.addEventListener("click", () => {
    formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
})
