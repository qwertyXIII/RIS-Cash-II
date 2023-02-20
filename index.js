import { closer } from "./components/closer.js";
import { contentLoader } from "./components/contentLoader.js";
import { formSwitcher } from "./components/formSwitcher.js";
import { opener } from "./components/opener.js";
import { allCashTab, changeLocationTab, elementsContainer, endsFNTab, formCheckboxSwitch, formInputFn, formInputFrom, formInputLocation, forwardersTab, historyTab, inForwarderTab, inRepairTab, inShopTab, mainTab } from "./utils/constants.js";

/* открытая вкладка */
export let activTab;

/* события формы */
formInputLocation.addEventListener("change", () => {
  formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
});
formInputFrom.addEventListener("change", () => {
  formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
});
formCheckboxSwitch.addEventListener("click", () => {
  formSwitcher(formCheckboxSwitch, formInputLocation, formInputFrom);
});

/* события вкладок */
mainTab.addEventListener("click", (e) => {
  closer(); opener(e, "news"); activTab = "news";
});
allCashTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader ('anywhere', {table: 'base'})
});
inRepairTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");

  console.log(1);
  let array = [];

  let interval = 1

  for (let e of elementsContainer.querySelectorAll('.element')) {
    array.push(e)
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  array = shuffle(array);

  for (let e of array) {
    
    setInterval(() => {
      e.remove();
    }, interval);
    interval = interval + 200
  }
  interval = 1

});
inForwarderTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
});
inShopTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
});
endsFNTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
});
historyTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
});
forwardersTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
});
changeLocationTab.addEventListener("click", (e) => {
  closer(); opener(e, "change-location  ");
});