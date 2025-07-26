import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/signup.json";
import { AuthContext } from "../../Contexts/AuthContext";
import axios from "axios";

const Register = () => {
  document.title = "Register";
  const navigate = useNavigate();
  const { createUser, update, GoogleSignIn } = use(AuthContext);

  const [preview, setPreview] = useState(null);

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: "https://i.ibb.co/W4sVBFSb/download-5.jpg",
          role: "user",
          watchlist: [], // ✅ Added
        };

        // Save to MongoDB
        axios
          .post("https://local-market-server-eight.vercel.app/users", newUser)
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoFile = e.target.photo.files[0];

    const formData = new FormData();
    formData.append("image", photoFile);

    try {
      // Upload image to imgbb
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=2e79cf578ef259716600ff8aa838ef9a`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const photoURL = data.data.url;

      createUser(email, password)
        .then(() => {
          console.log("User created in Firebase");

          update(name, photoURL)
            .then(() => {
              Swal.fire({
                title: "Signup Successful !!!",
                icon: "success",
                draggable: true,
              });

              // Inside update() success block of handleRegister
              const userInfo = {
                name,
                email,
                photoURL,
                role: "user",
                watchlist: [], // ✅ Added
              };

              //  Save user in MongoDB via Axios
              axios
                .post(
                  "https://local-market-server-eight.vercel.app/users",
                  userInfo
                )
                .then((res) => {
                  console.log("User saved to MongoDB:", res.data);
                })
                .catch((err) => {
                  console.error("Failed to save user to MongoDB:", err);
                });

              navigate("/");
            })
            .catch(() => {
              Swal.fire({
                title: "Ooopss Signup Unsuccessful !!!",
                icon: "error",
                draggable: true,
              });
            });
        })
        .catch((error) => {
          console.error("Firebase signup failed:", error);
          Swal.fire({
            title: "Signup failed",
            text: error.message,
            icon: "error",
          });
        });
    } catch (err) {
      console.error("Image upload failed", err);
      Swal.fire({
        title: "Image upload failed",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-20 mb-20 mx-4 gap-6">
      <div className="card bg-base-300 p-8 max-w-sm w-full shadow-2xl">
        <h1 className="text-2xl font-bold mx-auto">Register now!</h1>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              name="name"
            />
            <label className="label">Email</label>
            <input
              type="email"
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
              pattern="^(?=.*[A-Z])(?=.*[a-z]).{6,}$"
              title="Password must be at least 6 characters, with at least one uppercase and one lowercase letter."
            />
            <label className="label">Upload Photo</label>
            <input
              type="file"
              className="file-input"
              name="photo"
              accept="image/*"
              onChange={(e) =>
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 mt-2 rounded mx-auto"
              />
            )}
            <button className="btn btn-neutral mt-4 ml-20">Register</button>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            class="btn bg-white text-black border-[#e5e5e5]"
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
            Already Have an Account?
            <Link className="text-blue-700" to="/login">
              LogIn
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block w-[400px]">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Register;
