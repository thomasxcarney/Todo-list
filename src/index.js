import './style.css';
import { ToDoItemArr, sortItemsByDueDate, submitNewTaskBtn } from './ToDoItemLogic';

const contentContainer = document.getElementById('content');

function PopulateList() {
    for(let i = 0; i < ToDoItemArr.length; i++){
        contentContainer.appendChild(CreateToDoItemCard(ToDoItemArr[i]));
    }
};

function CreateToDoItemCard(item){
    let container = document.createElement('div');
    container.classList.add('to-do-item');
    let title = document.createElement('h4');
    title.innerHTML = item.title;
    let dueDate = document.createElement('p');
    dueDate.innerHTML = item.dueDate;
    let priority = document.createElement('p');
    priority.innerHTML = item.priority;
    let detailsBtn = document.createElement('button');
    detailsBtn.innerHTML = 'Details';
    detailsBtn.classList.add('expand');
    let expandedContainer = document.createElement('div');
    let description = document.createElement('p');
    description.innerHTML = item.description;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove item';
    let PriorityBtn = document.createElement('button');
    PriorityBtn.innerHTML = 'Change priority';
    expandedContainer.append(description, deleteBtn, PriorityBtn);
    expandedContainer.classList.add('hidden');
    container.append(title, detailsBtn, dueDate, priority, expandedContainer);
    addExpandEventListener(detailsBtn, expandedContainer);
    addDeleteEventListener(deleteBtn, item);
    return container;
};

function addExpandEventListener(btn, container) {
    btn.addEventListener('click', () => {
        if(container.classList.contains('hidden')){
            container.classList.remove('hidden');
        } else container.classList.add('hidden');
    })
};

function removeItem(item) {
    let index = ToDoItemArr.indexOf(item);
    console.log(index)
    ToDoItemArr.splice(index, 1);
    clearItems();
    PopulateList();
};

function addDeleteEventListener(btn, item){
    btn.addEventListener('click', () => {
        removeItem(item)
    })
};

function clearItems() {
    contentContainer.innerHTML = ''
};

submitNewTaskBtn.addEventListener('click', () => {
    clearItems();
    PopulateList();
});

PopulateList();