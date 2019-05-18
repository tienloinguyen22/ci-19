const components = {
  createConversation: `
    <div id='create-conversation-screen'>
      <div id='header'>
        Techkids Chat
      </div>

      <div id='create-form-container'>
        <h2>Create new conversation</h2>

        <form id='create-conversation-form'>
          <div class='input-wrapper'>
            <input
              class='input'
              type='text'
              name='conversationName'
              placeholder='Conversation name'
            />
            <div
              class='error-message'
              id='conversation-name-error-message'
            >
            </div>
          </div>

          <div class='input-wrapper'>
            <input
              class='input'
              type='text'
              name='friendEmail'
              placeholder="Your friend's email"
            />
            <div
              class='error-message'
              id='friend-email-error-message'
            >
            </div>
          </div>

          <div id='buttons-group'>
            <input
              class='button'
              type='submit'
              value='Create conversation'
            />
            <button
              id='cancle-create-conversation'
              class='secondary-button'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  chat: `
    <div id='chat-screen'>
      <div id='header'>
        Techkids Chat
      </div>

      <div id='chat-parent'>
        <div id='conversation-list'>
          <div id='create-conversation'>
            <button class='button' id='create-conversation-button'>+ Add conversation</button>
          </div>
          <div id='conversation-container'>
            <div class='conversation-item'>Conversasion abc</div>
            <div class='conversation-item'>Conversasion 123</div>
            <div class='conversation-item'>Conversasion zxc</div>
          </div>
        </div>

        <div id='chat-container'>
          <div id='conversation-name'>
            Techkids Chat
          </div>

          <div id='message-container'>

          </div>

          <form id='input-message'>
            <input
              id='message'
              type='text'
              placeholder='Enter your message ...'
              name='message'
            />
            <input type='submit' value='Send' id='submit' />
          </form>
        </div>
      </div>
    </div>
  `,
  message: `
    <div id='message-content' class='message-content'>
      <div id='sender' class='sender'></div>
      <div id='content' class='content'></div>
    </div>
  `,
  index: `
    <div>
      <div id='display-name'></div>
      <div id='email'></div>
    </div>
  `,
  register: `
    <div id='register-screen'>
      <div id='register-screen-content'>
        <div id='logo'>
          <h1>Techkids Chat</h1>
        </div>

        <div id='register-form'>
          <form id='form-wrapper'>
            <div id='name-wrapper'>
              <div class='input-wrapper'>
                <input
                  class='input'
                  type='text'
                  name='firstName'
                  placeholder='First name'
                />
                <div class='error-message' id='firstName-error-message'></div>
              </div>

              <div class='input-wrapper'>
                <input
                  class='input'
                  type='text'
                  name='lastName'
                  placeholder='Last name'
                />
                <div class='error-message' id='lastName-error-message'></div>
              </div>
            </div>

            <div class='input-wrapper'>
              <input
                class='input'
                type='text'
                name='email'
                placeholder='Email address'
              />
              <div class='error-message' id='email-error-message'></div>
            </div>

            <div class='input-wrapper'>
              <input
                class='input'
                type='password'
                name='password'
                placeholder='Password'
              />
              <div class='error-message' id='password-error-message'></div>
            </div>

            <div class='input-wrapper'>
              <input
                class='input'
                type='password'
                name='confirmPassword'
                placeholder='Confirm password'
              />
              <div class='error-message' id='confirm-error-message'></div>
            </div>

            <div id='form-footer'>
              <span>Already have an account? Login</span>
              <input class='button' type='submit' value='Register' />
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  login: `
    <div id='login-screen'>
      <div id='login-screen-content'>
        <div id='logo'>
          <h1>Techkids Chat</h1>
        </div>

        <div id='login-form'>
          <form id='form-wrapper'>
            <div class='input-wrapper'>
              <input
                class='input'
                type='text'
                name='email'
                placeholder='Email address'
              />
              <div class='error-message' id='email-error-message'></div>
            </div>

            <div class='input-wrapper'>
              <input
                class='input'
                type='password'
                name='password'
                placeholder='Password'
              />
              <div class='error-message' id='password-error-message'></div>
            </div>

            <div id='form-footer'>
              <span id='create-account-button'>Create an account</span>
              <input class='button' type='submit' value='Log In' />
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
};