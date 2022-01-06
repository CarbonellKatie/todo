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
//add an eventlistener to the list and then check what you are clicking on
todoList.addEventListener('click', deleteCheck);

//functions

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