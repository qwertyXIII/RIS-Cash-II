import { elementsContainer, elementTemplateForwarder, elementTemplateNews, newsContainer } from "../utils/constants.js";
import { getData } from "./communicator.js";

export function contentLoader(type, parametes) {
  switch (type) {
    case 'news':
      getData(parametes.table).then((answer) => {
        answer.answer.forEach(data => {
          elementsContainer.append(createElementTypeNews(data))
        });
      });
      break;
    case 'inForwarder':
      getData(parametes.table).then((answer) => {
        answer.answer.forEach(data => {
          if (data.location == 'forwarder') {
            elementsContainer.append(createElementTypeInForwarder(data))
          }
        });
      });
      break;
    case 'inRepair':
      getData(parametes.table).then((answer) => {
        answer.answer.forEach(data => {
          if (data.location == 'repair') {
            elementsContainer.append(createElementTypeInRepair(data))
          }
        });
      });
      break;
    case 'inShop':
      getData(parametes.table).then((answer) => {
        answer.answer.forEach(data => {
          if (data.location == 'shop') {
            elementsContainer.append(createElementTypeInShop(data))
          }
        });
      });
      break;
    case 'anywhere':
      getData(parametes.table).then((answer) => {
        answer.answer.forEach(data => {
          if (data.location == 'forwarder') {
            elementsContainer.append(createElementTypeInForwarder(data))
          } else 
          if (data.location == 'repair') {
            elementsContainer.append(createElementTypeInRepair(data))
          } else
          if (data.location == 'shop') {
            elementsContainer.append(createElementTypeInShop(data))
          }
        });
      });
      break;
  }
}

function createElementTypeNews(data) {
  let element = elementTemplateNews.content.querySelector('.content').cloneNode(true);
  element.classList.remove('content');
  element.querySelector('.news__header').textContent = data.title;
  element.querySelector('.news__text').textContent = data.text;
  element.querySelector('.news__date').textContent = data.date;
  return element;
}
function createElementTypeInForwarder(data) {
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
  return element;
}

function createElementTypeInShop(data) {
  let element = elementTemplateForwarder.content.querySelector('.content').cloneNode(true);
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
  return element;
}
function createElementTypeInRepair(data) {
  let element = elementTemplateForwarder.content.querySelector('.content').cloneNode(true);
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
  return element;
}