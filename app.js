const intro = document.querySelector('p.lead');
const form = document.querySelector('form');
const clearBtn = document.querySelector('.clear-item');
const taskList = document.querySelector('.list-group');
const taskInput = document.querySelector('#userInput');
const filter = document.querySelector('#filter');
let userName = prompt('What is your name?');
let msg = '';

msg += `Welcome to the Task List App <strong>${userName}</strong>! Below you will find an empty task list, lets get productive and start completeing tasks!`;

intro.innerHTML = msg;

loadEventListener();

function loadEventListener(){
//DOM Load Event
document.addEventListener('DOMContentLoaded', getTask);
//Add Task Event
form.addEventListener('submit', addTask);

//Clear Items Event
clearBtn.addEventListener('click', clearTasks);

//Delete Button Li Event
taskList.addEventListener('dblclick', removeTask);

//Filter Event
filter.addEventListener('keyup', filterTasks);

}

function getTask() {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
     //Create Li Elment
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
  })
}

  // Add Task Function
function addTask(e) {
  //Create Li Elment
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(taskInput.value));
  taskList.appendChild(li);
  // Store in LS
  storeItemToLocalStorage(taskInput.value);

  taskInput.value = '';
 
  e.preventDefault();
}

// Store Item to LS function
function storeItemToLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete Button Li Function
function removeTask(e){
  if(e.target.classList.contains('list-group-item')){
    e.target.remove();
  }

  //Delete From LS
  removeItemFromLocalStorage(e.target);
}

function removeItemFromLocalStorage(taskItem) {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks(){
  taskList.innerHTML = '';

  //Clear Tasks from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks Function
function filterTasks(){
  const filterInput = filter.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    
    if(item.toLowerCase().includes(filterInput)){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  
}



