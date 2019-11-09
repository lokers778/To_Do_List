class Task {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.tasks = [];
    }

    newTaskFunction() {
        const newTask = document.createElement("li");
        const newTitle = document.createElement("h3");
        const newDescription = document.createElement("p");
        const removeTask = document.createElement("button");
        newTitle.innerText = this.name;
        newDescription.innerText = this.description;
        newTask.appendChild(newTitle);
        newTask.appendChild(newDescription);
        newTask.appendChild(removeTask);
        removeTask.innerText = "Remove List"
        newTask.classList.add("task")
        removeTask.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement)
        });
        return newTask;
    }
}

const formInputs = {
    form: document.querySelector("form"),
    newTaskButton: document.querySelector("button[type='submit']"),
    title: document.querySelector("input[type='text']"),
    importantRange: document.querySelector("select"),
    description: document.querySelector("textarea"),
};


formInputs.newTaskButton.addEventListener("click", (e) => {
    e.preventDefault()
    const {title, importantRange, description, form} = formInputs;
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
    form.parentElement.classList.add("hiddenList");
    const taskList = document.querySelector("div.task_list")
    taskList.classList.add("fullWidth")
});

document.querySelector(".showBtn").addEventListener("click", () => {
    formInputs.form.parentElement.classList.toggle("hiddenList");
    console.log(formInputs.form)
    const taskList = document.querySelector("div.task_list")
    taskList.classList.toggle("fullWidth")
})


document.querySelectorAll("li").forEach((task) => {
    task.addEventListener("click", function (e) {
        console.log(this)
    })
})
