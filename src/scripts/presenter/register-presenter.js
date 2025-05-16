import { registerUser } from "../data/api";

export default class RegisterPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async register(name, email, password) {
    try {
      await registerUser(name, email, password);
      this.#view.showSuccessMessage('Registrasi berhasil! Silakan login.');
      setTimeout(() => this.#view.redirectToLogin(), 1000);
    } catch (error) {
      this.#view.showErrorMessage(error.message);
    }
  }
}
