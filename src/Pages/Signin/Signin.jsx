import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import loginlottie from "../../assets/lottie/Animation - 1748257647504.json";
import { Link, useNavigate } from 'react-router-dom';
import Authcontext from '../../Context/Authcontext';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc"; // Optional icon

const Signin = () => {
    const { signInuser, setloading, loading, googleLogin } = useContext(Authcontext);
    const navigate = useNavigate();

    const handlesignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInuser(email, password)
            .then(result => {
                toast.success("Login successful!");
                form.reset();
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                toast.success("Logged in with Google!");
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => {
                setloading(false);
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen gap-10 px-4 flex-col lg:flex-row">
            {/* Lottie Animation */}
            <div className="w-full max-w-sm">
                <Lottie animationData={loginlottie} loop={true} />
            </div>

            {/* Login Form */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handlesignIn}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="input input-bordered"
                            required
                        />
                        <label className="label">
                            <Link to="/forgot-password" className="label-text-alt link link-hover">
                                Forgot password?
                            </Link>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>

                {/* 🔹 Google Login Button */}
                <div className="px-8 pb-4 text-center">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full flex justify-center items-center gap-2"
                    >
                        <FcGoogle className="text-xl" /> Login with Google
                    </button>
                </div>

                {/* Signup Link */}
                <Link
                    to="/sign-up"
                    className="text-xs text-gray-500 uppercase hover:underline block mt-4 text-center"
                >
                    or sign up
                </Link>
            </div>
        </div>
    );
};

export default Signin;
