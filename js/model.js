const model = {};

model.logInUser = undefined;
model.activeConversation = undefined;

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

model.saveMessage = (messageContent) => {
  if (messageContent) {
    const newMessageObj = {
      content: messageContent,
      user: model.logInUser.email,
      createdAt: new Date(),
    };

    // save to firestore
    const db = firebase.firestore();
    db.collection('conversations')
      .doc('PssIk7btqvvxEfjgJfNT')
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMessageObj),
      });
  }
};

model.loadConversations = () => {
  const db = firebase.firestore();

  const handleDocumentChange = (doc) => {
    // render message

    // check model.activeConversation
      // undefined => render all messages + assign model.activeCOnversation
      // !== undefined => render last message
    const conversationNewData = doc.data();
    if (model.activeConversation) {
      // render last message
      const lastMessage = conversationNewData.messages[conversationNewData.messages.length - 1];
      
      const isOwnMessage = lastMessage.user === model.logInUser.email;
      if (isOwnMessage) {
        view.sendMessage('', lastMessage.content);
      } else {
        view.sendMessage(lastMessage.user, lastMessage.content);
      }
    } else {
      model.activeConversation = conversationNewData;

      for (let i = 0; i < conversationNewData.messages.length; i += 1) {
        const message = conversationNewData.messages[i];
        // check own message
        const isOwnMessage = message.user === model.logInUser.email;

        if (isOwnMessage) {
          view.sendMessage('', message.content);
        } else {
          view.sendMessage(message.user, message.content);
        }
      }
    }
  };

  // get data + display message
  db.collection('conversations').doc('PssIk7btqvvxEfjgJfNT')
    .onSnapshot(handleDocumentChange);
  // listen for change
};