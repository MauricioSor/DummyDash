export const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,//SIEMPRE se debe llenar el estado
                user: action.payload.user,//Lleno el user desde los datos de la accion
                isLogged: true,//Seteo el estado
                token: action.payload.token,//Lleno el user desde los datos de la accion
            }
        case 'LOGOUT':    
            return {
                //En este caso se limpia el state
                ...state,
                user: null,
                isLogged: false,
                token: '',
                
            }
        case 'ERROR-MESSAGE':
            return {
                ...state,
                message: action.payload.msg,
            }
        case 'RECOVERY':
            return {
                newPassword: action.payload.newpassword
            }
        default:
            return state;
    }
}