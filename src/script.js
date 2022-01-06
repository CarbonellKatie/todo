//Selectors

//select the input tag from the HTML file, always surround with single quotes
//SHFT-ALT-DOWN to make a copy of the current line
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeners

//when setting an event listener in JS, don't put any parameters or ( ) after the function name
// todoButton.addEventListener('click', addTodo, false);
todoButton.addEventListener('click', addTodo);

//functions

function addTodo(event){
    //prevent form from submitting automatically
    event.preventDefault();
    
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerHTML = 'Add Item'
    todoDiv.appendChild(newTodo);
    
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //Delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    //div now has li and mark/delete buttons, this is a todo element

    todoList.appendChild(todoDiv);  
}