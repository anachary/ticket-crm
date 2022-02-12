import React from 'react'
import { Header } from './Partials/Header.comp'
import {Footer} from './Partials/Footer.comp'

export const DefaultLayout = ({children}) => {
  return (
    <div className='default-layout'>
       <header className='header'>
        <Header></Header>
       </header>
       <main className="main">
          {children}
       </main>
        <footer className='footer'>
        <Footer></Footer>
        </footer>
    </div>
  )
}
