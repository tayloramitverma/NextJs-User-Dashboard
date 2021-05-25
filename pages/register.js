import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const createUser = async (e) =>{
        e.preventDefault()

        //  using localstorage

       /* const getLocalUsers = localStorage.getItem('users')
        if(getLocalUsers){
            const newuser = {
                name,
                email,
                mobile,
                password
            }
            const data = JSON.parse(getLocalUsers)

            const res = data.some(item => {
                return item.email === email
            })

            if(res){
               return M.toast({html:"You are already registered with email!",classes:'red'})
            }

            data.push(newuser)
            localStorage.setItem('users', JSON.stringify(data))

        }else{
            const users = [];
            const newuser =  {
                name,
                email,
                mobile,
                password
            }
            users.push(newuser)
            localStorage.setItem('users', JSON.stringify(users))
        }*/

        const res = await fetch(`http://localhost:3000/api/user`, {
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "requestType": "createUser"
            },
            body:JSON.stringify({
                name,
                email,
                mobile,
                password
            })
        })

        const resData = await res.json()

        if(resData.err){
            M.toast({html:resData.err,classes:'red'})
        }else{
            M.toast({html:resData.message,classes:'green'})
            router.push('/login')
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
                <h4>Registration!</h4>
                <p>Please register your account</p>
                <form className="form-des" onSubmit={(e)=>createUser(e)}>
                            <input 
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                            <input 
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="validate"
                            />
                            <input 
                                type="text"
                                placeholder="Mobile"
                                value={mobile}
                                onChange={(e)=>setMobile(e.target.value)}
                                className="validate"
                            />
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <button className="btn waves-effect waves-light" type="submit">Register
                            </button>
                            <Link href="/login"><a><h5>Already have an Account ?</h5></a></Link>
                        </form>
            </div>
            </div>
    )
}

export default Register
