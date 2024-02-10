export interface LoginDto {
    email: string;
    password: string;
}

export interface RefreshTokenDto {
    refresh_token: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}