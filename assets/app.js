



    const usernameEl = document.querySelector('#username');
    const emailEl = document.querySelector('#email');
    const passwordEl = document.querySelector('#password');

    const form = document.querySelector('#signUp_Form');

    const checkUsername = () => {
        let valid = false;
        const username = usernameEl.value.trim();
        if (!isRequired(username)) {
            showError(usernameEl, 'Full Name cannot be blank.');
        } else {
            showSuccess(usernameEl);
            valid = true;
        }
        return valid;
    };

    const checkEmail = () => {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    const checkPassword = () => {
        let valid = false;
        const password = passwordEl.value.trim();
        if (!isRequired(password)) {
            showError(passwordEl, 'Password cannot be blank.');
        } else if (!isPasswordValid(password)) {
            showError(passwordEl, 'Password must be at least 8 characters long.');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }
        return valid;
    };

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const isRequired = (value) => value.trim() !== '';

    const showError = (input, message) => {
        const formField = input.parentElement;
        const error = formField.querySelector('small');

        if (error) {
            formField.classList.remove('success');
            formField.classList.add('error');
            error.textContent = message;
        } else {
            console.error('Error: Small element not found in form field:', formField);
        }
    };

    const showSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        if (error) {
            error.textContent = ''; // Update only if the error element is found
        } else {
            console.error('Error: Small element not found in form field:', formField);
        }
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isUsernameValid = checkUsername();
        let isEmailValid = checkEmail();
        let isPasswordValid = checkPassword();
        let isFormValid = isUsernameValid && isEmailValid && isPasswordValid;
        if (isFormValid) {
            // Form submission logic (e.g., sending data to server)
        }
    });

    const debounce = (fn, delay = 500) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn.apply(null, args);
            }, delay);
        };
    };

    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
        }
    }));
