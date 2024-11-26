const pagination = document.getElementById('pagination');
const articleContainer = document.getElementById('articleContainer');
let loading = document.getElementById('loading');

// obtener comentarios de un artículo
async function obtenerComentarios(articleId) {
    const urlComments = `http://localhost:3000/comments?articleId=${articleId}`;
    const xhrComments = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhrComments.open('GET', urlComments);
        xhrComments.onload = async () => {
            if (xhrComments.status === 200) {
                const comments = JSON.parse(xhrComments.responseText);
                let htmlComments = "";

                for (const comment of comments) {
                    const user = await obtenerUsuario(comment.userId);
                    htmlComments += `
                        <div class="modal-body">
                            <div class="comment">
                                <span class="comments"><b>${user[0].username}:</b></span>
                                <p>${comment.content}</p>
                            </div>
                        </div>
                    `;
                }

                resolve(htmlComments);
            } else {
                reject("Error al obtener comentarios");
            }
        };
        xhrComments.onerror = () => reject("Error de red al obtener comentarios");
        xhrComments.send();
    });
}

// obtener datos de un usuario
async function obtenerUsuario(userId) {
    const urlUser = `http://localhost:3000/users/${userId}`;
    const xhrUser = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhrUser.open('GET', urlUser);
        xhrUser.onload = () => {
            if (xhrUser.status === 200) {
                const user = JSON.parse(xhrUser.responseText);
                resolve(user);
            } else {
                reject("Error al obtener usuario");
            }
        };
        xhrUser.onerror = () => reject("Error de red al obtener usuario");
        xhrUser.send();
    });
}

// renderizar los artículos y comentarios dinámicamente
async function renderArticles(page = 1) {
    const pagUrl = `http://localhost:3000/posts?pag=${page}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', pagUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = async function () {
        loading.style.display = "block";
        setTimeout (() => {
            console.log("Carga Completa!");
            loading.style.display = "none";
        }, 2000);
        const response = JSON.parse(xhr.responseText);
        const articles = response[0];
        const numPags = Math.ceil(response[1]);
        let html = "";

        articleContainer.replaceChildren();

        for (let i = 0; i < articles.length; i++) {
            const htmlComments = await obtenerComentarios(articles[i]._id);

            html += `
                <div class="articulo">
                    <h2>${articles[i].title}</h2>
                    <button type="button" class="btnArticle" data-bs-toggle="modal" data-bs-target="#articulo${i + 1}">Abrir</button>
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
                                    <p>${articles[i].content}</p>
                                </div>
                                <div class="modal-body comments-container">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Comentarios</h4>
                                    </div>
                                    <div class="comments">
                                        ${htmlComments}
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button id="favoriteButton${i + 1}" style="padding:2px;"><i class="far fa-star" style="font-size:24px;"></i></button>
                                <textarea type="text" class="inputComentario" placeholder="Añade un comentario..."></textarea>
                                <button>Comentar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        articleContainer.innerHTML = html;

        // paginación
        renderPagination(numPags, page);
    };
}

// renderizar los botones de paginación
function renderPagination(totalPages, currentPage) {
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Asignar eventos de clic dinámicamente a los botones de paginación
    pagination.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'A') {
            const selectedPage = parseInt(target.getAttribute('data-page'));
            if (!isNaN(selectedPage)) {
                renderArticles(selectedPage); // Cargar artículos de la página seleccionada
            }
        }
    });
}

// cargando la primera página de artículos
renderArticles();
