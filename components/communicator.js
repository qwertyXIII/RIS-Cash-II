// Функция отправки запроса данных с сервера
const token = 'AKfycbxqUyJPFqd-75JVhaKelFFm6MljdRcMt6_0YZUnIZ4tW3KhFmKGmX-EFsHPgpF_ZjY';

export let getData = function (parameters) {

  let url = new URL(`https://script.google.com/macros/s/${token}/exec`);

  url.searchParams.append('table', parameters.table);

  if ('user' in parameters) { url.searchParams.append('user', parameters.user); }
  if ('location' in parameters) { url.searchParams.append('location', parameters.location); }
  if ('forwarder' in parameters) { url.searchParams.append('forwarder', parameters.forwarder); }
  if ('kkt' in parameters) { url.searchParams.append('kkt', parameters.kkt); }
  if ('name' in parameters) { url.searchParams.append('name', parameters.name); }

  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error('Error: ' + this.status));
        }
      }
    };
    xhttp.send();
  });

}


// ?table=base&action=issue&data={"location":"forwarder","kkt":"000004","sn":"0004","forwarder":"testtesttesttest","reader":"1","number":"89006007878",
export let changeData = function (parameters) {

  let url = new URL(`https://script.google.com/macros/s/${token}/exec`);

  url.searchParams.append('table', parameters.table);
  url.searchParams.append('action', parameters.action);
  url.searchParams.append('data', JSON.stringify(parameters.data));

  console.log(url);

  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error('Error: ' + this.status));
        }
      }
    };
    xhttp.send();
  });

}