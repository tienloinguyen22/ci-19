const components = {
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