(function () {
    document.getElementById('login-form')
        .addEventListener('submit', (event) => {
            event.preventDefault();
            const data = {
                email: document.getElementById('email-input').value,
                password: document.getElementById('password-input').value
            };
            fetch('/sessions/login', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((data) => {
                    console.log('data', data);
                    console.log('cookies', document.cookie);
                    // localStorage.setItem('token', data.acces_token);

                })
                .catch((error) => {
                    console.error('error', error);
                })
        })
})