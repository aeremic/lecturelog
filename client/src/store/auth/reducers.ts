import { AUTH, IAuthCheckAction, IAuthState } from "./types"

const initialState: IAuthState = {
    isAuth: false,
    login: '',
}

export function auth(
    state = initialState,
    action: IAuthCheckAction
): IAuthState {
    switch (action.type) {
        case AUTH:
            return Object.assign(
                {},
                {
                    isAuth: true,
                    login: action.payload.login,
                }
            )
        default:
            return state
    }
}
