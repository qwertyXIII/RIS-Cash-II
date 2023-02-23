import { addNotifications } from "./components/addNotifications.js";
import { authorisation } from "./components/authorisation.js";
import { changeLocationGet, changeLocationGive } from "./components/changeLocationForm.js";
import { closer } from "./components/closer.js";
import { contentLoader } from "./components/contentLoader.js";
import { formSwitcher } from "./components/formSwitcher.js";
import { opener } from "./components/opener.js";
import { allCashTab, authScreen, authScreenForm, authScreenFormInput, changeLocationForm, changeLocationTab, endsFNTab, exitButton, formCheckboxSwitch, formInputFrom, formInputLocation, forwardersTab, historyTab, inForwarderTab, inRepairTab, inShopTab, loadingScreen, loadingScreenText, mainTab } from "./utils/constants.js";

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

/* События кнопок в хедере */
exitButton.addEventListener('click', () => {
  loadingScreenText.textContent = 'Загрузка...'
  authScreen.classList.remove('authorisation_closed');
})

/* события вкладок */
mainTab.addEventListener("click", (e) => {
  closer(); opener(e, "news");
  contentLoader('news', { table: 'news' });
  loadingScreen.classList.add('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка новостей...'
});
allCashTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', { table: 'base' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка всех касс...'
});
inRepairTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', { table: 'base', location: 'repair' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс в ремонте...'
});
inForwarderTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', { table: 'base', location: 'forwarder' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс у экспедиторов...'
});
inShopTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");
  contentLoader('element', { table: 'base', location: 'shop' });
  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс в магазине...'
});
endsFNTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");

  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка касс, у который заканчивается срок действия ФН...'
});
historyTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");

  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка истории...'
});
forwardersTab.addEventListener("click", (e) => {
  closer(); opener(e, "elements");

  loadingScreen.classList.remove('loading-screen_disabled');
  loadingScreenText.textContent = 'Загрузка экспедиторов...'
});
changeLocationTab.addEventListener("click", (e) => {
  closer(); opener(e, "change-location  ");

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
contentLoader('element', { table: 'base' });