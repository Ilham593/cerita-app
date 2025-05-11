import RegisterPresenter from "../../presenter/register-presenter";
export default class RegisterPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Register</h1>
        <form id="register-form">
          <label for="name">Nama</label>
          <input type="text" id="name" required />

          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Daftar</button>
        </form>
        <div id="register-message"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter(this);

    const form = document.querySelector('#register-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      this.#presenter.register(name, email, password);
    });
  }

  onRegisterSuccess() {
    const message = document.getElementById('register-message');
    message.style.color = 'green';
    message.textContent = 'Registrasi berhasil! Silakan login.';
    location.hash = '#/login';
  }

  onRegisterError(errorMessage) {
    const message = document.getElementById('register-message');
    message.style.color = 'red';
    message.textContent = 'Gagal daftar: ' + errorMessage;
  }
}
