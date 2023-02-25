import { addNotifications } from "./components/addNotifications.js";
import { activeUser, authorisation } from "./components/authorisation.js";
import { changeLocationGet, changeLocationGive } from "./components/changeLocationForm.js";
import { closer } from "./components/closer.js";
import { changeData } from "./components/communicator.js";
import { contentLoader, elements, forwarders } from "./components/contentLoader.js";
import { formAutocomplete } from "./components/formAutocomplete.js";
import { formSwitcher } from "./components/formSwitcher.js";
import { opener } from "./components/opener.js";
import { search } from "./components/search.js";
import { allCashTab, authScreen, authScreenForm, authScreenFormInput, changeLocationForm, changeLocationTab, endsFNTab, exitButton, formCheckboxSwitch, formInputFrom, formInputKKT, formInputLocation, formInputName, formInputNumber, formInputSN, forwardersTab, historyTab, inForwarderTab, inRepairTab, inShopTab, loadingScreen, loadingScreenText, mainTab, reportButton, reportForm, reportFormInputText, reportFormInputTheme, reportFormSend, searchButton, searchInput } from "./utils/constants.js";

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


/* report button */
reportButton.addEventListener('click', () => {
  reportForm.closest('.popup').classList.remove('popup_closed');
  window.addEventListener('keyup', Closerlistener)
  function Closerlistener(e) {
    if (e.key === "Escape") {
      reportForm.closest('.popup').classList.add('popup_closed');
      window.removeEventListener('keyup', Closerlistener);
    }
  }
})
/* форма report */
reportForm.addEventListener('submit', (e) => {
  e.preventDefault();
  reportFormSend.setAttribute('disabled', true);
  reportFormSend.classList.add('form__send_disabled');
  reportFormSend.querySelector('.form__preloader').classList.remove('form__preloader_disabled');
  changeData({ table: 'reports', data: { user: activeUser.user, name: activeUser.name, theme: reportFormInputTheme.value, text: reportFormInputText.value } }).then((answer) => {
    reportFormSend.removeAttribute('disabled');
    reportFormSend.classList.remove('form__send_disabled');
    reportFormSend.querySelector('.form__preloader').classList.add('form__preloader_disabled');
    addNotifications('ok', `${answer.answerText}`);
    reportForm.closest('.popup').classList.add('popup_closed');
  });
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

formInputKKT.addEventListener('keyup', () => {
  formAutocomplete('kkt', elements, formInputKKT, formInputSN)
})
formInputName.addEventListener('keyup', () => {
  formAutocomplete('forwarders', forwarders, formInputName, formInputNumber)
})
// formAutocomplete(type, array, checkedInput, replaceableInput)

/* Открыть при подключении */
contentLoader('news', { table: 'news' });
contentLoader('forwarders', { table: 'forwarders' });
contentLoader('element', { table: 'base' });