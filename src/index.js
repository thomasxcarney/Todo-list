import './style.css';
import { ToDoItemArr, sortItemsByDueDate, submitNewTaskBtn, editBtn, addEditSubmitBtnListener } from './ToDoItemLogic';

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
    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    expandedContainer.append(description, deleteBtn, editBtn);
    expandedContainer.classList.add('hidden');
    container.append(title, detailsBtn, dueDate, priority, expandedContainer);
    addExpandEventListener(detailsBtn, expandedContainer);
    addDeleteEventListener(deleteBtn, item);
    editBtnEventListener(editBtn, item);
    addEditSubmitBtnListener(item);
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

const editDialog = document.getElementById('editDialog');

function fillEditDialog(item){
    const titleInput = document.getElementById('editTitleInput');
    const descriptionInput = document.getElementById('editDesInput');
    const dueInput = document.getElementById('editDueInput');
    const lowPrioritySelect = document.getElementById('editLow');
    const normalPrioritySelect = document.getElementById('editNormal');
    const highPrioritySelect = document.getElementById('editHigh');
    titleInput.value = item.title;
    descriptionInput.value = item.description;
    dueInput.value = item.dueDate;
    const itemPriority = (item.priority).toLowerCase();
    if(itemPriority == highPrioritySelect.value){
        highPrioritySelect.checked = true;
    } else if(itemPriority == normalPrioritySelect.value){
        normalPrioritySelect.checked = true;
    } else if(itemPriority == lowPrioritySelect.value){
        lowPrioritySelect.checked = true;
    };
}

function editBtnEventListener(btn, item){
    btn.addEventListener('click', () => {
        fillEditDialog(item);
        editDialog.showModal();
    })
}

PopulateList();

export { clearItems, PopulateList }