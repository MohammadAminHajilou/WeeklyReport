
document.addEventListener("DOMContentLoaded", () => {



    const dataString = localStorage.getItem("reportData");
    if (!dataString) {
        console.warn("No report data found in localStorage!");
        return;
    }
    else {
        const reportData = JSON.parse(dataString);
        console.log(reportData);

        document.getElementById("name").innerHTML = reportData.name;
        document.getElementById("coordinator").innerHTML = reportData.coordinator;
        document.getElementById("course").innerHTML = reportData.course;
        document.getElementById("step").innerHTML = reportData.step;
        document.getElementById("satisfaction").innerHTML = reportData.satisfaction;
        document.getElementById("number").innerHTML = reportData.number;
        document.getElementById("date").innerHTML = reportData.date;
        document.getElementById("hoursSpent").innerHTML = reportData.hoursSpent;
        document.getElementById("hoursCommitted").innerHTML = reportData.hoursCommitted;
        document.getElementById("gradientSatisfaction").style.width = 100 - reportData.satisfaction + "%";
        document.getElementById("gradientHours").style.width = ((reportData.hoursCommitted - reportData.hoursSpent) / reportData.hoursCommitted) * 100 + "%";
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
        <td>${telegram ? `<a href="${telegram}" target="_blank">Link</a>` : "-"}</td>
        <td>${twitter ? `<a href="${twitter}" target="_blank">Link</a>` : "-"}</td>
        <td>${linkedin ? `<a href="${linkedin}" target="_blank">Link</a>` : "-"}</td>
        <td>${date}</td>
      </tr>`
    );
});




        const report = document.getElementById("report");
        const reportName = `Report ${reportData.number} - ${reportData.name} - ${reportData.course} - Step ${reportData.step}`;
        html2pdf(report, {
            margin: 1,
            filename: `${reportName}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 7.5},
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        });



    }








});

