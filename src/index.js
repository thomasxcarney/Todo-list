import './style.css';
import { ToDoItemArr, sortItemsByDueDate, submitNewTaskBtn, editBtn, addEditSubmitBtnListener } from './ToDoItemLogic';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const contentContainer = document.getElementById('content');

function PopulateList() {
    if(localStorage.getItem("ToDoItemArray") != null && compareStoredArr() == true) {
        ToDoItemArr = returnArr();
    } else {
        for(let i = 0; i < ToDoItemArr.length; i++){
            contentContainer.appendChild(CreateToDoItemCard(ToDoItemArr[i]));
        }
    };
    localStorage.clear();
    storeArr();
};

function CreateToDoItemCard(item){
    let container = document.createElement('div');
    container.classList.add(ToDoItemArr.indexOf(item));
    container.classList.add('to-do-item');
    container.classList.add(item.title.split(' '));
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('item-checkbox');
    let title = document.createElement('h4');
    title.innerHTML = item.title;
    let dueDate = document.createElement('p');
    dueDate.innerHTML = format(parseISO(item.dueDate), 'Pp');
    let priority = document.createElement('p');
    priority.innerHTML = item.priority;
    let detailsBtn = document.createElement('button');
    detailsBtn.innerHTML = 'Details';
    detailsBtn.classList.add('expand');
    let expandedContainer = document.createElement('div');
    let description = document.createElement('p');
    description.innerHTML = item.description;
    description.classList.add('description');
    let category = document.createElement('p');
    category.innerHTML = item.category;
    category.classList.add('category');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove item';
    let editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.classList.add(ToDoItemArr.indexOf(item));
    editBtn.classList.add('edit');
    deleteBtn.classList.add(ToDoItemArr.indexOf(item));
    deleteBtn.classList.add('delete');
    expandedContainer.append(description, category, deleteBtn, editBtn);
    expandedContainer.classList.add('hidden');
    container.append(checkbox, title, detailsBtn, dueDate, priority, expandedContainer);
    addPriorityClass(container, priority, item);
    addExpandEventListener(detailsBtn, expandedContainer);
    addDeleteEventListener(deleteBtn);
    editBtnEventListener(editBtn);
    addCheckBoxEventListener(container, checkbox);
    return container;
};

function addPriorityClass(container, priorityElement, item) {
    let priority = item.priority.toLowerCase();
    if(priority == 'high priority'){
        container.classList.add('high-priority');
        priorityElement.classList.add('high-priority');
    } else if (priority == 'normal priority') {
        container.classList.add('normal-priority');
        priorityElement.classList.add('normal-priority');
    } else if (priority == 'low priority') {
        container.classList.add('low-priority');
        priorityElement.classList.add('low-priority');
    };
};

function addExpandEventListener(btn, container) {
    btn.addEventListener('click', () => {
        if(container.classList.contains('hidden')){
            container.classList.remove('hidden');
            container.classList.add('visible');
        } else {
            container.classList.add('hidden');
            container.classList.remove('visible');
        }
    })
};

function removeItem(index) {
    ToDoItemArr.splice(index, 1);
    clearItems();
    PopulateList();
};

function addDeleteEventListener(btn, item){
    btn.addEventListener('click', () => {
        let index = btn.classList[0];
        removeItem(index)
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
    const categoryInput = document.getElementById('editCategoryInput');
    titleInput.value = item.title;
    descriptionInput.value = item.description;
    dueInput.value = item.dueDate;
    categoryInput.value = item.category;
    const itemPriority = (item.priority).toLowerCase();
    if(itemPriority == highPrioritySelect.value){
        highPrioritySelect.checked = true;
    } else if(itemPriority == normalPrioritySelect.value){
        normalPrioritySelect.checked = true;
    } else if(itemPriority == lowPrioritySelect.value){
        lowPrioritySelect.checked = true;
    };
}

function editBtnEventListener(btn){
    btn.addEventListener('click', () => {
        let item = ToDoItemArr[btn.classList[0]];
        fillEditDialog(item);
        editDialog.showModal();
        addEditSubmitBtnListener(item);
    })
}

const categories = document.getElementsByClassName('category');
const homeBtn = document.getElementById('homeBtn');

homeBtn.addEventListener('click', event => {
    clearItems();
    PopulateList();
})

function addCategoryEventListeners(){
    for(let i = 0; i < categories.length; i++){
        categories[i].addEventListener('click', event => {
            let category = categories[i].classList[0];
            clearItems();
            populateCategoryView(category);
        })
    }
};

function populateCategoryView(category){
    for(let i = 0; i < ToDoItemArr.length; i++){
        if(ToDoItemArr[i].category.toLowerCase() == category){
            contentContainer.appendChild(CreateToDoItemCard(ToDoItemArr[i]));
        };
    };
};

const editDialogCategories = document.getElementById('editCategory');
const newDialogCategories = document.getElementById('category');
const sidebar = document.getElementById('sidebar');

function newCategoryHTML(newCategory){
    editDialogCategories.innerHTML += newCategory;
    newDialogCategories.innerHTML += newCategory;
    let newSidebarElement = document.createElement('h4');
    newSidebarElement.innerHTML = newCategory;
    newSidebarElement.classList.add(newCategory);
    newSidebarElement.classList.add('category');
    sidebar.appendChild(newSidebarElement);
};

let categoryArray = ToDoItemArr.map(a => a.category);

function createNewCategory(newCategory){
    if(!categoryArray.includes(newCategory.toLowerCase())){
        newCategoryHTML(newCategory);
        addCategoryEventListeners();
    };
};

function addCheckBoxEventListener(container, checkbox) {
    checkbox.addEventListener('change', () => {
        if(checkbox.checked){
            container.classList.add('completed')
        } else container.classList.remove('completed')
    })
};

function convertItemToJson(item) {
    return JSON.stringify(item);
};

function storeArr(){
    localStorage.clear();
    localStorage.setItem("ToDoItemArray", convertItemToJson(ToDoItemArr));
}

function returnArr(){
    let returnedArr = localStorage.getItem("ToDoItemArray");
    return JSON.parse(returnedArr);
}

function compareStoredArr() {
    if(ToDoItemArr === returnArr()){
        return true;
    } else false;
};

addCategoryEventListeners();
PopulateList();

export { clearItems, PopulateList, createNewCategory }