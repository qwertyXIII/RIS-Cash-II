import { authorisation } from "./components/authorisation.js";
import { changeLocationGet, changeLocationGive } from "./components/changeLocationForm.js";
import { closer } from "./components/closer.js";
import { contentLoader } from "./components/contentLoader.js";
import { formSwitcher } from "./components/formSwitcher.js";
import { opener } from "./components/opener.js";
import { search } from "./components/search.js";
import { allCashTab, authScreen, authScreenForm, authScreenFormInput, changeLocationForm, changeLocationTab, endsFNTab, exitButton, formCheckboxSwitch, formInputFrom, formInputLocation, forwardersTab, historyTab, inForwarderTab, inRepairTab, inShopTab, loadingScreen, loadingScreenText, mainTab, searchButton, searchInput } from "./utils/constants.js";

export let activeTab;

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

/* поиск */
searchButton.addEventListener("click", () => {
  search(searchInput.value);
});
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    search(searchInput.value);
  }
});

/* События кнопок в хедере */
exitButton.addEventListener('click', () => {
  loadingScreenText.textContent = 'Загрузка...'
  authScreen.classList.remove('authorisation_closed');
})

/* события вкладок */
mainTab.addEventListener("click", (e) => {
  closer(); opener(e, "news"); activeTab = 'news';
  contentLoader('news', { table: 'news' });
  loadingScreen.classList.add('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка новостей...'
});
allCashTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'allCash';
  contentLoader('element', { table: 'base' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка всех касс...'
});
inRepairTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'inRepair';
  contentLoader('element', { table: 'base', location: 'repair' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс в ремонте...'
});
inForwarderTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'inForwarder';
  contentLoader('element', { table: 'base', location: 'forwarder' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс у экспедиторов...'
});
inShopTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'inShop';
  contentLoader('element', { table: 'base', location: 'shop' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс в магазине...'
});
endsFNTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'endsFN';

  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Пока-что эта функция недоступна.'
  setTimeout(() => {
    loadingScreen.classList.add('loading-screen_disabled');
  }, 1000);
});
historyTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'history';

  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Пока-что эта функция недоступна.';
  setTimeout(() => {
    loadingScreen.classList.add('loading-screen_disabled');
  }, 1000);
});
forwardersTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements"); activeTab = 'forwarders';
  contentLoader('forwarders', { table: 'forwarders' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка экспедиторов...'
});
changeLocationTab.addEventListener("click", (e) => {
  closer(); opener(e, "change-location  "); activeTab = 'changeLocation';

  loadingScreen.classList.add('loading-screen_disabled');
});

/* Форма входа */
authScreenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  authorisation(authScreenFormInput.value);
  loadingScreen.classList.remove('loading-screen_disabled');
});


/* Форма выдачи\принятия */
changeLocationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formCheckboxSwitch.checked) {
    changeLocationGive();
  } else {
    changeLocationGet();
  }
});

/* Открыть при подключении */
contentLoader('news', { table: 'news' });
contentLoader('forwarders', { table: 'forwarders' });
contentLoader('element', { table: 'base' });