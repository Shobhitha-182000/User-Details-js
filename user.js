// var ul=document.createElement("ul");
// var container=document.getElementById("container");
// var button=document.getElementById("button");
// button.addEventListener("click",addData);

//  function addData(a){
//     a.preventDefault();
//     var name=document.getElementById("name").value;
//     var email=document.getElementById("email").value;
//     var password=document.getElementById("password").value;
//     const obj={ name,
//         email,
//         password
//     }
//     var input= "name :"+obj.name+" "+"email : "+obj.email+" "+"Password : "+obj.password;
//     var li = document.createElement("li");
//     ul.appendChild(li);
//     li.className = "list-group-item";
//     var edit = document.createElement("button");
//     edit.className = "btn btn-outline-primary mx-2 on";
//     edit.appendChild(document.createTextNode("Edit Expense"));
//     var deleteBtn = document.createElement("button");
//     deleteBtn.className = "btn btn-outline-danger mx-10 on";
//     deleteBtn.appendChild(document.createTextNode("Delete"));
  
//     li.appendChild(document.createTextNode(input));
//     li.appendChild(edit);
//     li.appendChild(deleteBtn);
//     ul.appendChild(li);
//     container.appendChild(ul);
//     axios.post("https://crudcrud.com/api/e73b6b1b5c584dc19218de843521a17b/expenses",obj)
//     .then((response)=>{
//       console.log(response.data)
//     }).catch((err)=>console.log(err));
    
//     //to edit
//     edit.addEventListener("click",(a)=>{
//         a.preventDefault();     
         
//         container.innerHTML= `<form class="row g-3">
//         <div id="container"> 
//         <div class="col-6">
//             <label for="name" class="form-label">name</label>
//             <input type="text" class="form-control" id="name" placeholder="${name}">
//           </div>
//         <div class="col-md-6">
//           <label for="email" class="form-label">Email</label>
//           <input type="email" class="form-control" id="email" placeholder="${email}" >
//         </div>
//         <div class="col-md-6">
//           <label for="password" class="form-label">Password</label>
//           <input type="password" class="form-control" id="password" placeholder="${password}">
//         </div>
        
//         <div class="col-12">
//           <button type="submit" class="btn btn-primary" id="saveButton">save</button>
//         </div>
//     </div>`;
        
//         var save = document.getElementById("saveButton");
//         save.className = "btn btn-outline-primary mx-2 on";
        
//         save.addEventListener("click", function(event) {
//             event.preventDefault();
      
//            var name1 = document.getElementById("name").value;
//            var email1 = document.getElementById("email").value;
//            var password1 = document.getElementById("password").value;
//            name=name1;
//            email=email1;
//            password=password1;
//             input = "Name: " + name + " | Email: " + email + " | Password: " + password;
//             li.firstChild.textContent = input;
//             ul.appendChild(li);
//             // container.appendChild(ul);
//             //  container.removeChild(name1);
//             //  container.removeChild(email);
//             //  container.removeChild(password1);
//             //  container.removeChild(save);
//              container.innerHTML="";
//             // addData(event);
//             // save.addEventListener("click",addData);
            
//           });
//         // axios.post("https://crudcrud.com/api/e73b6b1b5c584dc19218de843521a17b/user",obj) 
//         // .then((response)=>{
//         //     console.log(response.data);
//         // }).catch(err=>console.log(err));
        
    
//     });
    
    
        
     
//     //to delete
//     deleteBtn.addEventListener("click",deleteData);

//  }
  

// function deleteData(c){
//     var deleteText=c.target.parentElement;
//     ul.removeChild(deleteText);
// }
var ul = document.createElement("ul");
var container = document.getElementById("container");
var button = document.getElementById("button");
var expenseData = [];

button.addEventListener("click", addData);

function addData(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  const obj = {
    name,
    email,
    password
  }
  var input = "Name: " + obj.name + " | Email: " + obj.email + " | Password: " + obj.password;
  var li = document.createElement("li");
  ul.appendChild(li);
  li.className = "list-group-item";
  var edit = document.createElement("button");
  edit.className = "btn btn-outline-primary mx-2 on";
  edit.appendChild(document.createTextNode("Edit Expense"));
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-outline-danger mx-10 on";
  deleteBtn.appendChild(document.createTextNode("Delete"));

  li.appendChild(document.createTextNode(input));
  li.appendChild(edit);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
  container.appendChild(ul);

  expenseData.push(obj);

  // Update expense
  edit.addEventListener("click", function (event) {
    event.preventDefault();
    var index = expenseData.indexOf(obj);
    if (index !== -1) {
      var updatedName = prompt("Enter updated name:", expenseData[index].name);
      var updatedEmail = prompt("Enter updated email:", expenseData[index].email);
      var updatedPassword = prompt("Enter updated password:", expenseData[index].password);
      var updatedInput = "Name: " + updatedName + " | Email: " + updatedEmail + " | Password: " + updatedPassword;

      li.firstChild.textContent = updatedInput;

      // Update the expense data
      expenseData[index] = {
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword
      };

      // Update expense on the server
      axios.put("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user" + obj._id, {
          name: updatedName,
          email: updatedEmail,
          password: updatedPassword
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  // Delete expense
  deleteBtn.addEventListener("click", function (event) {
    var index = expenseData.indexOf(obj);
    if (index !== -1) {
      // Remove expense from the server
      axios.delete("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user" + obj._id)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      expenseData.splice(index, 1);
    }
    ul.removeChild(li);
  });

  // Add expense to the server
  axios.post("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user", obj)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Fetch expense data from the server
axios.get("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user")
  .then(function (response) {
    expenseData = response.data;
    displayExpenseData();
  })
  .catch(function (error) {
    console.log(error);
  });

function displayExpenseData() {
  ul.innerHTML = "";
  expenseData.forEach(function (expense) {
    var input = "Name: " + expense.name + " | Email: " + expense.email + " | Password: " + expense.password;
    var li = document.createElement("li");
    ul.appendChild(li);
    li.className = "list-group-item";
    var edit = document.createElement("button");
    edit.className = "btn btn-outline-primary mx-2 on";
    edit.appendChild(document.createTextNode("Edit Expense"));
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger mx-10 on";
    deleteBtn.appendChild(document.createTextNode("Delete"));

    li.appendChild(document.createTextNode(input));
    li.appendChild(edit);
    li.appendChild(deleteBtn);

    // Update expense
    edit.addEventListener("click", function (event) {
      event.preventDefault();
      var index = expenseData.indexOf(expense);
      if (index !== -1) {
        var updatedName = prompt("Enter updated name:", expense.name);
        var updatedEmail = prompt("Enter updated email:", expense.email);
        var updatedPassword = prompt("Enter updated password:", expense.password);
        var updatedInput = "Name: " + updatedName + " | Email: " + updatedEmail + " | Password: " + updatedPassword;

        li.firstChild.textContent = updatedInput;

        // Update the expense data
        expenseData[index] = {
          name: updatedName,
          email: updatedEmail,
          password: updatedPassword
        };

        // Update expense on the server
        axios.put("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user" + expense._id, {
            name: updatedName,
            email: updatedEmail,
            password: updatedPassword
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });

    // Delete expense
    deleteBtn.addEventListener("click", function (event) {
      var index = expenseData.indexOf(expense);
      if (index !== -1) {
        // Remove expense from the server
        axios.delete("https://crudcrud.com/api/d29df6e377ed47608b8adb42f0f38e67/user" + expense._id)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        expenseData.splice(index, 1);
      }
      ul.removeChild(li);
    });
  });
}
