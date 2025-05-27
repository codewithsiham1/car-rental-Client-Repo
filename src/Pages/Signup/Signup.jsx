import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import signuplottie from "../../assets/lottie/Animation - 1748258523690.json";
import { toast } from 'react-toastify';
import Authcontext from '../../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import auth from '../../Firebase/Firebase';
import { FcGoogle } from "react-icons/fc"; // Optional: Google Icon

const Signup = () => {
    const { createuser, loading, googleLogin } = useContext(Authcontext);
    const navigate = useNavigate();

    const handlesignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must include at least 1 uppercase, 1 lowercase and be 6 characters long.");
            return;
        }

        createuser(email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: username,
                    photoURL: photo,
                });
            })
            .then(() => auth.currentUser.reload())
            .then(() => {
                toast.success("Account created successfully!");
                form.reset();
                navigate('/');
            })
            .catch(error => {
                console.error(error.message);
                toast.error(error.message);
            });
    };

    const handleGoogleSignup = () => {
        googleLogin()
            .then(result => {
                toast.success("Signed up with Google!");
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen gap-10 px-4 flex-col lg:flex-row">
            {/* Lottie Animation */}
            <div className="w-full max-w-sm">
                <Lottie animationData={signuplottie} loop={true} />
            </div>

            {/* Signup Form */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handlesignup}>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Username</span></label>
                        <input type="text" name="username" placeholder="Username" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="text" name="photo" placeholder="Enter Your Image" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email Address</span></label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>

                {/* 🔹 Google Signup Button */}
                <div className="px-8 pb-4 text-center">
                    <button
                        onClick={handleGoogleSignup}
                        className="btn btn-outline w-full flex justify-center items-center gap-2"
                    >
                        <FcGoogle className="text-xl" /> Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;

