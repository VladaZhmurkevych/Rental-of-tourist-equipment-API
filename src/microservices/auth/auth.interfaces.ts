export interface LoginData {
  username: string;
  password: string;
}

export interface ValidateTokenData {
  token: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  token: string;
  success: boolean;
}
