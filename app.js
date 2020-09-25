//define UI vars

const form = document.querySelector('#task-form')
const taskList = document.querySelector('#collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


//load all event listeners
loadEventListeners()

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)

    //add task
    form.addEventListener('submit', addTask)

    //remove task
    taskList.addEventListener('click', removeTask)

    //clear all tasks
    clearBtn.addEventListener('click', clearTasks)

    //filter tasks
    filter.addEventListener('keyup', filterTasks)
}
//crear lista de tasks
function createList() {
    //crear lista de tasks
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))
    //crear link
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.setAttribute('href', '#')
    //crear icono x
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link)

    taskList.appendChild(li)
    taskList.classList.add('collection')


}
//add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task')
    } else {
        createList()
        //store tasks in local storage
        storeTaskInLocalStorage(taskInput.value)
        //clear input una vez enviada la form
        taskInput.value = ''
    }
    e.preventDefault()
}
function getTasks() {
    let tasksArray
    if (localStorage.getItem('tasks') === null) {
        tasksArray = []
    } else {
        tasksArray = JSON.parse(localStorage.getItem('tasks'))
    }
    tasksArray.forEach((task) => {
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))
        //crear link
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.setAttribute('href', '#')
        //crear icono x
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)

        taskList.appendChild(li)
        taskList.classList.add('collection')
    })
}

function storeTaskInLocalStorage(task) {
    let tasksArray
    if (localStorage.getItem('tasks') === null) {
        tasksArray = []
    } else {
        tasksArray = JSON.parse(localStorage.getItem('tasks'))
    }
    tasksArray.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are ya sure?')) {
            e.target.parentElement.parentElement.remove()

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        if (taskList.childNodes.length <= 0) {
            taskList.classList.remove('collection')
        }

    }
}
function removeTaskFromLocalStorage(taskItem) {
    let tasksArray
    if (localStorage.getItem('tasks') === null) {
        tasksArray = []
    } else {
        tasksArray = JSON.parse(localStorage.getItem('tasks'))
    }
    tasksArray.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasksArray.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

function clearTasks() {
    //taskList.innerHTML = ''

    //faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        taskList.classList.remove('collection')

    }
    clearTasksFromLs()
}
function clearTasksFromLs() {
    localStorage.clear()
}

function filterTasks(e) {

    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })


}
