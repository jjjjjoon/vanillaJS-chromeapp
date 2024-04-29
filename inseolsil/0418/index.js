/*
* Name: ChatGPT
* Date: April 29, 2024
* Section: AI 6068
*
* This JavaScript file adds interactivity to the webpage by allowing users to add
* and remove tasks from a to-do list.
*/

/**
 * Adds a new task to the to-do list.
 * @param {Event} event - The click event object.
 * @returns {void}
 */
function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
        taskList.appendChild(newTask);
        taskInput.value = '';
        // Add event listener to the new task to remove it when clicked
        newTask.addEventListener('click', removeTask);
    }
}

/**
 * Removes a task from the to-do list.
 * @param {Event} event - The click event object.
 * @returns {void}
 */
function removeTask(event) {
    event.target.remove();
}

// Add event listener to the button to add tasks
const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', addTask);
