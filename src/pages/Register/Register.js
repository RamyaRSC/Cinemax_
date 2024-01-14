import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; //Import the Font Awesome CSS
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";

export default function Register(){
  const [signUp, setSignUp] = useState(false)

  if (signUp) {
    console.log(signUp)
    return (
      <SignUp setSignUp={setSignUp}/>
    ) 
  } else {
    return (
      <SignIn setSignUp={setSignUp}/>
    )
  }
}

function SignIn({setSignUp}) {
    return(
      <>
        <Navbar />
        <div className="login-page">
          <div className="form">
            <form className="login-form">
            
              <div className="inputContainer">
                <i class="fa fa-user" aria-hidden="true"></i>
                <input type="text" placeholder="username"/>
              </div>

              <div className="inputContainer">
                <i className="fa fa-lock"></i>
                <input type="password" placeholder="password"/>
              </div>
              
              <button>signin</button>
              <p className="message">Not registered? <span onClick={ () => setSignUp(true)}>Create an account</span></p>
            </form>
          </div>
        </div>
      </>
  )
}

function SignUp({setSignUp}) {
  return(
    <>
      <Navbar />
      <div className="login-page">
        <div className="form">
          <form className="register-form">
            <div className="inputContainer">
              <i class="fa fa-user" aria-hidden="true"></i>
              <input type="text" placeholder="name"/>
            </div>
            
            <div className="inputContainer">
            <i className="fa fa-lock" />
              <input type="password" placeholder="password"/>
            </div>
            
            <div className="inputContainer">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input type="text" placeholder="email address"/>
            </div>

            <button>create</button>
            <p className="message">Already registered? <span onClick={ () => setSignUp(false)}>Sign In</span></p>
          </form>
        </div>
      </div>
    </>
  )
}