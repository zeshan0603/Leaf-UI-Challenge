 // !FORM VALIDATION
 const usernameEl = document.querySelector('#username');
 const emailEl = document.querySelector('#email');
 const passwordEl = document.querySelector('#password');
 const form = document.querySelector('#signUp_Form');
 const icons = document.getElementsByClassName("icon")






 const checkUsername = () => {

     let valid = false;

     const min = 3,
         max = 25;

     const username = usernameEl.value.trim();

     if (!isRequired(username)) {
         showError(usernameEl, 'Username cannot be blank.');
     } else if (!isBetween(username.length, min, max)) {
         showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
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

 const checkpassword = () => {
     let valid = false;
     const password = passwordEl.value.trim();
     if (!isRequired(password)) {
         showError(passwordEl, 'Password cannot be blank.');
     }
     else {
         showSuccess(passwordEl);
         valid = true;
     }
     return valid;
 };

 const isEmailValid = (email) => {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 };

 const isRequired = value => value === '' ? false : true;
 const isBetween = (length, min, max) => length < min || length > max ? false : true;


 const showError = (input, password) => {
     // get the form-field element
     const formField = input.parentElement;
     // add the error class
     formField.classList.remove('success');
     formField.classList.add('error');


     // show the error password
     const error = formField.querySelector('small');
     error.style.opacity = "1";
     error.textContent = password;

 };

 const showSuccess = (input) => {
     // get the form-field element
     const formField = input.parentElement;

     // remove the error class
     formField.classList.remove('error');
     formField.classList.add('success');

     // hide the error password
     const error = formField.querySelector('small');
     error.textContent = '--';
     error.style.opacity = "0";
 }


 form.addEventListener('submit', function (e) {
     // prevent the form from submitting
     e.preventDefault();

     // validate fields
     let isUsernameValid = checkUsername(),
         isEmailValid = checkEmail(),
         ispasswordValid = checkpassword();

     let isFormValid = isUsernameValid &&
         isEmailValid && ispasswordValid;

     // submit to the server if the form is valid
     if (isFormValid) {
         alert("Form Submitted")
         usernameEl.value = "";
         emailEl.value = "";
         passwordEl.value = "";
     }
 });


 const debounce = (fn, delay = 500) => {
     let timeoutId;
     return (...args) => {
         // cancel the previous timer
         if (timeoutId) {
             clearTimeout(timeoutId);
         }
         // setup a new timer
         timeoutId = setTimeout(() => {
             fn.apply(null, args)
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

     }
 }));
 // !FORM VALIDATION