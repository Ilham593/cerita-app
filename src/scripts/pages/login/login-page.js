import LoginPresenter from "../../presenter/login-presenter";

export default class LoginPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Login</h1>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Masuk</button>
        </form>
        <div id="login-message"></div>
        <p style="margin-top: 10px;">Belum punya akun? <a href="#/register">Daftar di sini</a>.</p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter(this);

    const form = document.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      this.#presenter.login(email, password);
    });
  }

  showSuccessMessage(message) {
    const messageEl = document.getElementById('login-message');
    messageEl.style.color = 'green';
    messageEl.textContent = message;
  }

  showErrorMessage(message) {
    const messageEl = document.getElementById('login-message');
    messageEl.style.color = 'red';
    messageEl.textContent = 'Login gagal: ' + message;
  }
}
