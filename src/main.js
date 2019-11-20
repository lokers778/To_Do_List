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
        let task= document.querySelector(" div.task_list.fullWidth > div:nth-child(1) ul > li:nth-last-child(1)")
        let editbtn= task.querySelector("button.edit")
        console.log(task)
        console.log(editbtn)
        if(editbtn!==null){
            editbtn.addEventListener("click", function (e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                ThisTaskListFormInput.newTaskList.firstElementChild.innerText = task.firstElementChild.innerText;
                addTask(e, task)
                ThisTaskListFormInput.newTaskList.style.display = "flex";
            })
            console.log(task)
            console.log(editbtn)
        }
    });

    document.querySelector(".showBtn").addEventListener("click", () => {
        newTaskListFormInputs.form.parentElement.classList.toggle("hiddenList");
        const taskList = document.querySelector("div.task_list")
        taskList.classList.toggle("fullWidth")
    });

    function addTask(e) {
        let taskList=e.target.parentElement;
        let taskElementsList = taskList.querySelectorAll("ul li");
        const {newTaskList, listTask, taskAddBtn, taskListName, saveBtn} = ThisTaskListFormInput;
        arg=e.target.querySelectorAll("li");
        let currentTasksFromList = Array.from(taskElementsList);
        if(currentTasksFromList.length>0){
        currentTasksFromList.forEach((el)=>{
            listTask.appendChild(el)
            console.log(listTask)
        })
    }


        let newTaskToList = () => {
            const task = document.createElement("li");
            task.innerHTML = `${taskListName.value}  <button class="removeTask">X</button>`;
            taskListName.value = "";
            listTask.appendChild(task);

        }
        let saveTaskList = (e) => {
            taskListName.value = "";
            newTaskList.style.display = "none";
           let ulList= taskList.querySelector("ul");
           let tasksFromList= listTask.querySelectorAll("li")
           tasksFromList.forEach((task)=>{
            ulList.appendChild(task)
           })
           taskAddBtn.removeEventListener("click", saveTaskList)
           taskAddBtn.removeEventListener("click", newTaskToList)
           return
        }
        taskAddBtn.addEventListener("click", newTaskToList);
        saveBtn.addEventListener("click", saveTaskList,{once:true});
        return
    }

});