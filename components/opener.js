import { tabContainer } from "../utils/constants.js";

export function opener(e, tab) {
  e.target.classList.add('header__tab_active');
  tabContainer.querySelector(`.${tab}`).classList.remove('tab_state_closed');
}