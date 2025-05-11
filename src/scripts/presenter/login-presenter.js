import { loginUser } from "../data/api";


export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async login(email, password) {
    try {
      const result = await loginUser(email, password);
      this.#view.onLoginSuccess(result);
    } catch (error) {
      this.#view.onLoginError(error.message);
    }
  }
}