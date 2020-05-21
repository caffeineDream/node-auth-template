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
            // Convert readableStream res.body into text string
            return response.text();
        })
        .then(HTMLstring => {
            // Insert response HTML into document
            document.body.innerHTML = HTMLstring;
            // Manually parse incoming scripts :(
            let scripts = document.querySelectorAll('script');
            for ( let i = 0; i < scripts.length; i++ ) {
                if ( scripts[i].innerText ) {
                    eval(scripts[i].innerText);
                } else {
                    fetch(scripts[i].src)
                    .then(src => {
                        return src.text();
                    })
                    .then(src => {
                        eval(src);
                    });
                };
                scripts[i].parentNode.removeChild(scripts[i]);
            };
        });
    } catch (err) {
        console.log(err);
    };
};
