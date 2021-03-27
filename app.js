// MVC - model, view, controller

let modelController = (() => {
     class Expense {
          constructor(date, id, type, amount, discription){
               this.date = date;
               this.id = id;
               this.type = type;
               this.amount = amount;
               this.name = discription;
          }
     };
     
     class Income {
          constructor(date, id, type, amount, discription){
               this.date = date;
               this.id = id;
               this.type = type;
               this.amount = amount;
               this.name = discription;
          }
     };

     let data = {
          items : {
               exp : [3, 5],
               inc : [4, 5, 6]
          },

          total : 0,
          totalExp : 0,
          totalInc : 0
     }

     let generateID = (max) => {
          let ID = Math.floor(Math.random() * 1000000);
          return ID;
     };

     let generateDate = () => {
          let date = new Date().toDateString('us-en');
          return date;
     };

     // let calculateTotalExp = () => {
     //      data['totalExp'] = data['items'].exp.reduce((acc, curr) => {return acc + curr}, data['totalExp']);
     //      return data['totalExp'];
     // }

     // let calculateTotalInc = 

     return {
          addItem : () => {},
          removeItem : () => {},
          dataTotalInc : () => {
               data['totalInc'] = data['items'].inc.reduce((acc, curr) => {return acc + curr});
               return data['totalInc'];
          },
          dataTotalExp : () => {
               data['totalExp'] = data['items'].exp.reduce((acc, curr) => {return acc + curr});
               return data['totalExp'];
          },
          dataTotal : () => {
               data['total'] = data['totalInc'] - data['totalExp'];
               return data['total']
          }
          
     }
})();

let viewController = (() => {
     DOM = {
          totalAmount : '.total__amount',
          totalIncome : '.total__income',
          totalExpense : '.total__expense'
     }

     return {
          displayTotals : (dom, total) => {
               document.querySelector(dom).textContent = `$ ${total}`;
          }
     }
})();

let controller = ((model, view) => {

     let addItem = () => {};
     let removeItem = () => {};
     let reset = () => {};
     

     return {
          init : () => {
               console.log('App started');
               view.displayTotals(DOM['totalIncome'], model.dataTotalInc());
               view.displayTotals(DOM['totalExpense'], model.dataTotalExp());
               view.displayTotals(DOM['totalAmount'], model.dataTotal());
          }
     }
})(modelController, viewController);

controller.init();


