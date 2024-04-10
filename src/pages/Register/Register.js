import { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; //Import the Font Awesome CSS
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import { addusertodatabase, checkUser, createUser, signInUser } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../Context/AuthContext";
import GoogleImg from "../../Images/google.svg"

export default function Register(){
  const [signInChecker, setSignInChecker] = useState(false)
  const [signUp, setSignUp] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser(setSignInChecker)
  }, [])

  if (signInChecker){
    navigate("/home")
  } else {
    return (
      signUp ? <SignUp setSignUp={setSignUp} /> : <SignIn setSignUp={setSignUp} />
    );
  }  
}

function SignIn({setSignUp}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    signInUser(email, password)
  }

  const {googleSignIn} = UserAuth();

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
      <Navbar />
      <div className="login-page">
        <div className="form">
          <form className="login-form">
          
            <div className="inputContainer">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="inputContainer">
              <i className="fa fa-lock"></i>
              <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            
            <button onClick={(e) => handleSubmit(e)}>signin</button>
            <div className="inputContainer">
              <img src={GoogleImg} alt="Google Image" className="googleImg" />
              <button onClick={handleGoogleSignIn} className="googleButton" style={{marginBottom: '0px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}>Sign up with Google</button>
            </div>
            <p className="message">Not registered? <span onClick={ (e) => setSignUp(true)}>Create an account</span></p>
          </form>
        </div>
      </div>
    </>
  )
}

function SignUp({setSignUp}) {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    await createUser(userName, email, password)
    console.log('user created')
    // addusertodatabase()
  }

  const {googleSignIn} = UserAuth();

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  console.log("hi")

  return(
    <>
      <Navbar />
      <div className="login-page">
        <div className="form">
          <form className="register-form">
            <div className="inputContainer">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input type="text" placeholder="name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>

            <div className="inputContainer">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <input type="email" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value) }/>
            </div>
            
            <div className="inputContainer">
            <i className="fa fa-lock" />
              <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button onClick={(e) => handleSubmit(e)}>create</button>

            <div className="inputContainer">
              <img src={GoogleImg} alt="Google Image" className="googleImg" />
              <button onClick={handleGoogleSignIn} className="googleButton" style={{marginBottom: '0px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}>Sign up with Google</button>
            </div>


            <p className="message">Already registered? <span onClick={ () => setSignUp(false)}>Sign In</span></p>
          </form>
        </div>
      </div>
    </>
  )
}