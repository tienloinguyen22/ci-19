const view = {};

view.setActiveScreen = () => {
  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = components.index;
  }
};
