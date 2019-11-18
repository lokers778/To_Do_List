document.addEventListener("DOMContentLoaded", function () {

    const newTaskListFormInputs = {
        form: document.querySelector(".new_task form"),
        newTaskButton: document.querySelector(".new_task button[type='submit']"),
        title: document.querySelector(".new_task input[type='text']"),
        importantRange: document.querySelector(".new_task select"),
        description: document.querySelector(".new_task textarea"),
    };
    const ThisTaskListFormInput = {
        newTaskList: document.querySelector(".task_list_to_do"),
        taskListName: document.querySelector(".task_list_to_do input[type='text']"),
        taskAddBtn: document.querySelector(".task_list_to_do input[type='submit']"),
        listTask: document.querySelector(".task_list_to_do ul"),
        saveBtn: document.querySelector(".task_list_to_do .save"),
        closeBtn: document.querySelector(".task_list_to_do .close"),
        lastKnowTasks: [],
    };


    class Task {
        constructor(name, description) {
            this.name = name;
            this.description = description;
        }

        newTaskFunction() {
            const newTask = document.createElement("li");
            const newTitle = document.createElement("h3");
            const newDescription = document.createElement("p");
            const removeTask = document.createElement("button");
            const editTask = document.createElement("button");
            const taskList = document.createElement("ul");
            newTitle.innerText = this.name;
            newDescription.innerText = this.description;
            newTask.appendChild(newTitle);
            newTask.appendChild(newDescription);
            newTask.appendChild(removeTask);
            newTask.appendChild(editTask);
            newTask.appendChild(taskList);
            taskList.style.display = "none";
            removeTask.innerText = "Remove List";
            removeTask.classList.add("remove");
            editTask.innerText = "Edit Task";
            editTask.classList.add("edit");
            newTask.classList.add("task");
            removeTask.addEventListener("click", (e) => {
                e.target.parentElement.parentElement.removeChild(e.target.parentElement)
            });
            return newTask;
        }
    }

    newTaskListFormInputs.newTaskButton.addEventListener("click", (e) => {
        const {title, importantRange, description, form} = newTaskListFormInputs;
        if (title.value.length <= 3 || description.value <= 3) {
            alert("Title must contains more than 3 letters");
            return;
        }
        e.preventDefault();
        const Pop = new Task(title.value, description.value);
        switch (importantRange.value) {
            case "1": {
                const list = document.querySelector(" .important");
                const newListElement = Pop.newTaskFunction();
                list.appendChild(newListElement);
                break;
            }

            case "2": {
                const list = document.querySelector(" .normal");
                const newListElement = Pop.newTaskFunction();
                newListElement.classList.add("normalTask")
                list.appendChild(newListElement);
                break;
            }
            case "3": {
                const list = document.querySelector(".less");
                const newListElement = Pop.newTaskFunction();
                newListElement.classList.add("lessTask")
                list.appendChild(newListElement);
                break;
            }

        }
        title.value = "";
        description.value = "";
        form.parentElement.classList.add("hiddenList");
        const taskList = document.querySelector("div.task_list");
        taskList.classList.add("fullWidth");
        document.querySelectorAll(" div.task_list.fullWidth > div:nth-child(1) li").forEach((task, index) => {

            task.children[3].addEventListener("click", function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                const taskElementsList = task.querySelectorAll("li");
                ThisTaskListFormInput.newTaskList.firstElementChild.innerText = task.firstElementChild.innerText;
                addTask(taskElementsList, task)
                ThisTaskListFormInput.newTaskList.style.display = "flex";
            })
        })
    });

    document.querySelector(".showBtn").addEventListener("click", () => {
        newTaskListFormInputs.form.parentElement.classList.toggle("hiddenList");
        const taskList = document.querySelector("div.task_list")
        taskList.classList.toggle("fullWidth")
    });

    function addTask(arg = [], taskElements) {
        console.log(arg);
        const {newTaskList, listTask, taskAddBtn, lastKnowTasks, taskListName, saveBtn, closeBtn} = ThisTaskListFormInput;
        let currentTasksFromList = Array.from(arg);
        let fullList = currentTasksFromList.map((task) => {
            return `<li>${task.innerText}<button class="removeTask">X</button></li>`
        }).reduce((prev, next) => {
            return prev + next
        }, []);
        if (typeof fullList === "string") {
            listTask.innerHTML = fullList;
        };
        let newTaskToList = () => {
            const task = document.createElement("li");
            task.innerHTML = `${taskListName.value}  <button class="removeTask">X</button>`;
            taskListName.value = "";
            listTask.appendChild(task);

        }
        let saveTaskList = (e) => {
            newTaskList.style.display = "none";
            console.log(taskElements.children)
            taskElements.children[4].innerHTML = listTask.innerHTML;
            listTask.innerHTML = "";
            taskAddBtn.removeEventListener("click", saveTaskList)
            taskAddBtn.removeEventListener("click", newTaskToList)
        }
        let closeTask = (e) => {
            taskListName.value = "";
            listTask.innerHTML = "";
            newTaskList.style.display = "none";
            taskAddBtn.removeEventListener("click", closeTask)
            taskAddBtn.removeEventListener("click", newTaskToList)
        }
        taskAddBtn.addEventListener("click", newTaskToList);
        saveBtn.addEventListener("click", saveTaskList);
        closeBtn.addEventListener("click", closeTask)
    }

});