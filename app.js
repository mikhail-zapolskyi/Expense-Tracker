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

     let generateID = (max) => {
          let ID = Math.floor(Math.random() * 1000000);
          return ID;
     };

     let generateDate = () => {
          let date = new Date().toDateString('us-en');
          return date;
     };

     let data = {
          items : {
               exp : [],
               inc : []
          },

          total : 0,
          totalExp : 0,
          totalInc : 0
     }

     return {
          income : new Income(generateDate(), generateID(7), 'type', 'amount', 'discription')
     }
})();

let viewController = (() => {
     
})();

let controller = ((model, view) => {
     return {
          init : () => {
               console.log(model.income);
          }
     }
})(modelController, viewController);

controller.init();


