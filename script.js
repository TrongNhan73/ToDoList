const handleAddTask = (curr) => {
    let pre = curr.parentElement.children[0];
    pre.insertAdjacentHTML('beforeend', `
        <div class="task">
            <input type="checkbox" name="" id="" onchange="handleSaveButton()" />
            <textarea type="text" rows="1" class="content-task" placeholder="Enter job here..." onblur="handleSaveButton()"
                oninput="handleMutilLine(this)"></textarea>
           <button type="button" onclick="handleDeleteButton(this)" class="deletebtn" title="Delete">X</button>
        </div>
    `);
}



const handleMutilLine = (cur) => {
    cur.style.height = 'auto';

    cur.style.height = cur.scrollHeight + 'px';
}

const handleSaveButton = () => {
    let textTask = [];
    let tasks = document.getElementsByClassName("task");
    for (let i = 0; i < tasks.length; i++) {
        textTask.push({
            state: tasks[i].children[0].checked,
            value: tasks[i].children[1].value
        });
    }
    let title = document.getElementsByTagName('h1')[0].innerHTML;
    let dataSave = { [title]: textTask };
    localStorage.setItem("tasks", JSON.stringify(dataSave));
}

const handleDeleteButton = (curr) => {
    document.getElementsByClassName("tasks")[0].removeChild(curr.parentElement);
    handleSaveButton();
}

const handleCompleteButton = () => {
    let checkboxs = document.querySelectorAll('input[type="checkbox"]');
    let oldDay = JSON.parse(localStorage.getItem("time"));
    let today = new Date();
    let dayStreak = parseInt(document.getElementsByClassName("num")[0].innerHTML);

    if (checkboxs.length > 0) {
        if (Array.from(checkboxs).every(element => element.checked)) {
            if (oldDay) {
                if (oldDay != today.getDate()) {
                    localStorage.setItem("time", today.getDate());
                    localStorage.setItem("streak", dayStreak + 1);
                    document.getElementsByClassName("num").innerHTML = dayStreak + 1;
                    alert('Complete successfull');
                }
                else {
                    alert('You are completed');
                }
            }
            else {
                localStorage.setItem("time", today.getDate());
                localStorage.setItem("streak", dayStreak + 1);
                document.getElementsByClassName("num").innerHTML = dayStreak + 1;
                alert('Complete successfull');
            }
        }
        else {
            alert('You need complete all task');
        }
    }
    {
        alert('You must have at least once task')
    }

}



window.addEventListener('load', () => {
    let data = JSON.parse(localStorage.getItem('tasks'));
    let divmain = document.getElementsByClassName("tasks")[0];
    divmain.innerHTML = '';
    let streak = parseInt(JSON.parse(localStorage.getItem("streak")));
    document.getElementsByClassName("num")[0].innerHTML = streak ? streak : 0;

    for (const prop in data) {
        document.getElementsByTagName('h1')[0].innerHTML = prop;
        for (const ele of data[prop]) {
            let text = ele.state ? "checked" : "";
            divmain.innerHTML += `
            <div class="task">
            <input type="checkbox" onchange="handleSaveButton()" name="" id=""`+ text + ` />
            <textarea type="text" rows="1" class="content-task" placeholder="Enter job here..."  onblur="handleSaveButton()"
                oninput="handleMutilLine(this)">`+ ele.value + `</textarea>
                <button onclick="handleDeleteButton(this)" class="deletebtn" title="Delete">X</button>
        </div>
            `;
        }
    }

    Array.from(document.getElementsByClassName("content-task")).forEach((task) => {
        handleMutilLine(task)
    });


})