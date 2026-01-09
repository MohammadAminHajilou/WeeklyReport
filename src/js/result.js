
document.addEventListener("DOMContentLoaded", () => {

    const style = document.getElementById('themeStyle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        style.href = savedTheme === 'dark' ? 'src/css/dark.css' : 'src/css/light.css';
    }



    const dataString = localStorage.getItem("reportData");
    if (!dataString) {
        console.warn("No report data found in localStorage!");
        return;
    }
    else {
        const reportData = JSON.parse(dataString);
        console.log(reportData);

        
        const isDaily = reportData.hoursCommitted === "";
        

        Object.values(reportData.notes).forEach(note => {
            document
              .getElementById("notes")
              .insertAdjacentHTML(
                "beforeend",
                `<div>- <span>${note}</span></div>`
              );
        });
        Object.values(reportData.posts).forEach(({ name, telegram, twitter, linkedin, date }) => {
          document
            .getElementById("posts")
            .insertAdjacentHTML(
              "beforeend",
              `<tr>
                <td>${name}</td>
                <td>${telegram ? `<a href="${telegram}" target="_blank" data-i18n="linkText">Link</a>` : "-"}</td>
                <td>${twitter ? `<a href="${twitter}" target="_blank" data-i18n="linkText">Link</a>` : "-"}</td>
                <td>${linkedin ? `<a href="${linkedin}" target="_blank" data-i18n="linkText">Link</a>` : "-"}</td>
                <td>${date}</td>
              </tr>`
            );
        });

        let currentLang = localStorage.getItem("lang") || "en";

        const fontStyle = document.getElementById("font");
        let fontCSS = localStorage.getItem("font") || '* { font-family: Arial, "B Koodak";';

        applyLanguage(currentLang , fontCSS);

        async function applyLanguage(lang , font) {
            const res = await fetch(`src/json/languages/${lang}.json`);
            const data = await res.json();

            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.dataset.i18n;
                if (data[key]) el.textContent = data[key];
            });

            document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
                const key = el.dataset.i18nPlaceholder;
                if (data[key]) el.placeholder = data[key];
            });


            document.querySelectorAll("[data-i18n-value]").forEach(el => {
              const key = el.dataset.i18nValue;
              if (data[key] !== undefined) {
                el.value = data[key];
              }
            });



            





            const isRTL = ["fa"].includes(lang);
            document.documentElement.dir = isRTL ? "rtl" : "ltr";
            document.getElementById("github").style.flexDirection = isRTL ? "row-reverse" : "row";
            document.documentElement.lang = lang;

            fontStyle.innerHTML = font;

            if (isDaily) {
              document.getElementById("hoursCommitted").style.display = "none";
              document.getElementById("underline").style.display = "none";
              document.querySelector(".hoursSpentText").innerHTML = data["activityHoursText"];
              document.querySelector(".gradientHours").style.background = reportData.hoursSpent == 0 ? "var(--sat-0)" : "var(--sat-100)";

              document.getElementById("hoursSpent").style.fontSize = "1rem";
    
    

            }
            else {
              document.getElementById("hoursSpent").style.position = "relative";
              document.getElementById("hoursCommitted").style.position = "relative";

              document.getElementById("hoursSpent").style.top = "8px";
              document.getElementById("hoursCommitted").style.bottom = "8px";


            }
        document.getElementById("name").innerHTML = reportData.name;
        document.getElementById("coordinator").innerHTML = reportData.coordinator;
        document.getElementById("type").innerHTML = reportData.type;
        document.getElementById("course").innerHTML = reportData.course;
        document.getElementById("step").innerHTML = reportData.step;
        document.getElementById("satisfaction").innerHTML = reportData.satisfaction;
        document.getElementById("number").innerHTML = reportData.number;
        document.getElementById("date").innerHTML = reportData.date;
        document.getElementById("hoursSpent").innerHTML = reportData.hoursSpent;
        document.getElementById("hoursCommitted").innerHTML = reportData.hoursCommitted;
        document.getElementById("gradientSatisfaction").style.width = 100 - reportData.satisfaction + "%";
        document.getElementById("gradientHours").style.width = ((reportData.hoursCommitted - reportData.hoursSpent) / reportData.hoursCommitted) * 100 + "%";
       
          
            const report = document.getElementById("report");
            const reportName = `${data.reportText} ${reportData.type} ${reportData.number} - ${reportData.name} - ${reportData.course} - ${data.stepText} ${reportData.step}`;
            html2pdf(report, {
                margin: 0.5,
                filename: `${reportName}.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 5},
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            });


        }

        

    }








});

