document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
  
    addTaskButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="task-text" contenteditable="true">${taskText}</span>
          <button class="delete-button">Delete</button>
        `;
  
        taskList.appendChild(taskItem);
        taskInput.value = "";
  
        // Save tasks to Chrome storage
        chrome.storage.sync.get(["tasks"], function (result) {
          const tasks = result.tasks || [];
          tasks.push(taskText);
          chrome.storage.sync.set({ tasks });
        });
      }
    });
  
    taskList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        const taskItem = event.target.parentElement;
        const taskText = taskItem.querySelector(".task-text").textContent;
  
        // Remove task from the list
        taskList.removeChild(taskItem);
  
        // Remove task from Chrome storage
        chrome.storage.sync.get(["tasks"], function (result) {
          const tasks = result.tasks || [];
          const updatedTasks = tasks.filter((task) => task !== taskText);
          chrome.storage.sync.set({ tasks: updatedTasks });
        });
      }
    });
  
    // Load tasks from Chrome storage
    chrome.storage.sync.get(["tasks"], function (result) {
      const tasks = result.tasks || [];
      tasks.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span class="task-text" contenteditable="true">${taskText}</span>
          <button class="delete-button">Delete</button>
        `;
  
        taskList.appendChild(taskItem);
      });
    });
  });
  