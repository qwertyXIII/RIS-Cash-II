import { elementsContainer, elementTemplateForwarder, elementTemplateForwarderName, elementTemplateNews, elementTemplateRepair, elementTemplateShop, formForwardersDataList, formKktDataList, loadingScreen, newsContainer } from "../utils/constants.js";
import { getData } from "./communicator.js";

export let elements;
export let forwarders;

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

export function contentRemover(container, selector) {
  for (let e of container.querySelectorAll(`.${selector}`)) {
    e.classList.add('element_closed');
    setTimeout(() => {
      e.remove()
    }, 100)
  }
}