const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('[data-filter]');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
        ${task.name}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    updateLocalStorage();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

filterButtons.forEach(button =>
  button.addEventListener('click', () => renderTasks(button.getAttribute('data-filter')))
);

addTaskBtn.addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', renderTasks);
