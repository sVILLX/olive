const newArticleButton = document.getElementById('newArticleButton');
const publicarButton = document.getElementById('publicarButton');
const articleContent = document.getElementById('articleContent');
const articleTitle = document.getElementById('articleTitle');

newArticleButton.onclick = () => {
    const url = "http://localhost:3000/users";
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status !== 200) {
            console.log(xhr.statusText + ': ' + xhr.status);
        } else {
            console.log("La respuesta del servidor es: ")
            console.log(xhr.responseText);
            const user = JSON.parse(xhr.responseText);
            console.log("La informacion del usuario es: ")
            console.log(user);

            publicarButton.onclick = () => {
                const xhrPublicar = new XMLHttpRequest();
                
                const url = "http://localhost:3000/posts";
                
                const information = {
                    userId: user[0]._id,
                    date: new Date(),
                    likes: 0,
                    title: articleTitle.value,
                    content: articleContent.value
                };
                
                const publicar = JSON.stringify(information);
            
                console.log("Lo que se va a publicar es:")
                console.log(publicar);
            
                xhrPublicar.open('POST', url);
                xhrPublicar.setRequestHeader('Content-Type', 'application/json');
                xhrPublicar.send(publicar);
            
                xhrPublicar.onload = () => {
                    if (xhrPublicar.status !== 200) {
                        console.log(xhrPublicar.statusText + ": " + xhrPublicar.status);
                    } else {
                        console.log('Artículo publicado exitosamente!');
                    }
                }
            }
        }
    }


}

