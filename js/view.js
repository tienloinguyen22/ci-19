const view = {};

view.setMessage = (elementId, message) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = message;
  }
};

view.setActiveScreen = (componentName) => {
  const app = document.getElementById('app');

  switch (componentName) {
    case 'index':
      if (app) {
        app.innerHTML = components.index;
        document.getElementById('display-name').innerText = model.logInUser.displayName;
        document.getElementById('email').innerText = model.logInUser.email;
      }
      break;
  
    case 'register':
      if(app) {
        app.innerHTML = components.register;
      }

      // Listen submit event
      const registerForm = document.getElementById('form-wrapper');
      if (registerForm) {
        const handleRegisterSubmit = (event) => {
          event.preventDefault();

          // get input values
          const firstName = registerForm.firstName.value;
          const lastName = registerForm.lastName.value;
          const email = registerForm.email.value;
          const password = registerForm.password.value;
          const confirmPassword = registerForm.confirmPassword.value;

          const registerInfo = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          };

          controller.validateRegisterForm(registerInfo);
        };
        registerForm.addEventListener('submit', handleRegisterSubmit);
      }
      break;
    
    case 'login':
      if(app) {
        app.innerHTML = components.login;
      }

      const createAccountButton = document.getElementById('create-account-button');
      if (createAccountButton) {
        handleCreateAccountClick = (_event) => {
          view.setActiveScreen('register');
        };
        createAccountButton.addEventListener('click', handleCreateAccountClick);
      }

      // Listen submit event
      const loginForm = document.getElementById('form-wrapper');
      if (loginForm) {
        const handleLoginSubmit = (event) => {
          event.preventDefault();

          const email = loginForm.email.value;
          const password = loginForm.password.value;

          const loginInfo = {
            email,
            password,
          };

          controller.validateLoginForm(loginInfo);
        };
        loginForm.addEventListener('submit', handleLoginSubmit);
      }
  }
};
