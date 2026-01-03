function changeTheme() {
    const button = document.getElementById('themeButton');
    const style = document.getElementById('themeStyle');
    const lang = document.getElementById('language');
    const gradient = document.querySelector('.headerGradient');
    const body = document.body;

    body.style.animation = 'fadeOut 0.1s forwards';

    setTimeout(() => {
        const isDark = button.src.includes('dark.svg'); 
        button.src = isDark ? 'images/icons/light.svg' : 'images/icons/dark.svg';
        lang.src = lang.src.includes('dark.svg') ? 'images/icons/langlight.svg' : 'images/icons/langdark.svg';
        style.href = style.href.includes('dark.css') ? 'css/light.css' : 'css/dark.css';

        localStorage.setItem('theme', style.href.includes('dark.css') ? 'dark' : 'light');

        setTimeout(() => {
            body.style.animation = 'fadeIn 0.1s forwards';
            gradient.style.animation = 'fadeGradient 1s forwards';
        }, 100);
        gradient.style.animation = 'none';

    }, 100);
}




function selectCourse(course) {


    const stepSelect = document.getElementById("step");
    const courseSteps = {
        web: 10,
        csharp: 11,
        ml: 12
    };
    const stepText = currentLang == "en" ? "Step" : "مرحله";
    stepSelect.innerHTML = "";
    for (let i = 1; i <= courseSteps[course]; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.insertAdjacentHTML("beforeend", `<span data-i18n="stepText">${stepText}</span>`);
        option.insertAdjacentText("beforeend", ` ${i}`);
        stepSelect.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const style = document.getElementById('themeStyle');
    const button = document.getElementById('themeButton');
    const lang = document.getElementById('language');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        style.href = savedTheme === 'dark' ? 'css/dark.css' : 'css/light.css';
        button.src = savedTheme === 'dark' ? 'images/icons/dark.svg' : 'images/icons/light.svg';
        lang.src = savedTheme === 'dark' ? 'images/icons/langdark.svg' : 'images/icons/langlight.svg';
    }
});








let currentLang = localStorage.getItem("lang") || "en";

const fontStyle = document.getElementById("font");
let fontCSS = localStorage.getItem("font") || '* { font-family: Arial, "B Koodak";';

applyLanguage(currentLang , fontCSS);
updateLangUI(currentLang);

async function applyLanguage(lang , font) {
    const res = await fetch(`json/languages/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (data[key]) el.textContent = data[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (data[key]) el.placeholder = data[key];
    });

    fontStyle.innerHTML = font;


}


function updateLangUI(lang) {
    document.getElementById("en").classList.toggle("selectedLang", lang === "en");
    document.getElementById("fa").classList.toggle("selectedLang", lang === "fa");
}


function changeLanguage() {
    const fa = document.getElementById("fa");
    const en = document.getElementById("en");

    en.classList.toggle("selectedLang");
    fa.classList.toggle("selectedLang");

    currentLang = currentLang === "en" ? "fa" : "en";
    const fontCSS = currentLang === "en" 
        ? '* { font-family: Arial, "B Koodak"; }' 
        : '* { font-family: "B Koodak", Arial; }';

    fontStyle.innerHTML = fontCSS;
    localStorage.setItem("font", fontCSS);
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang , fontCSS);
    updateLangUI(currentLang);
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
        <div class="noteButtons">
            <div class="noteEdit" onclick="noteEdit(${id})">✏️</div>
            <div class="noteSubmit" onclick="noteSubmit(${id})" style="display:none;">☑️</div>
            <div class="noteRemove" onclick="noteRemove(${id})">❌</div>
        </div>

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

let posts = {};
let nextPostId = 0;

function addPost() {
    const name = document.getElementById("postName").value.trim();
    const telegram = document.getElementById("postTelegram").value.trim();
    const twitter = document.getElementById("postTwitter").value.trim();
    const linkedin = document.getElementById("postLinkedin").value.trim();
    const date = document.getElementById("postDate").value.trim();

    if ((name && date)&&(telegram || twitter || linkedin)&&(date.length = 10)) {
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
            <td><textarea readonly>${date}</textarea></td>
            <td>
                <div onclick="editPost(${id})" class="postEdit">✏️</div>
                <div onclick="submitPost(${id})" class="postSubmit">☑️</div>
                <div onclick="deletePost(${id})" class="postRemove">❌</div>
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

    textareas.forEach(ta => {
        ta.readOnly = false;
    });
    textareas[0].focus();
    textareas[0].selectionStart = textareas[0].selectionEnd = textareas[0].value.length;

    tr.querySelector("div:nth-child(1)").style.display = "none"; 
    tr.querySelector("div:nth-child(2)").style.display = "inline"; 
}

function submitPost(id) {
    const tr = document.getElementById(`post${id}`);
    const textareas = tr.querySelectorAll("textarea");

    posts[id] = {
        name: textareas[0].value,
        telegram: textareas[1].value,
        twitter: textareas[2].value,
        linkedin: textareas[3].value,
        date: textareas[4].value
    };

    textareas.forEach(ta => ta.readOnly = true);

    tr.querySelector("div:nth-child(1)").style.display = "inline"; 
    tr.querySelector("div:nth-child(2)").style.display = "none";  
}

function deletePost(id) {
    document.getElementById(`post${id}`).remove();
    delete posts[id];
}

postAddBtn.addEventListener("click", addPost);



document.getElementById("generate").addEventListener("click", (e) => {

    e.preventDefault;

    const name = document.getElementById("name").value.trim();
    const coordinator = document.getElementById("coordinator").value.trim();
    const course = document.querySelector('input[name="options"]:checked')?.value || null;
    const step = document.getElementById("step").value;
    const satisfaction = document.getElementById("satisfactionValue").value;
    const hoursSpent = document.getElementById("hoursSpent").value;
    const hoursCommitted = document.getElementById("hoursCommitted").value;
    const reportNumber = document.getElementById("number").value;
    const reportDate = document.getElementById("date").value;
    const notesList = notes;
    const postsArray = posts; 

    const formData = {
        name,
        coordinator,
        course,
        step,
        satisfaction,
        hoursSpent,
        hoursCommitted,
        reportNumber,
        reportDate,
        notes: notesList,
        posts: postsArray
    };

    localStorage.setItem("reportData", JSON.stringify(formData));
    console.log(localStorage.getItem("reportData")); 

});
