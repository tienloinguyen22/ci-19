const model = {};

model.logInUser = undefined;

model.createAccount = async (registerInfo) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(
      registerInfo.email,
      registerInfo.password,
    );
    await firebase.auth().currentUser.updateProfile({
      displayName: registerInfo.firstName + ' ' + registerInfo.lastName,
    });
    firebase.auth().currentUser.sendEmailVerification();
  } catch (error) {
    console.log(error);
    view.setMessage('email-error-message', error.message);
  }
};

model.logIn = async (loginInfo) => {
  try {
    const loginResult = await firebase.auth().signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );

    if (loginResult.user.emailVerified) {
      // login success
      model.logInUser = {
        id: loginResult.user.uid,
        displayName: loginResult.user.displayName,
        email: loginResult.user.email,
      };
      view.setActiveScreen('chat');
    } else {
      // email is not verified
      view.setMessage('email-error-message', 'Email is not verified');
    }
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/user-not-found') {
      view.setMessage('email-error-message', error.message);
    } else if (error.code === 'auth/wrong-password') {
      view.setMessage('password-error-message', error.message);
    }
  }
};