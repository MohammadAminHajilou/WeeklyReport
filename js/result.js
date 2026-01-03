
document.addEventListener("DOMContentLoaded", () => {
    const report = document.getElementById("report");
    const reportName = `aa`;
    
    html2pdf(report, {
        margin: 1,
        filename: `${reportName}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 7.5},
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    });
});
