const view = {};

view.setMessage = (elementId, message) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = message;
  }
};

view.sendMessage = (sender, message) => {
  // render a new message
  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  if (sender) {
    messageContent.classList.add('friend-message');
  } else {
    messageContent.classList.add('my-message');
  }

  const senderElement = document.createElement('div');
  senderElement.classList.add('sender');
  if (sender) {
    senderElement.innerText = sender;
  }

  const content = document.createElement('div');
  content.classList.add('content');
  content.innerText = message;

  messageContent.appendChild(senderElement);
  messageContent.appendChild(content);

  const messageContainer = document.getElementById('message-container');
  if (messageContainer) {
    messageContainer.appendChild(messageContent);
  }
};

view.setActiveScreen = (componentName) => {
  const app = document.getElementById('app');

  switch (componentName) {
    case 'chat':
      if (app) {
        app.innerHTML = components.chat;
      }

      // listen submit event
      const messageForm = document.getElementById('input-message');
      if (messageForm) {
        const handleMessageSubmit = (event) => {
          // get value from input
          event.preventDefault();
          const message = messageForm.message.value;
          
          // validate messageContent (not null)
          if (message) {
            // save message to db
            model.saveMessage(message);

            // remove old message from input
            messageForm.message.value = '';
          }
        };
        // addEventListener
        messageForm.addEventListener('submit', handleMessageSubmit);
      }

      // load conversation + display old message
      model.loadConversations();

      // listen click event of create-conversation-button
      const createConversationButton = document.getElementById('create-conversation-button');
      const handleCreateClick = (_event) => {
        view.setActiveScreen('createConversation');
      };
      if (createConversationButton) {
        createConversationButton.addEventListener('click', handleCreateClick);
      }
      break;

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
      break;

    case 'createConversation':
      if (app) {
        app.innerHTML = components.createConversation;
      }

      // listen cancel click
      const cancelButton = document.getElementById('cancle-create-conversation');
      const handleCancelClick = (_event) => {
        view.setActiveScreen('chat');
        model.clearActiveConversation();
      };
      if (cancelButton) {
        cancelButton.addEventListener('click', handleCancelClick);
      }

      // listen create-form submit
      const createConversationForm = document.getElementById('create-conversation-form');
      const handleCreateConversationFormSubmit = (event) => {
        event.preventDefault();

        const conversationName = createConversationForm.conversationName.value;
        const friendEmail = createConversationForm.friendEmail.value;

        const createConversationInfo = {
          conversationName,
          friendEmail,
        };

        controller.validateCreateConversation(createConversationInfo);
      };
      if (createConversationForm) {
        createConversationForm.addEventListener('submit', handleCreateConversationFormSubmit);
      }
      break;
  }
};

view.renderConversationItem = (conversationInfo) => {
  const conversationItem = document.createElement('div');
  conversationItem.innerText = conversationInfo.name;
  conversationItem.classList.add('conversation-item');
  conversationItem.id = conversationInfo.id;
  if (conversationInfo.id === model.activeConversation.id) {
    conversationItem.classList.add('active-conversation');
  }
  changeActiveConversation = (_event) => {
    // render conversation list
    const oldConversationItem = document.getElementById(model.activeConversation.id);
    if (oldConversationItem) {
      oldConversationItem.classList.remove('active-conversation');
    }
    const newConversationItem = document.getElementById(conversationInfo.id);
    if (newConversationItem) {
      newConversationItem.classList.add('active-conversation');
    }

    // update model.activeConversation
    model.updateActiveConversation(conversationInfo);

    // clear + re-render messages
    const messageContainer = document.getElementById(`message-container`);
    messageContainer.innerText = '';
    model.activeConversation.messages.forEach((message) => {
      if (message.user === model.logInUser.email) {
        view.sendMessage('', message.content);
      } else {
        view.sendMessage(message.user, message.content);
      }
    });
  };
  conversationItem.addEventListener('click', changeActiveConversation);

  const conversationContainer = document.getElementById('conversation-container');
  if (conversationContainer) {
    conversationContainer.appendChild(conversationItem);
  }
};
