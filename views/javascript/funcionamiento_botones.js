const publicarButton = document.getElementById('publicarButton');
const articleContent = document.getElementById('articleContent');

publicarButton.onclick = () => {
    // const xhr = new XMLHttpRequest();

    const url = "http://localhost:3000/posts";


    const content = JSON.stringify(articleContent.value);

    console.log(content);

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(content);

    xhr.onload = () => {
        if (xhr.status !== 200) {
            console.log(xhr.statusText + ": " + xhr.status);
        } else {
            console.log(xhr.responseText);
        }
    }
}