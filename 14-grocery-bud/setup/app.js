// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
// load items in localStorage
window.addEventListener('DOMContentLoaded', setupItems);

// input field
grocery.addEventListener("input", enableSubmit);
function enableSubmit() {
    submitBtn.removeAttribute('disabled');
}

// submit form
form.addEventListener('submit', addItem);

// clear all items
clearBtn.addEventListener('click', clearAllItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    // Create a unique id using timestamp
    const id = new Date().getTime().toString();

    if (value && !editFlag) {     
        createListItem(id, value);        
        displayAlert('item successfully added', 'success'); // display alert
        container.classList.add('show-container'); // show list
        addToLocalStorage(id, value); // add item to local storage
        resetForm(); // reset form
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Item updated!", "success");
        // edit local storage
        editLocalStorage(editID, value);
        resetForm();
    } else {
        displayAlert("please enter value", "danger");
    }
}

// displayAlert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    // remove alert after a couple of seconds
    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

// resetForm 
function resetForm() {
    grocery.value = '';
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit"
    submitBtn.setAttribute('disabled', '');
}

// clearAllItems
function clearAllItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert("Successfully removed all items", "success");
    resetForm();
    localStorage.removeItem('list');
}

// deleteItem
function deleteItem(e) {    
    const deleteButtonElement = e.currentTarget.parentElement.parentElement;
    const id = deleteButtonElement.dataset.id;
    const itemName = deleteButtonElement.childNodes[1].innerText;
    list.removeChild(deleteButtonElement);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert(`Successfully removed ${itemName} from the list!`, "success");
    resetForm();
    // remove from local storage
    removeFromLocalStorage(id);
}

// editItem
function editItem(e) {
    const editButtonElement = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = editButtonElement.dataset.id;
    submitBtn.textContent = "edit";
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
    const grocery = {id, value};
    let items = getLocalStorage()
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item){
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value)
        })
        container.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add ID
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    `;
    
    // once the above code is available, grab the edit and delete buttons
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    // listen for a click on edit and delete buttons, and call respective funcs
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    
    // append child
    list.appendChild(element);
}