const newArticleButton = document.getElementById('newArticleButton');
const articleContent = document.getElementById('articleContent');
const articleTitle = document.getElementById('articleTitle');

// inputs del modal de login
const loginEmailInput = document.getElementById('email');
const loginPasswordInput = document.getElementById('password');

//inputs del modal del sign up
const signupFirstNameInput = document.getElementById('signupFirstName');
const signupLastNameInput = document.getElementById('signupLastName');
const signupUsername = document.getElementById('signupUsername');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');

// container donde insertar el botón de publicar nuevo artículo, una vez que se haya iniciado sesión
const herramientas = document.getElementById('herramientas')

const buttonContainer = document.getElementById('buttonContainer');
const createAccountButton = document.getElementById('createAccountButton');
const loginButton = document.getElementById('loginButton');

// function findUser(email, password) {
//     // TRY comparar el email y la contraseña con el User.find() 
//         // return del usuario
//     // CATCH si no son iguales, mandar una alerta de que el usuario no coincide.
//     const xhrAuth = new XMLHttpRequest();
//     const url = `http://localhost:3000/users/:auth?email=${email}&password=${password}`;
//     xhrAuth.open('GET', url);
//     xhrAuth.onload = () => {
//         console.log(xhrAuth.responseText);
//         if(xhrAuth.responseText != undefined) {
//             return xhrAuth.responseText;
//         } else {
//             alert('email o password incorrectos');
//             return undefined;
//         }
//     }
// }


// --------------------------- SIGN UP ---------------------------
createAccountButton.onclick = () => {
    const xhrSignUp = new XMLHttpRequest();
    const url = "http://localhost:3000/users";
    // guardar todos los inputs en un objeto (que en realidad son todos los atributos del user schema)
    const userData = {
        email: signupEmail.value,
        firstname: signupFirstNameInput.value,
        lastname: signupLastNameInput.value,
        username: signupUsername.value,
        password: signupPassword.value
    }
    
    console.log("Se hará post de:\n");
    console.log(userData);
    // guardar el nuevo usuario en la base de datos
    xhrSignUp.open('POST', url);
    xhrSignUp.setRequestHeader('Content-Type', 'application/json');
    xhrSignUp.send(JSON.stringify(userData));

    xhrSignUp.onload = () => {
        if (xhrSignUp.status !== 200) {
            console.log(xhrSignUp.statusText + ": " + xhrSignUp.status);
        } else {
            console.log('Usuario creado exitosamente');
        }
    }

    // obtener el usuario de la BD para obtener su ID
    const newEmail = userData.email;
    const newPassword = userData.password;

    authenticateNewUser(newEmail, newPassword);
}

function authenticateNewUser(newEmail, newPassword) {
    const xhrCreateAccount = new XMLHttpRequest();
    xhrCreateAccount.open('POST', 'http://localhost:3000/users/auth');
    xhrCreateAccount.setRequestHeader('Content-Type', 'application/json');
    xhrCreateAccount.send(JSON.stringify({newEmail, newPassword}));
    xhrCreateAccount.onload = () => {
        if (xhrCreateAccount.status !== 200) {
            console.log(xhrCreateAccount.statusText + ': ' + xhrCreateAccount.statusText);
        } else {
            const newUser = JSON.parse(xhrCreateAccount.responseText);
            // usando el buttonContainer
            // eliminar los botones de login y signup
            buttonContainer.replaceChildren();
            // agregar el botón de logout
            let html = `<button type="button" class="btn navbarbtn logoutBtn" data-bs-toggle="modal" data-bs-target="#logout">${newUser.username}</button>
            <div class="modal" id="logout">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Seguro que quieres hacer log out ${newUser.firstname}?</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button id="logoutButton" type="button" class="btn confirm-logout" data-bs-dismiss="modal">Log out</button>   
                        </div>
                    </div>
                </div>
            </div>    
            `;
            buttonContainer.innerHTML = html;

            // funcionalidad de logout button
            const logoutButton = document.getElementById('logoutButton');

            logoutButton.onclick = () => {
                // eliminar botón de username
                buttonContainer.replaceChildren();
                let html = `
                    <button type="button" class="btn navbarbtn loginBtn" data-bs-toggle="modal" data-bs-target="#login">Login</button>
                    <button type="button" class="btn navbarbtn signupBtn" data-bs-toggle="modal" data-bs-target="#signup">Sign Up</button>
                `;
                buttonContainer.innerHTML = html;
                //eliminar botón de publicar
                herramientas.replaceChildren();
            }

            // usando herramientas
            // agregar botón de publicar nuevo artículo
            html = `<button id="newArticleButton" type="button" class="btnNewArticle" data-bs-toggle="modal" data-bs-target="#nuevoArticulo"><i class="fa-solid fa-plus"></i> Publicar nuevo artículo</button>`;
            herramientas.innerHTML = html;

            const publicarButton = document.getElementById('publicarButton');
            publicarButton.onclick = () => {
                const xhrPublicar = new XMLHttpRequest();
                
                const url = "http://localhost:3000/posts";
                
                const information = {
                    userId: newUser._id,
                    date: new Date(),
                    likes: 0,
                    title: articleTitle.value,
                    content: articleContent.value
                };
                
                const publicar = JSON.stringify(information);
            
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

// --------------------------- LOGIN ---------------------------
loginButton.onclick = () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // verificar si el usuario puso los campos de email y password
    if (!email || !password) {
        alert('Por favor, ingresa tu email y contraseña');
        return;
    }

    const xhrLogin = new XMLHttpRequest();
    xhrLogin.open('POST', 'http://localhost:3000/users/auth');
    xhrLogin.setRequestHeader('Content-Type', 'application/json');
    xhrLogin.send(JSON.stringify({email, password}));
    xhrLogin.onload = () => {
        if (xhrLogin.status !== 200) {
            console.log(xhrLogin.statusText + ': ' + xhrLogin.statusText);
        } else {
            const userLogin = JSON.parse(xhrLogin.responseText);
            console.log('Usuario autenticado: ' + userLogin);
            // usando el buttonContainer
            // eliminar los botones de login y signup
            buttonContainer.replaceChildren();
            // agregar el botón de logout
            let html = `<button type="button" class="btn navbarbtn logoutBtn" data-bs-toggle="modal" data-bs-target="#logout">${userLogin.username}</button>
                <div class="modal" id="logout">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">Seguro que quieres hacer log out ${userLogin.firstname}?</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button id="logoutButton" type="button" class="btn confirm-logout" data-bs-dismiss="modal">Log out</button>   
                            </div>
                        </div>
                    </div>
                </div>    
                `;
            buttonContainer.innerHTML = html;

            // funcionalidad de logout button
            const logoutButton = document.getElementById('logoutButton');

            logoutButton.onclick = () => {
                // eliminar botón de username
                buttonContainer.replaceChildren();
                let html = `
                    <button type="button" class="btn navbarbtn loginBtn" data-bs-toggle="modal" data-bs-target="#login">Login</button>
                    <button type="button" class="btn navbarbtn signupBtn" data-bs-toggle="modal" data-bs-target="#signup">Sign Up</button>
                `;
                buttonContainer.innerHTML = html;
                //eliminar botón de publicar
                herramientas.replaceChildren();
            }
        
            // usando herramientas
            // agregar botón de publicar nuevo artículo
            html = `<button id="newArticleButton" type="button" class="btnNewArticle" data-bs-toggle="modal" data-bs-target="#nuevoArticulo"><i class="fa-solid fa-plus"></i> Publicar nuevo artículo</button>`;
            herramientas.innerHTML = html;
        
            const publicarButton = document.getElementById('publicarButton');
            publicarButton.onclick = () => {
                const xhrPublicar = new XMLHttpRequest();
                
                const url = "http://localhost:3000/posts";
                
                const information = {
                    userId: userLogin._id,
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
                        renderArticles();
                    }
                }
            }
        }
    };
}



// así estaba implementado el publicar artículos antes de tener lo del login y signup

/*
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
*/
