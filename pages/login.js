import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import cookie from 'js-cookie'
import Image from 'next/image'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const loginUser = async (e) =>{
        e.preventDefault()

        const res = await fetch(`http://localhost:3000/api/user`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "requestType": "loginUser"
            },
            body:JSON.stringify({
                email,
                password
            })
        })

        const resData = await res.json()

        if(resData.err){
            M.toast({html:resData.err,classes:'red'})
        }else{
            cookie.set('token',resData.token)
            cookie.set('userdata',resData.user)
            M.toast({html:resData.message,classes:'green'})
            router.push('/')
        }
    }

    return (
        <div className="row main-box" >
            <div className="col s7" style={{padding:"0",height:'100vh'}}>
                <Image 
                    src="/page-design-image.png" 
                    alt="me" 
                    layout="responsive"
                    width="100%"
                    height="100%" 
                />
            </div>
            <div className="col s5 center">
                <h4>Welcome Back!</h4>
                <p>Please login in to your account</p>
                <form className="form-des" onSubmit={(e)=>loginUser(e)}>
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="validate"
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button className="btn waves-effect waves-light" type="submit">Login
                    </button>
                    <Link href="/register"><a><h5>Don't have an Account ?</h5></a></Link>
                </form>
            </div>
        </div>
    )
}

export default Login
