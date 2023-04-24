export const AUTH = 'AUTH'

export interface IUserInfo {
    login: string
}

export interface IAuthState {
    isAuth: boolean
    login: string
}

export interface IAuthCheckAction {
    type: typeof AUTH
    payload: {
        login: string
    }
}
