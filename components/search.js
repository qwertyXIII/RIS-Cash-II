import { activeTab } from "../index.js";
import { elementsContainer } from "../utils/constants.js";
import { elements, createElementTypeInForwarder, createElementTypeInRepair, createElementTypeInShop, contentRemover, createElementTypeForwarder, forwarders } from "./contentLoader.js";


export function search(searchText) {
  let timeOut = 1;
  let el = elements
  let forw = forwarders
  contentRemover(elementsContainer, 'element')
  switch (activeTab) {
    case 'inForwarder':
    case 'allCash':
      el = el.filter(e => e.kkt.includes(searchText) || e.sn.includes(searchText) || e.forwarder.includes(searchText));
      elementRender(el);
      break;
    case 'inRepair':
      el = el.filter(e => e.kkt.includes(searchText) || e.sn.includes(searchText) || e.number.includes(searchText) || e.defect.includes(searchText));
      elementRender(el);
      break;
    case 'inShop':
      el = el.filter(e => e.kkt.includes(searchText) || e.sn.includes(searchText));
      elementRender(el);
      break;
    case 'history':
      el = el.filter(e => e.kkt.includes(searchText) || e.sn.includes(searchText) || e.number.includes(searchText) || e.defect.includes(searchText) || e.forwarder.includes(searchText));
      break;
    /*case 'forwarders':
      console.log(forw);
      forw = forw.filter(e => console.log(e) || e.number.includes(searchText));
      for (let element of el) {
        setTimeout(() => {
          elementsContainer.append(createElementTypeForwarder(element));
        }, timeOut);
        timeOut += 60;
      }
      break;*/ // выдает ошибку 
  }
}

function elementRender(el) {
  let timeOut = 1;
  for (let element of el) {
    setTimeout(() => {
      if (element.location == 'forwarder') {
        elementsContainer.append(createElementTypeInForwarder(element));
      } else
        if (element.location == 'repair') {
          elementsContainer.append(createElementTypeInRepair(element));
        } else
          if (element.location == 'shop') {
            elementsContainer.append(createElementTypeInShop(element));
          }
    }, timeOut);
    timeOut += 60;
  }
}