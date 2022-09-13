import React, {useState} from 'react';
import "./auth.css"
import {AiFillLock, AiFillEye} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {signin, signup} from "../../actions/auth";
import {useDispatch} from "react-redux"
function Auth() {

    const [isSignup, setIsSignup] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
    const switchMode = ()=>{
        setIsSignup((prevIsSignup)=> !prevIsSignup)
    }

  
    const navigate= useNavigate();
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleChange = (ev) => {
		setValues({
			...values,
			[ev.target.name]: ev.target.value,
		});
	};
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(values, navigate))
        }else{
            dispatch(signin(values, navigate))
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="form-input">
            <div className='locked-div'><AiFillLock className="locked" /></div>
            <div className='auth-header'>{isSignup ? 'Sign Up' : 'Sign In'}</div>
            {
                isSignup && (
                    <>
                        <div className='input-div'>
                            <label >First Name</label>
                            <input type="text" placeholder="First name ..." name="firstName" required value={values.firstName} className='inputfield' onChange={handleChange} />
                        </div>

                        <div className='input-div'>
                            <label >Last Name</label>
                            <input type="text" placeholder="Last name ..." name="lastName"value={values.lastName} required className='inputfield' onChange={handleChange} />
                        </div>
                    </>
                )
            }
            <div className='input-div'>
                <label >Email</label>
                <input type="email" placeholder="email ..." name="email" value={values.email} required className='inputfield' onChange={handleChange} />
            </div>
            <div className='input-div'>
                <label >Password</label>
                <div className='passwordshow'>
                    <input type={passwordShown ? "text" : "password"} placeholder="password ..." name="password"required value={values.password} className='inputfield' onChange={handleChange} />
                    <AiFillEye onClick={togglePassword} className="show-icon" />
                </div>
           </div>
            {
                isSignup && 
                <div className='input-div'>
                        <label >Confirm Password</label>
                        <input type="password"placeholder="confirm password ..." name="confirmPassword"required value={values.confirmPassword} className='inputfield' onChange={handleChange} />
                            
                </div>
            }

            <div className='submit-div'>
                <button className='submitButton' type="submit">
                    {isSignup ? 'Sign Up' : "Sign In"}
                </button>
            </div>
            

            <div className='btn-div'>
                <button onClick={switchMode} className="button-text">
                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account?  Sign Up" }
                </button>
            </div>
        </form>
    </div>
  )
}

export default Auth