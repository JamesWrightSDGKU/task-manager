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
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/", // server name
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })

    // display the task
    displayTask(taskToSave);
}

function loadTask(){
    
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            for(let i=0; i<data.length; i++){
                let task = data[i];
                if(task.name == "James")
                {
                    displayTask(task);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    })
}

function displayTask(task){
    const event = new Date(task.startDate);
    const formattedDate = event.toDateString();
    let syntax = `
        <div class="card" style="width: 18rem; border-color:${task.color}; border-width: 4px;">
            <div class="card-body" style="background-color:mintcream">
                <h3 class="card-title">${task.title}</h3>
                <h4 class="card-subtitle mb-2 text-body-secondary">${task.status}</h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">${formattedDate}</h5>
                <h5 class="card-subtitle mb-2 text-body-secondary">$${task.budget}</h5>
                <p class="card-text">${task.desc}</p>
            </div>
        </div>
    `;
    //document.getElementById("list").style.backgroundColor = task.color;
    $(".pendingTask").append(syntax);
}

function deleteTasks(task){
    $.ajax({
        type: "DELETE",
        url: "http://fsdiapi.azurewebsites.net",
        success: function (response)
    })
}

function testRequests(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net",
        success: function (response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    });
}

function init(){
    console.log("I'm the init function");

    // load data
    loadTask();
    // hook events
    $("#btnSave").click(saveTask);
    $("#btnDelete").click(deleteTasks);
}
// new code change

window.onload=init;