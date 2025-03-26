const Abtn = document.getElementById("Add");
const taskinput = document.getElementById("task");
const list = document.getElementById("listC");

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTodos);

// Function to add a task
function addTask(text = "", completed = false) {
    const Taski = text || taskinput.value.trim();
    if (Taski === "") return;

    const div = document.createElement("div");
    div.classList.add("taskC");

    const span = document.createElement("span");
    span.textContent = Taski;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "myCheckbox";
    checkbox.checked = completed; // Restore checkbox state
if (completed) {
    div.classList.add("completed");
}
    const edit = document.createElement("button");
    edit.classList.add("edit-btn");
    edit.innerHTML = "E";

    div.appendChild(span);
    const setting = document.createElement("div");
    setting.classList.add("setting");
    setting.appendChild(checkbox);
    setting.appendChild(edit);
    div.appendChild(setting);
    list.appendChild(div);

    taskinput.value = "";

    // Mark task as completed
    checkbox.addEventListener("change", () => {
        div.classList.toggle("completed", checkbox.checked);
        saveTodos();
    });

    // Edit tasks
    edit.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        input.classList.add("edit-input");

        span.replaceWith(input);
        edit.textContent = "S"; // Change button text
        input.focus();

        function saveEdit() {
            span.textContent = input.value.trim() || span.textContent;
            input.replaceWith(span);
            edit.textContent = "E";
            saveTodos();
        }

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") saveEdit();
        });

        edit.addEventListener("click", saveEdit, { once: true });
    });

    saveTodos(); // Save after adding a task
}

// Save tasks to localStorage
function saveTodos() {
    const tasks = Array.from(document.querySelectorAll(".taskC")).map(task => ({
        text: task.querySelector("span").textContent,
        completed: task.querySelector("input[type='checkbox']").checked
    }));
    localStorage.setItem("todos", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTodos() {
    const tasks = JSON.parse(localStorage.getItem("todos")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Delete all tasks confirmation

document.getElementById("dlbtn").addEventListener("click", function () {
   if (document.querySelector(".del-confirmation")) {
    return;
   }
    const cdel = document.createElement("div");
    cdel.classList.add("del-confirmation")
    const ask = document.createElement("h1"); 
    ask.textContent = "Remove All Tasks?";
    const btnc = document.createElement("div");
    btnc.classList.add("btnc")
    const yes = document.createElement("button");
    yes.textContent = "Yes";
    const no = document.createElement("button");
    no.textContent = "No";
    btnc.append(yes,no);
    cdel.append(ask, btnc); 
document.body.appendChild(cdel)
yes.addEventListener("click", function () {
    document.getElementById("listC").innerHTML = ""; 
    localStorage.removeItem("todos"); 
    cdel.remove(); 
});

// Event listener for No button (close confirmation box)
no.addEventListener("click", function () {
    cdel.remove(); 
});
});

// Remove completed tasks
document.getElementById("rbtn").addEventListener("click", function () {
    document.querySelectorAll(".taskC").forEach(task => {
        if (task.querySelector("input[type='checkbox']").checked) {
            task.remove();
        }
    });
    saveTodos();
});

// Add task when button is clicked
Abtn.addEventListener("click", () => addTask());

// Add task when Enter key is pressed
taskinput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});
