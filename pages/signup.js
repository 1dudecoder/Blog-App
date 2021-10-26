import {useState} from 'react'
import Link from 'next/link'
import {auth} from '../firebase'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function Signup({user}) {
    
    const [email,setemail] = useState('')
    const [password,setpass] = useState('')
    const [name,setname] = useState('')


    const router = useRouter();

    useEffect(()=>{

        user? setTimeout(() => {
            router.push("/");
        },3000) : router.push("/signup");

    },[user])
    
    
    const handlesubmit = async (e)=> {
        e.preventDefault()   //to stop from refresing  the page
        console.log(email,password,name);

        //creating signup process
        try{
            // creating user email and password id already exist throw error
            const result = await auth.createUserWithEmailAndPassword(email,password)
            await result.user.updateProfile({
                //here we can update user details
                displayName:name
            })
            // https://materializecss.com/toasts.html  this is toast
            M.toast({html: 'Welcome pal !',classes:"blue"})  
        }catch(err){
            M.toast({html: err.message,classes:"blue"})
        }
    }

    return (
        <div className="container center">
        <h3>Please signup</h3>
        <form onSubmit={(e)=>{
            handlesubmit(e)
        }}>
            <div className="input-field">
            <input type="text" placeholder="Enter your Name" value={name} onChange={(e)=>{
                    setname(e.target.value)
            }} />
                <input type="Email" placeholder="Enter your Email" value={email} onChange={(e)=>{
                    setemail(e.target.value)
                }} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{
                    setpass(e.target.value)
                }} />
            </div>
            <button type="submit btn" className="btn #3949ab indigo darken-1">Signup</button>
            <Link href="/login"><a><h6>Already have an account ! </h6></a></Link>
        </form>
        </div>
    )
}

export default Signup