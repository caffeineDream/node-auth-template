const formSwitchButtons = document.getElementsByClassName('form-switch');
const authForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

/* Switch login and register forms */
let shownForm = 0; // 0 — login form, 1 — registration form

const switchForms = () => {
    if ( shownForm == 0 ) {
        registerForm.classList.remove('display-none');
        authForm.classList.add('display-none');
        shownForm = 1;
    } else {
        authForm.classList.remove('display-none');
        registerForm.classList.add('display-none');
        shownForm = 0;
    }
};

for (var i = 0; i < formSwitchButtons.length; i++) {
    formSwitchButtons[i].addEventListener('click', switchForms, false);
};

/* Make login request with fetch, then save jwt from response header to HTML5 Web Storage*/

const usernameInput = document.getElementById('login-username-input');
const passwordInput = document.getElementById('login-password-input');

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginData = {"username": usernameInput.value, "password": passwordInput.value};
    const authUrl = '/auth';
    sendCredentials(authUrl, loginData);
    usernameInput.value = '';
    passwordInput.value = '';
});

async function sendCredentials(url = '', data = {}, method = 'POST') {
    try {
        return await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // Convert readableStreame res.body into text string
            return response.text()
        })
        .then(HTMLstring => {
            // Insert response HTML into document
            document.body.innerHTML = HTMLstring;
        });
    } catch (err) {
        console.log(err);
    };
};
