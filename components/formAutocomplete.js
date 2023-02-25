export function formAutocomplete(type, array, checkedInput, replaceableInput) {
  switch (type) {
    case 'kkt':
      for (let e of array) {
        if (e.kkt.includes(checkedInput.value)) {
          replaceableInput.value = e.sn
        }
      }
      break;
    case 'forwarders':
      for (let e of array) {
        if (e.name.toString().includes(checkedInput.value)) {
          replaceableInput.value = e.number
        }
      }
      break;
  }
}