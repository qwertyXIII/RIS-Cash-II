import { addNotifications } from "./components/addNotifications.js";
import { activeUser, authorisation } from "./components/authorisation.js";
import { changeLocationGet, changeLocationGive } from "./components/changeLocationForm.js";
import { adminPanelCloser, closer } from "./components/closer.js";
import { changeData } from "./components/communicator.js";
import { contentLoader, elements, forwarders, selectedUser } from "./components/contentLoader.js";
import { formAutocomplete } from "./components/formAutocomplete.js";
import { formSwitcher } from "./components/formSwitcher.js";
import { opener } from "./components/opener.js";
import { search } from "./components/search.js";
import { addNewsButton, addUserButton, addUserWindow, adminPanel, adminPanelAddUserForm, adminPanelCloseButton, adminPanelNewsTextInput, adminPanelNewsThemeInput, adminPanelOpenButton, adminPanelPreloader, adminPanelUserNameInput, adminPanelUserRoleInput, adminPanelUserTabelInput, allAdminButtons, allAdminTabs, allAdminWindows, allCashTab, authScreen, authScreenForm, authScreenFormInput, changeLocationForm, changeLocationTab, createNewsTab, createNewsWindow, endsFNTab, exitButton, formCheckboxSwitch, formInputFrom, formInputKKT, formInputLocation, formInputName, formInputNumber, formInputSN, forwardersTab, historyTab, inForwarderTab, inRepairTab, inShopTab, loadingScreen, loadingScreenText, mainTab, noRightsWindow, refreshTokenButton, refreshTokenTab, refreshTokenWindow, removeUserButton, reportButton, reportForm, reportFormInputText, reportFormInputTheme, reportFormSend, searchButton, searchInput, userControlTab, userControlWindow, viewReportsTab, viewReportsWindow } from "./utils/constants.js";

export let activeTab;

/* Форма входа */
authScreenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  authorisation(authScreenFormInput.value);
  loadingScreen.classList.remove('loading-screen_disabled');
});
contentLoader('news', { table: 'news' });
contentLoader('forwarders', { table: 'forwarders' });
contentLoader('element', { table: 'base' });

export function start() {
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

  /* Автозаполнение */
  formInputKKT.addEventListener('keyup', () => {
    formAutocomplete('kkt', elements, formInputKKT, formInputSN)
  });
  formInputName.addEventListener('keyup', () => {
    formAutocomplete('forwarders', forwarders, formInputName, formInputNumber)
  });

  if (activeUser.role == 'admin' || activeUser.role == 'developer') {
    /* вкладки админ-папнели */
    userControlTab.addEventListener('click', () => {
      contentLoader('user', { table: 'users' });
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      userControlTab.classList.add('admin-tools__tab_active');
      userControlWindow.classList.remove('admin-tools__window_closed');
      adminPanelPreloader.classList.remove('form__preloader_disabled');
      addUserButton.classList.remove('admin-tools__button_closed');
      removeUserButton.classList.remove('admin-tools__button_closed');
    });
    createNewsTab.addEventListener('click', () => {
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      if (activeUser.role != 'developer') {
        noRightsWindow.classList.remove('admin-tools__window_closed');
        return;
      }
      createNewsTab.classList.add('admin-tools__tab_active');
      createNewsWindow.classList.remove('admin-tools__window_closed');
      addNewsButton.classList.remove('admin-tools__button_closed');
    });
    viewReportsTab.addEventListener('click', () => {
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      if (activeUser.role != 'developer') {
        noRightsWindow.classList.remove('admin-tools__window_closed');
        return;
      }
      contentLoader('reports', { table: 'reports' });
      viewReportsTab.classList.add('admin-tools__tab_active');
      viewReportsWindow.classList.remove('admin-tools__window_closed');
      adminPanelPreloader.classList.remove('form__preloader_disabled');
    });
    refreshTokenTab.addEventListener('click', () => {
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      if (activeUser.role != 'developer') {
        noRightsWindow.classList.remove('admin-tools__window_closed');
        return;
      }
      refreshTokenTab.classList.add('admin-tools__tab_active');
      refreshTokenWindow.classList.remove('admin-tools__window_closed');
      refreshTokenButton.classList.remove('admin-tools__button_closed');
    });
    adminPanelOpenButton.addEventListener('click', () => {
      adminPanel.closest('.popup').classList.remove('popup_closed');
      contentLoader('user', { table: 'users' });
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      userControlTab.classList.add('admin-tools__tab_active');
      userControlWindow.classList.remove('admin-tools__window_closed');
      adminPanelPreloader.classList.remove('form__preloader_disabled');
      addUserButton.classList.remove('admin-tools__button_closed');
      removeUserButton.classList.remove('admin-tools__button_closed');
    });
    adminPanelCloseButton.addEventListener('click', () => {
      adminPanel.closest('.popup').classList.add('popup_closed')
    });

    /* Кнопки админ-панели */
    removeUserButton.addEventListener('click', () => {
      adminPanelPreloader.classList.remove('form__preloader_disabled');
      changeData({ table: 'users', action: 'remove', data: { user: selectedUser.user } }).then((answer => {
        for (let e of answer.answerText) {
          addNotifications(answer.answer, e)
        }
        contentLoader('user', { table: 'users' });
      }))
    });
    addUserButton.addEventListener('click', () => {
      adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
      if (activeUser.role != 'developer') {
        noRightsWindow.classList.remove('admin-tools__window_closed');
        return;
      }
      addUserWindow.classList.remove('admin-tools__window_closed');
    })
    adminPanelAddUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      adminPanelPreloader.classList.remove('form__preloader_disabled');
      changeData({ table: 'users', action: 'add', data: { user: adminPanelUserTabelInput.value, name: adminPanelUserNameInput.value, role: adminPanelUserRoleInput.value } }).then((answer => {
        for (let e of answer.answerText) {
          addNotifications(answer.answer, e)
          adminPanelPreloader.classList.add('form__preloader_disabled');
        }
        contentLoader('user', { table: 'users' });
        adminPanelCloser(allAdminTabs, allAdminWindows, allAdminButtons);
        userControlTab.classList.add('admin-tools__tab_active');
        userControlWindow.classList.remove('admin-tools__window_closed');
        adminPanelPreloader.classList.remove('form__preloader_disabled');
        addUserButton.classList.remove('admin-tools__button_closed');
        removeUserButton.classList.remove('admin-tools__button_closed');
      }))
    })
    addNewsButton.addEventListener('click', () => {
      adminPanelPreloader.classList.remove('form__preloader_disabled');
      changeData({ table: 'news', action: 'add', data: { title: adminPanelNewsThemeInput.value, text: adminPanelNewsTextInput.value } }).then((answer) => {
        for (let e of answer.answerText) {
          addNotifications(answer.answer, e)
          adminPanelPreloader.classList.add('form__preloader_disabled');
        }
      })
    })

  }
}