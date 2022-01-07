//Selectors

//select the input tag from the HTML file, always surround with single quotes
//SHFT-ALT-DOWN to make a copy of the current line
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
//when the page loads, check if there are any todo items in local storage that need to be loaded by calling getTodos
document.addEventListener('DOMContentLoaded', getTodos);
//when setting an event listener in JS, don't put any parameters or ( ) after the function name
// todoButton.addEventListener('click', addTodo, false);
todoButton.addEventListener('click', addTodo);
//add an eventlistener to the list and then check what you are clicking on
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//functions

//create a Todo and add it to the todoDiv
function addTodo(event){
    //prevent form from submitting automatically
    event.preventDefault();
    
    // Todo Div, one element of the list (li)
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // create li, text for each element
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    //add Todo to local localStorage
    saveLocalTodos(todoInput.value);
    
    //Check mark button for each element
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //Delete button for each element
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    //div now has li and mark/delete buttons, this is a todo element
    todoList.appendChild(todoDiv); 
    
    //clear input value in todo input bar
    todoInput.value = "";
}


function deleteCheck(event){
    const item = event.target;
    console.log(item);

    //If we are clicking the delete button, remove the parent element (the todo element)
    if(item.classList.contains('delete-btn')){
        const todo = item.parentElement;

        //add the falling animation when deleting elements
        todo.classList.add('fall');

        //wait until the animation is finished before deleting element 
        todo.addEventListener('transitionend', () =>
        item.parentElement.remove());
}
    //if the check button is pressed, grey out the list (change opacity) and draw line through element 
    //(or reverse effect if clicked again)
    else if(item.classList.contains('complete-btn')){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    console.log(event.target.value);
    todos.forEach(function(todo){
        if(todo.tagName == 'DIV'){

        switch(event.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "uncompleted":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                }
                else{
                    todo.style.display="flex";
                }
                break;
            case "completed":
                console.log("we got to the completed case")
                    if(!todo.classList.contains('completed')){
                        todo.style.display = "none";
                    }
                    else{
                        todo.style.display = "flex";
                    }
        }
    }
    });
}
// save To-Dos to local storage
function saveLocalTodos(todo){
    //check if we already have a todo in our local storage
    let todos;
    //if we do not already have a todos in local storage that is saving the list, make a new empty one that we will
    //add this todo to
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    //if we do have an array called todos in local storage already, parse it and add a new todo to the end
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //push a new todo to the array and reassign the array in storage to the updated version
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
    //todos will be an array of Strings containing the name of the todo (i.e: wash the car, walk the dog)
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //recreate addTodo to display Todos from local storage
    todos.forEach(function(todo){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // create li, text for each element
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    
    //Check mark button for each element
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //Delete button for each element
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    //div now has li and mark/delete buttons, this is a todo element
    todoList.appendChild(todoDiv); 

    });

    }
