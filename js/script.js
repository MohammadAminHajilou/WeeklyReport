function changeTheme() {
    const button = document.getElementById('themeButton');
    const style = document.getElementById('themeStyle');
    const lang = document.getElementById('language');
    const gradient = document.querySelector('.headerGradient');
    const body = document.body;

    body.style.animation = 'fadeOut 0.1s forwards';

    setTimeout(() => {
        button.src = button.src.includes('dark.svg') ? 'images/icons/light.svg' : 'images/icons/dark.svg';
        lang.src = lang.src.includes('dark.svg') ? 'images/icons/langlight.svg' : 'images/icons/langdark.svg';
        style.href = style.href.includes('dark.css') ? 'css/light.css' : 'css/dark.css';
        setTimeout ( () => {
        body.style.animation = 'fadeIn 0.1s forwards';
        gradient.style.animation = 'fadeGradient 1s forwards';
        }
        , 100);
        gradient.style.animation = 'none';

    }, 100);
}



function selectCourse(course) {
    const translations = {
    selectStepText: "Select your step :",
    stepText: "Step"
};

    const stepSelect = document.getElementById("step");

    const courseSteps = {
        web: 10,
        csharp: 11,
        ml: 12
    };

    stepSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = translations.selectStepText;
    stepSelect.appendChild(defaultOption);

    for (let i = 1; i <= courseSteps[course]; i++) {
        const option = document.createElement("option");
        option.value = `${course}${i}`;
        option.textContent = `${translations.stepText} ${i}`;
        stepSelect.appendChild(option);
    }
}


function changeLanguage() {
    const fa = document.getElementById("fa");
    const en = document.getElementById("en");

    en.classList.toggle("selectedLang");
    fa.classList.toggle("selectedLang");
}






const notesContainer = document.getElementById("notesContainer");
const noteAdd = document.getElementById("noteAdd");
const noteInput = document.getElementById("noteInput");
const noteWrite = document.querySelector(".noteWrite");


let notes = {};
let nextId = 0; 


function addNote() {
    const value = noteInput.value.trim();
    if (!value) return;

    const id = nextId++;
    notes[id] = value;
    
    const currentBorder = getComputedStyle(noteWrite).borderBottom;

    noteWrite.style.borderBottom = "4px solid var(--first-color)";

    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.id = `note${id}`;
    noteDiv.innerHTML = `
        <textarea class="noteText" readonly id="noteText${id}">- ${value}</textarea>
        <div class="noteEdit" onclick="noteEdit(${id})">✏️</div>
        <div class="noteSubmit" onclick="noteSubmit(${id})" style="display:none;">☑️</div>
        <div class="noteRemove" onclick="noteRemove(${id})">❌</div>
    `;

    notesContainer.appendChild(noteDiv);
    noteInput.value = "";
}

function noteEdit(id){
    const text = document.getElementById(`noteText${id}`);
    const submit = document.querySelector(`#note${id} .noteSubmit`);
    const edit = document.querySelector(`#note${id} .noteEdit`);

    edit.style.display = "none";
    submit.style.display = "block";
    text.readOnly = false;
    text.disabled = false;
    text.focus();
    text.selectionStart = text.selectionEnd = text.value.length;
}

function noteSubmit(id){
    const text = document.getElementById(`noteText${id}`);
    const submit = document.querySelector(`#note${id} .noteSubmit`);
    const edit = document.querySelector(`#note${id} .noteEdit`);

    submit.style.display = "none";
    edit.style.display = "block";
    text.readOnly = true;

    notes[id] = text.value;
}

function noteRemove(id){
    const note = document.getElementById(`note${id}`);
    note.remove();
    delete notes[id];
}

noteAdd.addEventListener("click", addNote);


document.querySelectorAll('.noteText').forEach(textarea => {
    textarea.style.height = 'auto';           
    textarea.style.height = textarea.scrollHeight + 'px'; 
});




const dateInput = document.getElementById("date");
const postDate = document.getElementById('postDate');

dateInput.addEventListener("keydown", (e) => {
    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key.startsWith("Arrow")
    ) {
        dateInput.value = '';
    }
});

postDate.addEventListener("keydown", (e) => {
    if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Tab" ||
        e.key.startsWith("Arrow")
    ) {
        postDate.value = '';
    }
});

postDate.addEventListener("input", () => {
    let value = postDate.value.replace(/\D/g, "");

    if (value.length >= 8) {
        value = value.slice(0, 8);
    }

    if (value.length >= 4 && value.length <= 6) {
        value = value.slice(0, 4) + "/" + value.slice(4);
    } else if (value.length > 6) {
        value =
            value.slice(0, 4) +
            "/" +
            value.slice(4, 6) +
            "/" +
            value.slice(6);
    }

    postDate.value = value;
});

dateInput.addEventListener("input", () => {
    let value = dateInput.value.replace(/\D/g, "");

    if (value.length >= 8) {
        value = value.slice(0, 8);
    }

    if (value.length >= 4 && value.length <= 6) {
        value = value.slice(0, 4) + "/" + value.slice(4);
    } else if (value.length > 6) {
        value =
            value.slice(0, 4) +
            "/" +
            value.slice(4, 6) +
            "/" +
            value.slice(6);
    }

    dateInput.value = value;
});





const satisfaction = document.getElementById('satisfactionValue');

satisfaction.addEventListener("input" ,() => {
    satisfaction.value = satisfaction.value > 100 ? 100 : satisfaction.value;
    satisfaction.value = satisfaction.value < 0 ? 0 : satisfaction.value;

});


const postsContainer = document.getElementById("postsContainer");
const postAddBtn = document.getElementById("postAdd");

// key-value store
let posts = {};
let nextPostId = 0;

function addPost() {
    const name = document.getElementById("postName").value.trim();
    const telegram = document.getElementById("postTelegram").value.trim();
    const twitter = document.getElementById("postTwitter").value.trim();
    const linkedin = document.getElementById("postLinkedin").value.trim();
    const date = document.getElementById("postDate").value.trim();

    if ((name && date)&&(telegram || twitter || linkedin)) {
        const id = nextPostId++;
        posts[id] = { name, telegram, twitter, linkedin, date };

        const table = document.getElementById("postsTable").querySelector("tbody");

        const tr = document.createElement("tr");
        tr.id = `post${id}`;
        tr.innerHTML = `
            <td><textarea readonly>${name}</textarea></td>
            <td><textarea readonly>${telegram}</textarea></td>
            <td><textarea readonly>${twitter}</textarea></td>
            <td><textarea readonly>${linkedin}</textarea></td>
            <td><input type="text" value="${date}" readonly></td>
            <td>
                <div onclick="editPost(${id})" class="postEdit">✏️</div>
                <div onclick="deletePost(${id})" class="postRemove">❌</div>
                <div onclick="submitPost(${id})" class="postSubmit"">☑️</div>
            </td>
        `
        table.appendChild(tr);
        document.getElementById("postName").value = "";
        document.getElementById("postTelegram").value = "";
        document.getElementById("postTwitter").value = "";
        document.getElementById("postLinkedin").value = "";
        document.getElementById("postDate").value = "";
    }

    ;


    
}

function editPost(id) {
    const tr = document.getElementById(`post${id}`);
    const textareas = tr.querySelectorAll("textarea");
    const input = tr.querySelector("input");

    textareas.forEach(ta => {
        ta.readOnly = false;
        ta.focus();
    });
    input.readOnly = false;

    tr.querySelector("button:nth-child(1)").style.display = "none"; // edit
    tr.querySelector("button:nth-child(3)").style.display = "inline"; // submit
}

function submitPost(id) {
    const tr = document.getElementById(`post${id}`);
    const textareas = tr.querySelectorAll("textarea");
    const input = tr.querySelector("input");

    // update key-value
    posts[id] = {
        name: textareas[0].value,
        telegram: textareas[1].value,
        twitter: textareas[2].value,
        linkedin: textareas[3].value,
        date: input.value
    };

    textareas.forEach(ta => ta.readOnly = true);
    input.readOnly = true;

    tr.querySelector("button:nth-child(1)").style.display = "inline"; 
    tr.querySelector("button:nth-child(3)").style.display = "none";  
}

function deletePost(id) {
    document.getElementById(`post${id}`).remove();
    delete posts[id];
}

postAddBtn.addEventListener("click", addPost);
