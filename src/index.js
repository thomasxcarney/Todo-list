import './style.css';
import { ToDoItemArr, submitNewTaskBtn } from './ToDoItemLogic';

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
    let description = document.createElement('p');
    description.innerHTML = item.description;
    let dueDate = document.createElement('p');
    dueDate.innerHTML = item.dueDate;
    let priority = document.createElement('p');
    priority.innerHTML = item.priority;
    container.append(title, description, dueDate, priority);
    return container;
};

function clearItems() {
    contentContainer.innerHTML = ''
};

submitNewTaskBtn.addEventListener('click', () => {
    clearItems();
    PopulateList();
});

PopulateList();