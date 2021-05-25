import {parseCookies} from 'nookies'
import Image from 'next/image'
import {useRouter} from 'next/router'
import cookie from 'js-cookie'

const Home = (props) => {

  const router =  useRouter();
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
                <h4>Users Listing!</h4>
                {
                  props.users.length > 0 ?
                  <ul className="collection">
                      <li>
                          <table>
                              <thead>
                                  <tr>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Mobile</th>
                                  </tr>
                              </thead>
                              <tbody>
                                      {props.users.map(item=>{
                                          return(
                                              <tr key={item._id}>
                                                  <td>{item.name}</td>
                                                  <td>{item.email}</td>
                                                  <td>{item.mobile}</td>
                                              </tr>  
                                          )
                                      })}
                              </tbody>
                          </table>
                      </li>
                  </ul>
                  :
                  <h4 className="red">No records found!</h4>
                }

                <button 
                  className="btn waves-effect waves-light black"
                  onClick={()=>{
                    cookie.remove('token')
                    cookie.remove('userdata')
                    router.push('/login')
                  }} 
                >Logout</button>
            </div>
            </div>
  )
}

export async function getServerSideProps(context) {

  const {token} = parseCookies(context)

  if(!token){
      const {res} = context
      res.writeHead(302,{Location:'/login'})
      res.end()
  }

  const res = await fetch(`http://localhost:3000/api/user`, {
    method:'GET',
    headers:{
      'requestType':'getUsers'
    }
  });
  const data = await res.json();
  return {
    props: {users:data},
  }
}

export default Home;