import { LocalStorage } from "../api/local-storage";
import backendApi from "../services/backend-api";

export async function logout() {
  try {
    const tokens = LocalStorage.getTokens();
    await backendApi.auth.logout(tokens);
    LocalStorage.deleteTokens();
    LocalStorage.deleteUserData();
  } catch (error) {
    console.log(error)

    throw new Error(error);
  }
}
