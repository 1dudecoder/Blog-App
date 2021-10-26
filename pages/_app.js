import '../styles/globals.css'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import {useEffect, useState} from 'react'
import { auth } from '../firebase'

function MyApp({ Component, pageProps }) {

  const [user, setuser] = useState(null)

  useEffect((e)=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setuser(user);
      }else{
        setuser(null);
      }
    })
  },[])

  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />    
    </Head>
    <NavBar user={user}/>
    <Component {...pageProps} user={user} />
  </>
  )

}

export default MyApp
