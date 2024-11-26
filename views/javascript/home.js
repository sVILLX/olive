let pagination = document.getElementById('pagination');

let pag1 = 'http://localhost:3000/posts?pag=1';

let xhr = new XMLHttpRequest();
xhr.open('GET', pag1);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

xhr.onload = function () {
    let articles = JSON.parse(xhr.responseText)[0];
    let numPags = Math.ceil(JSON.parse(xhr.responseText)[1]);
    let html = "";

    if (xhr.status == 404) {
        console.log("Producto no encontrado.");
    }
    else if (xhr.status != 200) { //analizar el status de la respuesta HTTP
        alert(xhr.status + ": " + xhr.statusText); // Ej. 404: Not Found
    }
    else {
        for(let i=0; i<numPags; i++) {
            console.log("Entre");
            pagination.innerHTML += `<li class="page-item"><a id="pagination${i + 1}" class="page-link">${i + 1}</a></li>`;
        }
    }
}