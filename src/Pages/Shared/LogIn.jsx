import React, { use, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../public/firebase.init";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  document.title = "LogIn";
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState([""]);
  const emailRef = useRef();
  const { signInUser, user, GoogleSignIn } = use(AuthContext);
  const navigate = useNavigate();

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    setError("");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("A password reset email has been sent");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: "https://i.ibb.co/W4sVBFSb/download-5.jpg",
          role: "user",
        };

        // Save to MongoDB
        axios
          .post("http://localhost:3000/users", newUser)
          .then((res) => {
            console.log("Google user saved to DB:", res.data);
          })
          .catch((error) => {
            console.error("Error saving Google user:", error);
          });

        Swal.fire({
          title: "SignIn Successful !!!",
          icon: "success",
          draggable: true,
        });

        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
        Swal.fire({
          title: "SignIn Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      Swal.fire({
        icon: "error",
        title: "Oops....",
        text: "Must have uppercase letter!!!",
      });
      return;
    }
    if (!hasLowerCase) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must have lower case leter!!!",
      });
      return;
    }
    if (!isLongEnough) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must have at least 6 characters!!!",
      });
      return;
    }

    signInUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "SignIn Successful !!!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <>
      {user ? (
        <h1 className="text-[60px] font-bold text-center mt-40">
          You are already logged in !!!
        </h1>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center mt-14 mb-12 mx-4 gap-6">
          <div className="card bg-base-300 p-8 max-w-sm w-full shadow-2xl">
            <h1 className="text-2xl font-bold mx-auto">Login now!</h1>
            <div className="card-body">
              <form onSubmit={handleLogIn}>
                <label className="label">Email</label>
                <input
                  type="email"
                  ref={emailRef}
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div onClick={handleForgetPassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4 ml-24">Login</button>
              </form>
              <div className="divider">OR</div>
              <button
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p>
                New to the website? Please{" "}
                <Link className="text-blue-700" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden md:block w-[400px]">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
