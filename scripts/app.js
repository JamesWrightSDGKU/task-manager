function saveTask(){
    console.log("Saving task...");
    
    // get values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title, description, color, date, status, budget);
    console.log(description);

    // build an object
    let taskToSave = new Task(title, description, color, date, status, budget);
    console.log(taskToSave);

    // save to the server

    // display the task
    displayTask(taskToSave);
}

function displayTask(task){
    const event = new Date(task.startDate);
    const formattedDate = event.toDateString();
    let syntax = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">${task.title}</h3>
                <h4 class="card-subtitle mb-2 text-body-secondary">${task.status}</h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">${formattedDate}</h5>
                <h5 class="card-subtitle mb-2 text-body-secondary">$${task.budget}</h5>
                <p class="card-text">${task.desc}</p>
            </div>
        </div>
    `;
    document.getElementById("list").style.backgroundColor = task.color;
    $(".pendingTask").append(syntax);
}

function init(){
    console.log("I'm the init function");

    // load data

    // hook events
    $("#btnSave").click(saveTask);
}
// new code change

window.onload=init;