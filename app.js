// MVC - model, view, controller

let modelController = (() => {
     class Expense {
          constructor(date, id, type, amount, discription){
               this.date = date;
               this.id = id;
               this.type = type;
               this.amount = amount;
               this.discription = discription;
          }
     };
     
     class Income {
          constructor(date, id, type, amount, discription){
               this.date = date;
               this.id = id;
               this.type = type;
               this.amount = amount;
               this.discription = discription;
          }
     };

     let data = {
          items : {
               exp : [],
               inc : []
          },

          total : 0,
          totalExp : 0,
          totalInc : 0
     };

     let generateDate = () => {
          let date = new Date().toDateString('us-en');
          return date;
     };

     let generateID = (max) => {
          let ID = `id${Math.floor(Math.random() * 1000000)}`;
          return ID;
     };

     return {
          generateItem : (type, amt, disc) => {
               let item;
               type === 'inc' 
                    ? item = new Income(generateDate(), generateID(), type, Number(amt), disc) 
                    : item = new Expense(generateDate(), generateID(), type, Number(amt), disc);
               data.items[type].push(item);
               return item;
          },

          findItem : (id, type) => {
               let item = data.items[`${type}`].filter(item => item.id === id);
               return item;
          },

          getData : () => { // FOR testing purposes  
               return data;
          },

          dataTotalInc : () => {
               data['totalInc'] = data.items.inc.map(item => item.amount).reduce((acc, curr) => {return acc += curr}, 0);
               return Number.parseFloat(data['totalInc']).toFixed(2);
          },

          dataTotalExp : () => {
               data['totalExp'] = data.items.exp.map(item => item.amount).reduce((acc, curr) => {return acc += curr}, 0);
               return Number.parseFloat(data['totalExp']).toFixed(2);
          },

          dataTotal : () => {
               data['total'] = data['totalInc'] - data['totalExp'];
               return Number.parseFloat(data['total']).toFixed(2);
          },

          resetInputs : (input) => {
               document.querySelector(input).value = '';
          },
     
          focus : (type) => {
               document.querySelector(type).focus();
          }
          
     }
})();

let viewController = (() => {
     DOM = {
          totalAmount : '.total__amount',
          totalIncome : '.total__income',
          totalExpense : '.total__expense',
          type : '.type',
          amount : '.amount',
          discription : '.discription',
          button : '.button',
          board : '.board__display',
          icon : '.board__card--icon'
     };

     return {
          getDOM : () => {
              return DOM;
          },
          
          getValue : (input) => {
               return document.querySelector(input).value;
          },

          displayTotals : (dom, total) => {
               document.querySelector(dom).textContent = `$ ${total}`;
          },

          displayItem : (obj) => {
               let html = `<div class="board__card ${obj.type}__border ${obj.type}" id="${obj.id}">
                    <div class="board__card--icon">X</div>
                    <div>
                         <div class="board__card--discription">${obj.discription}</div>
                         <div class="board__card--date">${obj.date}</div>
                    </div>
                    <div class="board__card--amount">$${obj.amount}</div>
               </div>`;
               document.querySelector(DOM.board).insertAdjacentHTML('beforeend', html);
          },

          removeItem : (id) => {
               let child = document.querySelector(`#${id}`);
               document.querySelector(DOM.board).removeChild(child);
          }
     }
})();

let controller = ((model, view) => {
     let dom = view.getDOM();

     let addItem = () => {
          let btn = document.querySelector(dom.button);
          btn.addEventListener('click', e => {
               e.preventDefault();
               let item = model.generateItem(view.getValue(dom.type), view.getValue(dom.amount), view.getValue(dom.discription));
               view.displayItem(item);
               updateAll();
               model.resetInputs(dom.amount);
               model.resetInputs(dom.discription);
               model.focus(dom.type);
               console.log(model.getData().items.exp);
               });
     };

     let updateAll = () => {
          view.displayTotals(dom.totalIncome, model.dataTotalInc());
          view.displayTotals(dom.totalExpense, model.dataTotalExp());
          view.displayTotals(dom.totalAmount, model.dataTotal());
     };

     let removeItem = () => {
          let icon = document.querySelector(dom.board);
          icon.addEventListener('click', e => {
               let id = e.target.parentNode.id;
               let type = e.target.parentNode.className.split(' ')[2];
               let item = model.findItem(id, type);
               let itemIndex = model.getData().items[`${type}`].indexOf(item[0]);
               model.getData().items[`${type}`].splice(itemIndex, 1);
               view.removeItem(id);
               updateAll();
          })
          
     };

     let reset = () => {};
     

     return {
          init : () => {
               console.log('App started');
               addItem();
               removeItem();
          }
     }
})(modelController, viewController);

controller.init();


