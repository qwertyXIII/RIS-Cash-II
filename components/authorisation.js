import { authScreen, loadingScreen, loadingScreenText, user, userRole } from "../utils/constants.js"
import { addNotifications } from "./addNotifications.js";
import { getData } from "./communicator.js"

export let activeUser;

export function authorisation(parameter) {
  loadingScreenText.textContent = `Загрузка...`;

  getData({ table: 'users', user: parameter }).then((answer) => {
    if (answer.answer !== 'error') {
      activeUser = answer.answer[0];
      user.textContent = answer.answer[0].name;
      userRole.textContent = answer.answer[0].role;
      switch (answer.answer[0].role) {
        case 'developer':
          userRole.textContent = 'Разработчик'
          break;
        case 'admin':
          userRole.textContent = 'Администратор'
          break;
        case 'user':
          userRole.textContent = 'Пользователь'
          break;
      }
      authScreen.classList.add('authorisation_closed');
      addNotifications('ok', `${answer.answerText} ${answer.answer[0].name}.`)
        loadingScreen.classList.add('loading-screen_disabled');
    } else {
      addNotifications('error', `${answer.answerText}`)
      loadingScreenText.textContent = answer.answerText
      loadingScreen.classList.add('loading-screen_disabled');
    }
  });
}