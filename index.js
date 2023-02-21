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
  contentLoader ('news', {table: 'news'});
});
allCashTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader ('element', {table: 'base'});
});
inRepairTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', {table: 'base', location: 'repair'});
});
inForwarderTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', {table: 'base', location: 'forwarder'});
});
inShopTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', {table: 'base', location: 'shop'});
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

/* Открыть при подключении */
contentLoader ('news', {table: 'news'});
contentLoader ('element', {table: 'base'});