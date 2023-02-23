import { elementTemplateNotification, notificationContainer } from "../utils/constants.js";

export function addNotifications(type, message) {

  let element = elementTemplateNotification.content.querySelector('.content').cloneNode(true);
  switch (type) {
    case 'ok':
      element.querySelector('.notification__icon').setAttribute("name", "checkmark-circle-outline");
      break;
    case 'error':
      element.querySelector('.notification__icon').setAttribute("name", "alert-circle-outline");
      break;
  }
  element.querySelector('.notification__text').textContent = message;
  notificationContainer.append(element);
  setTimeout(() => {
    element.classList.remove('notification_closed');
  }, 10);
  setTimeout(() => {
    element.classList.add('notification_closed');
    setTimeout(() => {
      element.remove();
    }, 500);
  }, 5000);
}

