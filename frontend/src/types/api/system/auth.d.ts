
export interface UserSignInForm {
  userName: string;
  password: string;
}

export interface UserSignUpForm {
  username: string;
  name?: string;
  lastname?: string;
  email: string;
  password: string;
  roles?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface Captcha {
  img: string;
  uuid: string;
}
