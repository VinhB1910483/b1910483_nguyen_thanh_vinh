import type { UserItem } from "@/types/api/system/user";

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.accessToken;
  }

  getLocalTokenExpired() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.tokenExpired;
  }

  updateLocalAccessToken(token: string, tokenExpired: number) {
    let user = JSON.parse(localStorage.getItem("user")!);
    user.accessToken = token;
    user.tokenExpired = tokenExpired;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }

  setUser(user: UserItem) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();