export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginErrors {
  credentials: boolean;
  username: UsernameErrors;
  password: PasswordErrors;
}

export interface UsernameErrors {
  required: boolean;
}

export interface PasswordErrors {
  required: boolean;
}
