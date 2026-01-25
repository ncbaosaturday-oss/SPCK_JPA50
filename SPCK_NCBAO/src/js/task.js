let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const category = document.getElementById("taskCategory").value;

    if (taskName === "" || category === "") {
        alert("Vui lòng nhập nhiệm vụ và chọn danh mục");
        return;
    }

    tasks.push({
        name: taskName,
        category: category,
        completed: false
    });

    document.getElementById("taskName").value = "";
    document.getElementById("taskCategory").value = "";

    renderTasks();
}


function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input 
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})"
            >
            <span>
                <strong>[${task.category}]</strong> ${task.name}
            </span>
            <div class="actions">
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}




function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}


async function showSuccessScreen(task) {
    
    const quote = await getStudyQuote(task.category);

    document.getElementById("successMessage").innerText =
        `Bạn đã hoàn thành nhiệm vụ: "${task.name}" --- [${quote}]`;
    document.getElementById("successScreen").style.display = "flex";
}

function closeSuccessScreen() {
    document.getElementById("successScreen").style.display = "none";
}

function toggleTask(index) {
    showSuccessScreen(tasks[index]);
    renderTasks();
}

const quoteRules = {
    study: ["learn", "knowledge", "study", "education", "practice"]
};

async function getStudyQuote(keyword) {
    const res = await fetch("https://api.quotable.io/random?tags=education");
    const data = await res.json();

    const quoteText = data[0].q.toLowerCase();

        if (quoteText.includes(keyword)) {
            return data[0].q;
        }
}



