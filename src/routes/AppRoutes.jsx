import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { GeneralLayout } from '../layouts/GeneralLayout'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { AuthContext } from '../contexts/AuthContext'

export const AppRoutes = () => {
  //Instancia de reducer
  const { state, checkToken } = useContext(AuthContext);
  const isLogged = state.isLogged;//Leo lo que hay dentro del state de AuthContext
  useEffect(() => {
    checkToken();
  }, [])
  return (
    <Routes>
        <Route path='/auth/*' element={<PublicRoutes isLogged={isLogged}><AuthLayout /></PublicRoutes>}/>
        <Route path='/*' element={<PrivateRoutes isLogged={isLogged}><GeneralLayout /></PrivateRoutes>} />
    </Routes>
  )
}
