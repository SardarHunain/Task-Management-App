import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        fullname: ""
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/register", {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                fullname: userData.fullname,
            });
            console.log("Registration Completed! Now login.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="mt-1 p-3 w-full border-slate-950 rounded-md"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 p-3 w-full border-gray-300 rounded-md"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="mt-1 p-3 w-full border-gray-300 rounded-md"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullname"
                            type="text"
                            autoComplete="name"
                            required
                            className="mt-1 p-3 w-full border-gray-300 rounded-md"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                    <Link to="/Login" className="text-blue-500 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
