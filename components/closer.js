import { headerTabs, tabs } from "../utils/constants.js";

export function closer() {
  for (let e of headerTabs) {
    e.classList.remove('header__tab_active');
  }
  for (let e of tabs) {
    e.classList.add('tab_state_closed');
  }
}

export function adminPanelCloser(tabs, windows, buttons) {
  for (let e of tabs) {
    e.classList.remove('admin-tools__tab_active');
  }
  for (let e of windows) {
    e.classList.add('admin-tools__window_closed');
  }
  for (let e of buttons) {
    e.classList.add('admin-tools__button_closed');
  }
}