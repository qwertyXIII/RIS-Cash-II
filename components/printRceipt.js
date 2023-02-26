export function printReceiptForwarder(obj, user) {

  let printWindow = window.open('', '', 'width=891px,height=630px,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
  printWindow.document.write(`
    <body style="display: flex;width: 100vw;height: 100vh;margin: 0;justify-content: space-between;font-family: 'Helvetica', 'Arial', sans-serif;">
       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1"></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Корешок квитанции № ${new Date().getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Кард-ридер №: </div>
             <div class="table2">${obj.reader}</div>
             <div class="table1">Выдано экспедитору: ФИО и телефон</div>
             <div class="table2">${obj.forwarder}, ${obj.number}</div>
             <div class="table1">Комплектность: </div>
             <div class="table2">${obj.equipment}</div>
          </div>
          <div style="margin: 20px 0 0 0;">
             <p class="text">Настоящим, я ${obj.forwarder}, подтвеждаю факт передачи мне кассового оборудования со стороны ООО "МВМ".</p>
             <p class="text">Я осознаю, что несу ответственность за переданное мне оборудование.</p>
             <p class="text">Обязаюсь сдать оборудование в магазин, из которого то было выданно мне, в срок не позднее чем через 72 часа после предъявления требования со стороны магазина.</p>
          </div>
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, с условиями передачи оборудования ознакомлен, оборудование переданно ${obj.issued}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${user}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>
       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1"></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Квитанция № ${new Date().getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Кард-ридер №: </div>
             <div class="table2">${obj.reader}</div>
             <div class="table1">Выдано экспедитору: ФИО и телефон</div>
             <div class="table2">${obj.forwarder}, ${obj.number}</div>
             <div class="table1">Комплектность: </div>
             <div class="table2">${obj.equipment}</div>
          </div>
          <div style="margin: 20px 0 0 0;">
             <p class="text">Настоящим, я ${obj.forwarder}, подтвеждаю факт передачи мне кассового оборудования со стороны ООО "МВМ".</p>
             <p class="text">Я осознаю, что несу ответственность за переданное мне оборудование.</p>
             <p class="text">Обязаюсь сдать оборудование в магазин, из которого то было выданно мне, в срок не позднее чем через 72 часа после предъявления требования со стороны магазина.</p>
          </div>
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, с условиями передачи оборудования ознакомлен, оборудование переданно ${obj.issued}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${user}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>
       <style>
          @media print {
            @page { margin: 3px; }
            body { margin: 0.2cm; }
          }
          .podpis:after {content: "Подпись экспедитора";position: absolute;right: 26px;bottom: -8px;font-size: 8px;}
          .barcode {margin: 0 0 0 50%;width: 50%;height: 5%;}
          .table1 {width: 30%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;font-weight: bold;}
          .table2 {width: 70%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;}
          .text {font-size: 12px;}
          .text1 {width: 60%;font-size: 75%;}
          .text1 {width: 60%;font-size: 75%;margin: 10px 0 0 0;}
          .text2 {width: 40%;font-size: 75%;margin: 10px 0 0 0;height: 15px;text-align: end;}
       </style>
       <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js"></script>
       <script>
          JsBarcode("#barcode1", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
          JsBarcode("#barcode2", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
       </script>
    </body>
  `);
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function printReceiptRepair(obj, user) {

  let printWindow2 = window.open('', '', 'width=891px,height=630px,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
  printWindow2.document.write(`
  <body style="display: flex;width: 100vw;height: 100vh;margin: 0;justify-content: space-between;font-family: 'Helvetica', 'Arial', sans-serif;">
       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1" width="380px" height="60px" x="0px" y="0px" viewBox="0 0 380 60" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)"><rect x="0" y="0" width="380" height="60" style="fill:#ffffff;"></rect><g transform="translate(10, 10)" style="fill:#000000;"><rect x="0" y="0" width="8" height="40"></rect><rect x="12" y="0" width="4" height="40"></rect><rect x="24" y="0" width="4" height="40"></rect><rect x="44" y="0" width="4" height="40"></rect><rect x="56" y="0" width="16" height="40"></rect><rect x="76" y="0" width="4" height="40"></rect><rect x="88" y="0" width="4" height="40"></rect><rect x="96" y="0" width="8" height="40"></rect><rect x="112" y="0" width="4" height="40"></rect><rect x="132" y="0" width="4" height="40"></rect><rect x="140" y="0" width="16" height="40"></rect><rect x="164" y="0" width="4" height="40"></rect><rect x="176" y="0" width="4" height="40"></rect><rect x="188" y="0" width="16" height="40"></rect><rect x="208" y="0" width="4" height="40"></rect><rect x="220" y="0" width="8" height="40"></rect><rect x="236" y="0" width="12" height="40"></rect><rect x="256" y="0" width="4" height="40"></rect><rect x="264" y="0" width="4" height="40"></rect><rect x="284" y="0" width="8" height="40"></rect><rect x="300" y="0" width="4" height="40"></rect><rect x="308" y="0" width="8" height="40"></rect><rect x="328" y="0" width="12" height="40"></rect><rect x="344" y="0" width="4" height="40"></rect><rect x="352" y="0" width="8" height="40"></rect></g></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Корешок квитанции № ${new Date().getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Дефект: </div>
             <div class="table2">${obj.defect}</div>
             <div class="table1">Выдано мастеру по заявке:</div>
             <div class="table2">${obj.number}</div>
          </div>
          
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, оборудование переданно ${obj.issued}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${user}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>
       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1" width="380px" height="60px" x="0px" y="0px" viewBox="0 0 380 60" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)"><rect x="0" y="0" width="380" height="60" style="fill:#ffffff;"></rect><g transform="translate(10, 10)" style="fill:#000000;"><rect x="0" y="0" width="8" height="40"></rect><rect x="12" y="0" width="4" height="40"></rect><rect x="24" y="0" width="4" height="40"></rect><rect x="44" y="0" width="4" height="40"></rect><rect x="56" y="0" width="16" height="40"></rect><rect x="76" y="0" width="4" height="40"></rect><rect x="88" y="0" width="4" height="40"></rect><rect x="96" y="0" width="8" height="40"></rect><rect x="112" y="0" width="4" height="40"></rect><rect x="132" y="0" width="4" height="40"></rect><rect x="140" y="0" width="16" height="40"></rect><rect x="164" y="0" width="4" height="40"></rect><rect x="176" y="0" width="4" height="40"></rect><rect x="188" y="0" width="16" height="40"></rect><rect x="208" y="0" width="4" height="40"></rect><rect x="220" y="0" width="8" height="40"></rect><rect x="236" y="0" width="12" height="40"></rect><rect x="256" y="0" width="4" height="40"></rect><rect x="264" y="0" width="4" height="40"></rect><rect x="284" y="0" width="8" height="40"></rect><rect x="300" y="0" width="4" height="40"></rect><rect x="308" y="0" width="8" height="40"></rect><rect x="328" y="0" width="12" height="40"></rect><rect x="344" y="0" width="4" height="40"></rect><rect x="352" y="0" width="8" height="40"></rect></g></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">квитанция № ${new Date().getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Дефект: </div>
             <div class="table2">${obj.defect}</div>
             <div class="table1">Выдано мастеру по заявке:</div>
             <div class="table2">${obj.number}</div>
          </div>
          
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, оборудование переданно ${obj.issued}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${user}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>
       <style>
          @media print {
            @page { margin: 3px; }
            body { margin: 0.2cm; }
          }
          .podpis:after {content: "Подпись мастера";position: absolute;right: 34px;bottom: -8px;font-size: 8px;}
          .barcode {margin: 0 0 0 50%;width: 50%;height: 5%;}
          .table1 {width: 30%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;font-weight: bold;}
          .table2 {width: 70%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;}
          .text {font-size: 12px;}
          .text1 {width: 60%;font-size: 75%;}
          .text1 {width: 60%;font-size: 75%;margin: 10px 0 0 0;}
          .text2 {width: 40%;font-size: 75%;margin: 10px 0 0 0;height: 15px;text-align: end;}
       </style>
       <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js"></script>
       <script>
          JsBarcode("#barcode1", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
          JsBarcode("#barcode2", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
       </script>
    
  </body>
  `);
  setTimeout(() => {
    printWindow2.print();
  }, 500);
}