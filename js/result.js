
document.addEventListener("DOMContentLoaded", () => {



    const dataString = localStorage.getItem("reportData");
    if (!dataString) {
        console.warn("No report data found in localStorage!");
        return;
    }
    const reportData = JSON.parse(dataString);
    console.log(reportData);





/*

    const report = document.getElementById("report");
    const reportName = `aa`;
    
    html2pdf(report, {
        margin: 1,
        filename: `${reportName}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 7.5},
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    });

*/




});

