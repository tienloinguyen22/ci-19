const view = {};

view.setMessage = (elementId, message) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = message;
  }
};

view.setActiveScreen = () => {
  // const app = document.getElementById('app');
  // if (app) {
  //   app.innerHTML = components.index;
  // }

  // Listen submit event
  const registerForm = document.getElementById('form-wrapper');
  if (registerForm) {
    const handleSubmit = (event) => {
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
    registerForm.addEventListener('submit', handleSubmit);
  }
};
