import React from 'react'
import {DefaultLayout} from '../layout/DefaultLayout.comp'
import { LandingPage } from '../../pages/LandingPage/LandingPage.page';

const isAuth = true

export const PrivateRoute = ({children, ...rest}) => {
  return (isAuth ? <DefaultLayout>{children}</DefaultLayout>:<LandingPage/>)
}