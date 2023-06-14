
     // Retrieve data from localStorage
     var budgetInput = localStorage.getItem("budgetInput") || 0;
     var expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
     var balance = localStorage.getItem("balance") || 0;

     // Display data on page load
     document.getElementById("budget-view").innerText = budgetInput;
     document.getElementById("expense-amount").innerText = expenses.reduce((total, expense) => total + expense.amount, 0);
     document.getElementById("balance-amount").innerText = balance;

     // Set Budget
     document.getElementById("budget-form").addEventListener("submit", function(event) {
         event.preventDefault();
         var input = Number(document.getElementById("budget-input").value);
         if (input <= 0) {
             alert("Budget should be greater than zero!");
         } else {
             budgetInput = input;
             document.getElementById("budget-view").innerText = budgetInput;
             localStorage.setItem("budgetInput", budgetInput);
         }
     });

     // Add Expense
     document.getElementById("expense-form").addEventListener("submit", function(event) {
         event.preventDefault();
         var expenseObject = new UI();
         expenses.push(expenseObject);

         if ((expenses.reduce((total, expense) => total + expense.amount, 0)) > budgetInput) {
             alert("Expenses have exceeded the budget!");
             expenses.pop();
         } else {
             localStorage.setItem("expenses", JSON.stringify(expenses));

             var newRow = document.createElement("tr");
             newRow.innerHTML = "<td>" + expenseObject.catagary + "</td><td>" + expenseObject.expense + "</td><td>" + expenseObject.amount + "</td><td>" + expenseObject.date + "</td><td><i class='fas fa-pen-to-square mx-3'></i><i class='fas fa-xmark mx-3 delete-button'></i></td>";
             document.getElementById("expense-table").appendChild(newRow);

             var deleteButton = newRow.querySelector(".delete-button");
             deleteButton.addEventListener("click", function() {
                 deleteExpenseRow(this);
             });

             document.getElementById("expense-amount").innerText = expenses.reduce((total, expense) => total + expense.amount, 0);
             balance = budgetInput - expenses.reduce((total, expense) => total + expense.amount, 0);
             document.getElementById("balance-amount").innerText = balance;
             localStorage.setItem("balance", balance);
         }

         // Resetting input fields
         document.getElementById("date-input").value = "";
         document.getElementById("expense-input").value = "";
         document.getElementById("amount-input").value = "";
     });

     // Delete an expense row and update the expenses and balance
     function deleteExpenseRow(button) {
         var rowToDelete = button.closest("tr");
         var index = Array.from(rowToDelete.parentNode.children).indexOf(rowToDelete);
         var deletedExpense = expenses[index];
         expenses.splice(index, 1);

         // Remove the row from the table
         rowToDelete.remove();

         // Recalculate expenses and balance
         localStorage.setItem("expenses", JSON.stringify(expenses));
         document.getElementById("expense-amount").innerText = expenses.reduce((total, expense) => total + expense.amount, 0);
         balance = budgetInput - expenses.reduce((total, expense) => total + expense.amount, 0);
         document.getElementById("balance-amount").innerText = balance;
         localStorage.setItem("balance", balance);
     }

     // Creating class for Expense Object
     class UI {
         constructor() {
             this.date = document.getElementById("date-input").value;
             this.expense = document.getElementById("expense-input").value;
             this.amount = Number(document.getElementById("amount-input").value);
             this.catagary = (document.getElementById("cataaddInput").value);
             
         }
     }