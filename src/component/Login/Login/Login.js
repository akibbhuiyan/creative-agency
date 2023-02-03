import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../images/logos/logo.png";
import "./Login.css";
import { AuthContext } from "../../Context/UserContext";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from "../FirebaseConfig/Firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Breadcrumb } from "react-bootstrap";
import ReactPasswordChecklist from "react-password-checklist";

initializeApp(firebaseConfig);
const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { signIn, createUser, updateName, setUser, googleSignIn } =
    useContext(AuthContext);

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const goofleUserInfo = {
          name: displayName,
          email: email,
          photourl: photoURL,
        };
        goofleUserInfo.error = "";
        goofleUserInfo.success = true;
        setUser(goofleUserInfo);
        toast("Sign in Succesfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error, error.message);
      });
  };
  const onSubmit = (data, event) => {
    const form = event.target;
    const email = data.email;
    const password = data.password;
    const confirmPass = data.confirmPassword;
    const name = data.name;
    if (newUser) {
      if (password.length < 6 && confirmPass.length < 6) {
        setError("*Password Must be 6 character or more!");
        return;
      }
      if (password !== confirmPass) {
        setError("*Password did not match!");
        return;
      }
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          updateName(name);
          setUser(user);
          toast("User Created!");
          form.reset();
          navigate(from, { replace: true });
        })
        .catch((err) => console.log(err));
    }

    if (!newUser) {
      signIn(email, password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          toast("Logged in successfully!");
          form.reset();
          navigate(from, { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Link to="/home">
          <img src={logo} alt="" width="150px" />
        </Link>
        <div className="loginForm d-flex flex-column text-center mt-5">
          <Breadcrumb title="Login & Register" currentPage="Login & Register" />
          <section className="login-register-area">
            <div className="row g-5">
              <div className="col-lg-8 mx-auto">
                <div className="login-form-box">
                  <h3>{newUser ? "Register" : " Login"}</h3>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="login-form"
                  >
                    {newUser && (
                      <input {...register("name")} placeholder="Full Name" />
                    )}

                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="Username or Email"
                    />
                    {errors.email && <span>This field is required</span>}
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span>This field is required</span>}
                    {newUser && (
                      <>
                        <input
                          {...register("confirmPassword", { required: true })}
                          placeholder="Confirm Password"
                          type="password"
                          onChange={(e) => setPasswordAgain(e.target.value)}
                        />
                        <p>{error}</p>
                      </>
                    )}
                    {newUser ? (
                      <div className="comment-form-checkbox">
                        <input
                          type="checkbox"
                          {...register("termCheckbox", { required: true })}
                        />
                        <label htmlFor="termCheckbox">
                          I read & agree the terms & conditions.
                        </label>
                      </div>
                    ) : (
                      <div className="comment-form-checkbox">
                        <input type="checkbox" {...register("rememberme")} />
                        <label htmlFor="rememberme">Remember Me</label>
                      </div>
                    )}
                    <input
                      type="submit"
                      className="main-btn"
                      value={newUser ? "Register" : "LogIn"}
                    />
                    {newUser ? (
                      <p>
                        Already Have an Account?
                        <a onClick={() => setNewUser(!newUser)}>Log In</a>
                      </p>
                    ) : (
                      <p>
                        New to Creative Agency?
                        <a onClick={() => setNewUser(!newUser)}>SignUp</a>
                      </p>
                    )}
                    {newUser && (
                      <ReactPasswordChecklist
                        rules={["minLength", "number", "match"]}
                        minLength={5}
                        value={password}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {}}
                      />
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
          <button onClick={handleGoogleLogin} className="btn goggole_Login">
            {" "}
            <FcGoogle />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
