import { activeTab } from "../index.js";
import { elementsContainer } from "../utils/constants.js";
import { elements, createElementTypeInForwarder, createElementTypeInRepair, createElementTypeInShop, contentRemover } from "./contentLoader.js";


export function search(searchText) {
  let el = elements
  switch (activeTab) {
    case 'allCash':
      contentRemover(elementsContainer, 'element')
      el = el.filter(e => e.kkt.includes(searchText)  || e.sn.includes(searchText)  || e.forwarder.includes(searchText)); // фильтруем по локации
      for (let element of el) {
        if (element.location == 'forwarder') {
          elementsContainer.append(createElementTypeInForwarder(element))
        } else
          if (element.location == 'repair') {
            elementsContainer.append(createElementTypeInRepair(element))
          } else
            if (element.location == 'shop') {
              elementsContainer.append(createElementTypeInShop(element))
            }
      }
      break;
    case 'inRepair':

      break;
  }
}