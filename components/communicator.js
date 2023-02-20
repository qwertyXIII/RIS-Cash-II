// Функция отправки запроса данных с сервера
const sheetId = 'AKfycbxqUyJPFqd-75JVhaKelFFm6MljdRcMt6_0YZUnIZ4tW3KhFmKGmX-EFsHPgpF_ZjY';


export let getData = function (parametes) {

  let url = new URL(`https://script.google.com/macros/s/${sheetId}/exec`);

  url.searchParams.append('table', parametes.table);

  if ('location' in parametes) { url.searchParams.append('location', parametes.location); }
  if ('forwarder' in parametes) { url.searchParams.append('forwarder', parametes.forwarder); }
  if ('kkt' in parametes) { url.searchParams.append('kkt', parametes.kkt); }
  if ('name' in parametes) { url.searchParams.append('name', parametes.name); }

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



/*
// Функция добавления данных на сервер
export let updateDataBase = function(id, obj, key) {
  let json = JSON.stringify(obj)
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", 'https://api.jsonstorage.net/v1/json/' + id + '?apiKey=' + key, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.responseText);
        console.log(this.responseText);
      } else {
        reject(new Error('Error ' + this.status));
    }
   }
  };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(String(json));
  });
}
*/