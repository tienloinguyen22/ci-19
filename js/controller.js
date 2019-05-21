const controller = {};

controller.validateRegisterForm = (registerInfo) => {
  const { firstName, lastName, email, password, confirmPassword } = registerInfo;

  // validate input
  if (!firstName) {
    view.setMessage('firstName-error-message', 'Please input first name');
  } else {
    view.setMessage('firstName-error-message', '');
  }

  if (!lastName) {
    view.setMessage('lastName-error-message', 'Please input last name');
  } else {
    view.setMessage('lastName-error-message', '');
  }

  // validate email
  const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
  if (emailRegex.test(email)) {
    view.setMessage('email-error-message', '');
  } else {
    view.setMessage('email-error-message', 'Invalid email address');
  }

  // validate password
  if (!password) {
    view.setMessage('password-error-message', 'Please input password');
  } else if (password.length < 6) {
    view.setMessage('password-error-message', 'Password must be greater than 6 characters');
  } else {
    view.setMessage('password-error-message', '');
  }

  // validate confirm password
  if (!confirmPassword) {
    view.setMessage('confirm-error-message', 'Please confirm password');
  } else if (confirmPassword !== password) {
    view.setMessage('confirm-error-message', 'Confirm password didnt match');
  } else {
    view.setMessage('confirm-error-message', '');
  }

  // call model to create user
  if (firstName && lastName && email && password && emailRegex.test(email)&& confirmPassword === password) {
    model.createAccount(registerInfo);
  }
};

controller.validateLoginForm = (loginInfo) => {
  const { email, password } = loginInfo;

  // validate email
  const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
  if (emailRegex.test(email)) {
    view.setMessage('email-error-message', '');
  } else {
    view.setMessage('email-error-message', 'Invalid email address');
  }

  // validate password
  if (!password) {
    view.setMessage('password-error-message', 'Please input password');
  } else if (password.length < 6) {
    view.setMessage('password-error-message', 'Password must be greater than 6 characters');
  } else {
    view.setMessage('password-error-message', '');
  }

  if (emailRegex.test(email) && password) {
    model.logIn(loginInfo);
  }
};

controller.validateCreateConversation = (conversationInfo) => {
  const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

  if (conversationInfo.conversationName) {
    view.setMessage('conversation-name-error-message', '');
  } else {
    view.setMessage('conversation-name-error-message', 'Please input conversation name');
  }

  if (!conversationInfo.friendEmail) {
    view.setMessage('friend-email-error-message', 'Please input your friend email');
  } else if (!emailRegex.test(conversationInfo.friendEmail)) {
    view.setMessage('friend-email-error-message', 'Invalid email address');
  } else {
    view.setMessage('firend-email-error-message', '');
  }

  // call model to save new conversation to database
  if (conversationInfo.conversationName && conversationInfo.friendEmail) {
    model.createNewConversation(conversationInfo);
  }
};