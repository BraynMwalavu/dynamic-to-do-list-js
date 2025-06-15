document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  // Add task when button is clicked
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      saveTask(taskText);
      taskInput.value = '';
    } else {
      alert('Please enter a task.');
    }
  });

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
      } else {
        alert('Please enter a task.');
      }
    }
  });

  // Add task to the DOM
  function addTask(taskText, save = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // ✅ Important: Use classList.add

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTask(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      saveTask(taskText);
    }
  }

  // Save task to localStorage
  function saveTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Remove task from localStorage
  function removeTask(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText));
  }
});
