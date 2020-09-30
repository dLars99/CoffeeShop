const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            const beans = document.getElementById("beans")
            beans.innerHTML = renderBeanHTML(beanVarieties)
        })
})

const newBean = document.getElementById("submitNewBean")
newBean.addEventListener("click", (evt) => {
    evt.preventDefault()
    const newBean = {
        name: document.getElementById("beanName").value,
        region: document.getElementById("beanRegion").value,
        notes: document.getElementById("beanNotes").value
    }

    saveNewBean(newBean).then(() => {
        document.getElementById("beanName").value = ""
        document.getElementById("beanRegion").value = ""
        document.getElementById("beanNotes").value = ""
    })

})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

const saveNewBean = (bean) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bean)
    }).then(resp => resp.json());

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