const model = {};

model.logInUser = undefined;
model.activeConversation = undefined;
model.conversations = undefined;

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

  const handleCollectionChange = (querySnapshot) => {
    if (!model.conversations) {
      // render message
      const conversations = [];
      querySnapshot.forEach((doc) => {
        const docInfo = doc.data();
        docInfo.id = doc.id;

        conversations.push(docInfo);
      });
      model.conversations = conversations;

      model.activeConversation = model.conversations[0];

      // render conversation list
      model.conversations.forEach((conversation) => {
        view.renderConversationItem(conversation);
      });

      // render message
      model.activeConversation.messages.forEach((message) => {
        if (message.user === model.logInUser.email) {
          view.sendMessage('', message.content);
        } else {
          view.sendMessage(message.user, message.content);
        }
      });
    } else {
      const modifiedConversations = [];
      querySnapshot.forEach((doc) => {
        const conversation = doc.data();
        conversation.id = doc.id;

        modifiedConversations.push(conversation);
      });

      modifiedConversations.forEach((modifiedConversation) => {
        let isNewConversation = true;

        for (let i = 0; i < model.conversations.length; i += 1) {
          if (model.conversations[i].id === modifiedConversation.id) {
            model.conversations[i] = modifiedConversation;
            isNewConversation = false;

            if (modifiedConversation.id === model.activeConversation.id) {
              const newMessage = modifiedConversation.messages[modifiedConversation.messages.length - 1];

              if (newMessage.user === model.logInUser.email) {
                view.sendMessage('', newMessage.content);
              } else {
                view.sendMessage(newMessage.user, newMessage.content);
              }
            }

            break;
          }
        }

        if (isNewConversation) {
          model.conversations.push(modifiedConversation);
        }
      });
    }
  };

  // get data + display message
  db.collection('conversations')
    .where('users', 'array-contains', model.logInUser.email)
    .onSnapshot(handleCollectionChange);
  // listen for change
};

model.clearActiveConversation = () => {
  model.activeConversation = undefined;
};

model.createNewConversation = (conversationInfo) => {
  // build newConversation
  const newConversation = {
    name: conversationInfo.conversationName,
    createdAt: new Date(),
    messages: [],
    users: [
      model.logInUser.email,
      conversationInfo.friendEmail,
    ],
  };

  // save to firestore
  const db = firebase.firestore();
  db.collection('conversations').add(newConversation);

  // move user back to chat screen
  model.clearActiveConversation();
  view.setActiveScreen('chat');
};

model.updateActiveConversation = (newActiveConversation) => {
  model.activeConversation = newActiveConversation;
};