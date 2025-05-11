import { registerUser } from "../data/api";

export default class RegisterPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async register(name, email, password) {
    try {
      await registerUser(name, email, password);
      this.#view.onRegisterSuccess();
    } catch (error) {
      this.#view.onRegisterError(error.message);
    }
  }
}