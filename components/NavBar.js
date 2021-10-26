import Link from 'next/link'
import {auth} from "../firebase"
function NavBar({user}) {
    return (
        <div>
        <nav>
        <div className="nav-wrapper #2196f3 blue">
        <Link href="/"><a className="brand-logo">BLOG APP</a></Link>        
        <ul id="nav-mobile" className="right">
            { user? 
            <> 
                <li><Link href="/createblog"><a>Create Blog</a></Link></li> 
                <li> <button className="btn orange" onClick={ ()=> auth.signOut()} >Logout</button></li>
            </> : <> <li><Link href="/signup"><a>Signup</a></Link></li> <li><Link href="/login"><a>Login</a></Link></li> </> 
            }

        </ul>
        </div>
    </nav>

    <style> 
    {
    `
    @media screen and (min-width: 600px) {
        a.brand-logo{
        margin-left: 30px;
        }
        .btn.orange{
            margin-right: 30px;
        }

    }

    `
    
    }</style>

        </div>
    )

}

export default NavBar
