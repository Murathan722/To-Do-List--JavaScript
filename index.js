const taskInput = document.getElementById("task");
const taskList = document.getElementById("list");

// Sayfa yüklendiğinde localStorage'daki görevleri yükle
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    addTaskToDOM(taskText);
  });
}

// Görevi hem DOM'a ekle hem de localStorage'a kaydet
function newElement() {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    $("#errorToast").toast("show");
    return;
  }

  addTaskToDOM(taskValue);
  saveTaskToLocalStorage(taskValue);
  $("#successToast").toast("show");
  taskInput.value = "";
}

// DOM'a yeni bir görev ekle
function addTaskToDOM(taskText) {
  let newTask = document.createElement("li");
  newTask.textContent = taskText;

  // Kapatma butonu ekle
  let closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.textContent = "×";
  closeButton.onclick = function () {
    removeTask(newTask, taskText);
  };

  newTask.appendChild(closeButton);
  taskList.appendChild(newTask);
}

// Görevi localStorage'a kaydet
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görevi localStorage'dan sil
function removeTask(taskElement, taskText) {
  taskElement.remove();

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Sayfa yüklendiğinde görevleri yükle ve tamamlanmış görevlere tıklama özelliğini ekle
loadTasks();

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
});

function addCloseButtonsToExistingTasks() {
  const tasks = document.querySelectorAll("#list li");
  tasks.forEach((task) => {
    let closeButton = document.createElement("span");
    closeButton.className = "close";
    closeButton.textContent = "×";
    closeButton.onclick = function () {
      task.remove();
    };
    task.appendChild(closeButton);
  });
}

addCloseButtonsToExistingTasks();
