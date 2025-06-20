import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput, {
    EmailInput,
    PasswordInput,
    PhoneInput,
    SearchInput,
    TextArea,
} from "../../components/forms/TextInput";
import useAuth from "../../contexts/AuthContext";
import authApi from "../../api/services/authApi";
import { UserIcon } from "../../components/icons/Icons";
import {
    checkLengthInRange,
    checkRequired,
} from "../../utils/validateFunction";
const usernameValidator = (value) => {
    let message =
        checkRequired("Username", value) ||
        checkLengthInRange("Username", value, 8, 20);
    return message;
};

const passwordValidator = (value) => {
    let message = checkRequired("Password", value);
    return message;
};

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await authApi.login(formData);
            const { token, refreshToken } = response.data;

            if (!token || !refreshToken) {
                throw new Error("Invalid response: tokens missing");
            }

            login({ token, refreshToken });
            navigate("/admin");
        } catch (error) {
            console.error("Login failed:", error);

            // Handle different error types
            if (error.response?.status === 401) {
                setErrors({
                    general: "Invalid username or password",
                });
            } else if (error.response?.status === 403) {
                setErrors({
                    general: "Access denied. Admin privileges required.",
                });
            } else {
                setErrors({
                    general: "Login failed. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Admin Login
                    </h1>
                    <p className="text-gray-600">
                        Welcome back! Please sign in to continue.
                    </p>
                </div>

                {/* General Error Message */}
                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm font-medium">
                            {errors.general}
                        </p>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input */}
                    <TextInput
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        // value={}
                        onChangeValid={() => {}}
                        validator={usernameValidator}
                        disabled={isLoading}
                        containerClassName="mb-4"
                        rightIcon={<UserIcon />}
                    />

                    {/* Password Input */}
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        containerClassName="mb-6"
                        validator={passwordValidator}
                    />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
                            w-full py-3 px-4 rounded-lg font-medium text-white
                            transition-all duration-200 focus:outline-none focus:ring-4
                            ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-200"
                            }
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Signing in...
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Forgot your password?{" "}
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            Contact support
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
