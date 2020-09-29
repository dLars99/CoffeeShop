const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            const beans = document.getElementById("beans")
            beans.innerHTML = renderBeanHTML(beanVarieties)
        })
})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const renderBeanHTML = (beans) => {
    htmlToRender = `<h2>Coffee Bean Varieties</h2>
                    <ul>`
    beans.forEach(bean => {
        if (!bean.notes) bean.notes = "No additional notes"
        htmlToRender += `<li><strong>${bean.name}, ${bean.region}:</strong> ${bean.notes}</li>`
    })
    htmlToRender += "</ul>"
    return htmlToRender
}