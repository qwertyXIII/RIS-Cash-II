import { headerTabs, tabs } from "../utils/constants.js";

export function closer() {
  for (let e of headerTabs) {
    e.classList.remove('header__tab_active');
  }
  for (let e of tabs) {
    e.classList.add('tab_state_closed');
  }
}