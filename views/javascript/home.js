let pagination = document.getElementById('pagination');
let articleContainer = document.getElementById('articleContainer');

let pag1 = 'http://localhost:3000/posts?pag=1';

let xhr = new XMLHttpRequest();
xhr.open('GET', pag1);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

xhr.onload = function () {
    let articles = JSON.parse(xhr.responseText)[0];
    let numPags = Math.ceil(JSON.parse(xhr.responseText)[1]);
    let html = "";
    let htmlComments = "";

    if (xhr.status == 404) {
        console.log("Producto no encontrado.");
    }
    else if (xhr.status != 200) { //analizar el status de la respuesta HTTP
        alert(xhr.status + ": " + xhr.statusText); // Ej. 404: Not Found
    }
    else {
        articleContainer.replaceChildren();
        for(let i=0; i<articles.length; i++) {
            // Obteniendo los comentarios del artículo
            let xhrComments = new XMLHttpRequest();
            let urlComments = 'http://localhost:3000/comments?articleId=' + articles[i]._id;
            xhrComments.open('GET', urlComments);
            xhrComments.send();
            xhrComments.onload = () =>{
                let comments = JSON.parse(xhrComments.responseText);
                for(let i=0; i<comments.length; i++) {
                    // Obteniendo el username de cada comentario
                    let xhrUser = new XMLHttpRequest();
                    let urlUser = 'http://localhost:3000/users/' + comments[i].userId;
                    xhrUser.open('GET', urlUser);
                    xhrUser.send();
                    xhrUser.onload = () => {
                        let user = JSON.parse(xhrUser.responseText);
                        htmlComments += `
                            <div class="modal-body">
                                <div class="comment">
                                    <span class="comments"><b>${user[0].username}:</b></span>
                                    <p>${comments[i].content}</p>
                                </div>
                            </div>
                        `;
                    }
                }
            }
            console.log(htmlComments);

            html += `
                <div class="articulo">
                        <h2>${articles[i].title}</h2>
                        <button type="button" class="btnArticle" data-bs-toggle="modal" data-bs-target="#articulo${i + 1} id="btnAbrir${i + 1}">Abir</button>
                        <hr>
                        <p><i class="fas fa-star"></i> ${articles[i].likes}</p>
                    </div>
                    
                    <div class="modal" id="articulo${i + 1}">
                    <div class="modal-dialog modify-dialog modal-xl">
                        <div class="modal-content modify-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">${articles[i].title}</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <!-- Modal body -->
                            <div class="modal-body modify-body articleContainer">
                                <div class="textArticle">
                                    <p>
                                        ${articles[i].content}
                                    </p>
                                </div>
                                <div class="modal-body comments-container">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Comentarios</h4>
                                    </div>
                                    <div class="comments" id="commentsContainer${i + 1}">
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button id="favoriteButton1" style="padding:2px;"><i class="far fa-star" style="font-size:24px;"></i></button>
                                <textarea type="text" class="inputComentario" placeholder="Añade un comentario..."></textarea>
                                <button>Comentar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        articleContainer.innerHTML = html;

        for(let i=0; i<numPags; i++) {
            pagination.innerHTML += `<li class="page-item"><a id="pagination${i + 1}" class="page-link">${i + 1}</a></li>`;
        }
    }
}