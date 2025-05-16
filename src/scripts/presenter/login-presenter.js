import { loginUser } from "../data/api";

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async login(email, password) {
    try {
      const result = await loginUser(email, password);

      localStorage.setItem('authToken', result.loginResult.token);
      this.#view.showSuccessMessage('Login berhasil!');

      setTimeout(() => {
        window.updateNav?.();
        location.hash = '#/';
      }, 1000);
    } catch (error) {
      this.#view.showErrorMessage(error.message);
    }
  }
}
