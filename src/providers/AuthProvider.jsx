import { AuthContext } from '../contexts/AuthContext';
import { useReducer } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';
import { axiosDash } from '../config/dashAxios';

const initialValues = {
  user: {},
  isLogged: false,
  token: '',
  message: ''
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer/*Llamo al reducer*/, initialValues/*valor inicial */);
  //#region Funciones
  //Funcion login
  const login = async (username, pass) => {
    const { data } = await axiosDash.post('/auth/login', {
      //Toma los datos pasados al llamar la func. login
      username: username, 
      password: pass,
    });
    const objectStorage = {
      //Defino el objeto a guardar
      user: {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
      },
      token: data.token
    }
    sessionStorage.setItem('token', JSON.stringify(objectStorage));//Guardo los datos en el storage
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
        },
        token: data.token
      }
    })
  }
  //Funcion chequeo de sesion
  const checkToken = async () => {
    const dataToken = JSON.parse(sessionStorage.getItem('token')) || "";//Leo el sessionStorage
    //Evaluo dataToken
    if (dataToken== "") {
      dispatch({
        type: 'LOGOUT'//Disparo la accion de logout
      });
    }else{
      dispatch({
        type: 'LOGIN',//Disparo la accion login
        payload: {
          user: {
            id: dataToken.user.id,
            username: dataToken.user.username,
            email: dataToken.user.email,
            firstName: dataToken.user.firstName,
            lastName: dataToken.user.lastName,
            gender: dataToken.user.gender,
          },
          token: dataToken.token
        }
      });
    }
  }
  //Funcion logout
  const logout = () => {
    sessionStorage.removeItem("token");//limpio el storage
    dispatch({
      type: 'LOGOUT',//Disparo la func logout
    })
  }
  //#endregion
  return (
    //Declaro cual sera mi contexto para proveerle las funciones, estados y valores a retornarle
    <AuthContext.Provider value={{
      //Propiedades o valores q heredan los componentes hijos del provider
      //checkToken y logout no reciben nada, login si
      state,
      login,
      logout,
      checkToken
    }}>
    {/* Declaro mis childrens TODOS LOS PROVIDERS DEBEN TENERLO */}
      {children}
    </AuthContext.Provider>
  )
}
