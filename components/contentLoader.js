import { adminPanelPreloader, elementsContainer, elementTemplateForwarder, elementTemplateForwarderName, elementTemplateHistory, elementTemplateNews, elementTemplateRepair, elementTemplateReport, elementTemplateShop, elementTemplateUser, formForwardersDataList, formKktDataList, loadingScreen, newsContainer, userControlWindow, viewReportsWindow } from "../utils/constants.js";
import { activeUser } from "./authorisation.js";
import { getData } from "./communicator.js";
import { printReceiptForwarder, printReceiptRepair } from "./printRceipt.js";

export let elements;
export let forwarders;

export let selectedUser;

export function contentLoader(type, parameters) {
  let timeOut = 1
  switch (type) {
    case 'news':
      getData(parameters).then((answer) => {
        contentRemover(newsContainer, 'news__element')
        answer.answer.forEach(data => {
          newsContainer.append(createElementTypeNews(data));
        });
        loadingScreen.classList.add('loading-screen_disabled');
      });
      break;
    case 'element':
      getData(parameters).then((answer) => {
        elements = answer.answer;
        contentRemover(elementsContainer, 'element')
        formKktDataList.innerHTML = ''
        answer.answer.forEach(data => {
          formKktDataList.prepend(new Option(data.kkt));
          setTimeout(() => {
            if (data.location == 'forwarder') {
              elementsContainer.append(createElementTypeInForwarder(data));
            } else
              if (data.location == 'repair') {
                elementsContainer.append(createElementTypeInRepair(data));
              } else
                if (data.location == 'shop') {
                  elementsContainer.append(createElementTypeInShop(data));
                }
          }, timeOut);
          timeOut += 60;
        });
        loadingScreen.classList.add('loading-screen_disabled');
      });
      break;
    case 'forwarders':
      getData(parameters).then((answer) => {
        forwarders = answer.answer;
        contentRemover(elementsContainer, 'element');
        formForwardersDataList.innerHTML = '';
        answer.answer.forEach(data => {
          formForwardersDataList.prepend(new Option(data.name));
          setTimeout(() => {
            elementsContainer.append(createElementTypeForwarder(data));
          }, timeOut);
          timeOut += 60;
        });
        loadingScreen.classList.add('loading-screen_disabled');
      });
      break;
    case 'user':
      getData(parameters).then((answer) => {
        userControlWindow.innerHTML = '';
        answer.answer.forEach(data => {
          userControlWindow.append(createElementTypeUser(data));
        })
        adminPanelPreloader.classList.add('form__preloader_disabled');
      })
      break;
    case 'reports':
      getData(parameters).then((answer) => {
        viewReportsWindow.innerHTML = '';
        answer.answer.forEach(data => {
          viewReportsWindow.append(createElementTypeReport(data));
        })
        adminPanelPreloader.classList.add('form__preloader_disabled');
      })
      break;
    case 'history':
      getData(parameters).then((answer) => {
        contentRemover(elementsContainer, 'element');
        answer.answer.forEach(data => {
          formForwardersDataList.prepend(new Option(data.name));
          setTimeout(() => {
            elementsContainer.append(createElementTypeHistory(data));
          }, timeOut);
          timeOut += 60;
        });
        loadingScreen.classList.add('loading-screen_disabled');
      })
      break;
  }
}

export function createElementTypeHistory(data) {
  console.log(data);
  let element = elementTemplateHistory.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.kkt-number').textContent = data.kkt;
  element.querySelector('.kkt-SN').textContent = data.sn;
  if (data.issued == '') {
    element.querySelector('.kkt-type').textContent = 'Принята: ';
    element.querySelector('.kkt-date').textContent = data.accepted;
  } else {
    element.querySelector('.kkt-type').textContent = 'Выдана: ';
    element.querySelector('.kkt-date').textContent = data.issued;
  }
  if (data.location == 'shop') {
    element.querySelector('.kkt-location').textContent = 'В магазин.';
  } else if (data.location == 'forwarder') {
    element.querySelector('.kkt-location').textContent = 'Экспедитору: ';
    element.querySelector('.kkt-from').textContent = data.forwarder;
  } else if (data.location == 'repair') {
    element.querySelector('.kkt-location').textContent = 'в ремонт по заявке: ';
    element.querySelector('.kkt-from').textContent = data.number;
  }
  /* invisible-part */
  element.querySelector('.kkt-reader').textContent = data.reader;
  element.querySelector('.kkt-equipment').textContent = data.equipment;
  /* EventListeners */
  element.querySelector('.element__button-open').addEventListener('click', () => {
    element.querySelector('.element__invisible').classList.toggle('element__invisible_close');
    element.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
  })
  element.querySelector('.element__button-open').addEventListener('dblclick', () => {
    for (let e of elementsContainer.querySelectorAll('.element')) {
      e.querySelector('.element__invisible').classList.toggle('element__invisible_close');
      e.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
    }
  })
  setTimeout(() => {
    element.classList.remove('element_closed');
  }, 100);
  return element;
}

function createElementTypeNews(data) {
  let element = elementTemplateNews.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.news__header').textContent = data.title;
  element.querySelector('.news__text').textContent = data.text;
  element.querySelector('.news__date').textContent = data.date;
  return element;
}
export function createElementTypeInForwarder(data) {
  let element = elementTemplateForwarder.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.kkt-number').textContent = data.kkt;
  element.querySelector('.kkt-SN').textContent = data.sn;
  element.querySelector('.kkt-forwarder').textContent = data.forwarder;
  /* invisible-part */
  element.querySelector('.kkt-reader').textContent = data.reader;
  element.querySelector('.kkt-equipment').textContent = data.equipment;
  element.querySelector('.kkt-FN-validity-period').textContent = data.FNValidityPeriod;
  element.querySelector('.kkt-issued').textContent = data.issued;
  /* EventListeners */
  element.querySelector('.element__button-open').addEventListener('click', () => {
    element.querySelector('.element__invisible').classList.toggle('element__invisible_close');
    element.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
  })
  element.querySelector('.element__button-open').addEventListener('dblclick', () => {
    for (let e of elementsContainer.querySelectorAll('.element')) {
      e.querySelector('.element__invisible').classList.toggle('element__invisible_close');
      e.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
    }
  })
  element.querySelector('.element__button-print').addEventListener('click', () => {
    for (let e of forwarders) {
      if (e.name == data.forwarder) {
        data.number = e.number
      }
    }
    printReceiptForwarder(data, activeUser.name);
  })
  setTimeout(() => {
    element.classList.remove('element_closed');
  }, 100);
  return element;
}

export function createElementTypeInShop(data) {
  let element = elementTemplateShop.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.kkt-number').textContent = data.kkt;
  element.querySelector('.kkt-SN').textContent = data.sn;
  /* invisible-part */
  element.querySelector('.kkt-FN-validity-period').textContent = data.FNValidityPeriod;
  /* EventListeners */
  element.querySelector('.element__button-open').addEventListener('click', () => {
    element.querySelector('.element__invisible').classList.toggle('element__invisible_close');
    element.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
  })
  element.querySelector('.element__button-open').addEventListener('dblclick', () => {
    for (let e of elementsContainer.querySelectorAll('.element')) {
      e.querySelector('.element__invisible').classList.toggle('element__invisible_close');
      e.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
    }
  })
  setTimeout(() => {
    element.classList.remove('element_closed');
  }, 100);
  return element;
}
export function createElementTypeInRepair(data) {
  let element = elementTemplateRepair.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.kkt-number').textContent = data.kkt;
  element.querySelector('.kkt-SN').textContent = data.sn;
  /* invisible-part */
  element.querySelector('.kkt-FN-validity-period').textContent = data.FNValidityPeriod;
  element.querySelector('.kkt-issued').textContent = data.issued;
  /* EventListeners */
  element.querySelector('.element__button-open').addEventListener('click', () => {
    element.querySelector('.element__invisible').classList.toggle('element__invisible_close');
    element.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
  })
  element.querySelector('.element__button-open').addEventListener('dblclick', () => {
    for (let e of elementsContainer.querySelectorAll('.element')) {
      e.querySelector('.element__invisible').classList.toggle('element__invisible_close');
      e.querySelector('.element__button-open-icon').classList.toggle('element__button-open-icon_active');
    }
  })
  element.querySelector('.element__button-print').addEventListener('click', () => {
    for (let e of forwarders) {
      if (e.name == data.forwarder) {
        data.number = e.number
      }
    }
    printReceiptRepair(data, activeUser.name);
  })
  setTimeout(() => {
    element.classList.remove('element_closed');
  }, 100);
  return element;
}

export function createElementTypeForwarder(data) {
  let element = elementTemplateForwarderName.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.forwarder-name').textContent = data.name;
  element.querySelector('.forwarder-number').textContent = data.number;
  setTimeout(() => {
    element.classList.remove('element_closed');
  }, 100);
  return element;
}

export function createElementTypeReport(data) {
  let element = elementTemplateReport.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.report-user').textContent = data.user
  element.querySelector('.report-name').textContent = data.name
  element.querySelector('.report-date').textContent = data.date
  element.querySelector('.report-theme').textContent = data.theme
  element.querySelector('.report-text').textContent = data.text
  return element;
}

export function createElementTypeUser(data) {
  let element = elementTemplateUser.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.user-element-user').textContent = data.user;
  element.querySelector('.user-element-name').textContent = data.name;

  switch (data.role) {
    case 'developer':
      element.querySelector('.user-element-role').textContent = 'Разработчик'
      break;
    case 'admin':
      element.querySelector('.user-element-role').textContent = 'Администратор'
      break;
    case 'user':
      element.querySelector('.user-element-role').textContent = 'Пользователь'
      break;
    default:
      element.querySelector('.user-element-role').textContent = 'Не определенно!'
      break;
  }
  element.addEventListener('click', () => {
    for (let e of document.querySelectorAll('.user-element')) {
      e.classList.remove('user-element_selected')
    }
    selectedUser = data;
    element.classList.add('user-element_selected')
  })
  return element;
}

export function contentRemover(container, selector) {
  for (let e of container.querySelectorAll(`.${selector}`)) {
    e.remove();
  }
}