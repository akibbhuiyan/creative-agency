import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../../images/logos/logo.png';
import './Login.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from '../FirebaseConfig/Firebase.config';
import { UserContext } from '../../../App';
import { Link, useNavigate } from "react-router-dom";

initializeApp(firebaseConfig)
const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        error: '',
        photourl: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let navigate = useNavigate();

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                const goofleUserInfo = {
                    name: displayName,
                    email: email,
                    photourl: photoURL
                }
                goofleUserInfo.error = '';
                goofleUserInfo.success = true;
                setUser(goofleUserInfo)
                setLoggedInUser(goofleUserInfo)
                navigate(-2, { replace: true });


            }).catch((error) => {
                console.log(error, error.message);
            });
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column' >
            <Link to='/home'><img src={logo} alt="" width='150px' /></Link>
            <form className="loginForm d-flex flex-column text-center mt-5">
                <h2>Login With</h2>
                <button onClick={handleGoogleLogin} className="btn goggole_Login"> <FcGoogle /><span>Continue with Google</span></button>
                <span>Don’t have an account? <a href='#'>Create an account</a></span>
            </form>
        </div>
    );
};

export default Login;