import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput, { PasswordInput } from "../../components/forms/TextInput";
import useAuth from "../../contexts/AuthContext";
import authApi from "../../api/services/authApi";
import { UserIcon } from "../../components/icons/Icons";
import {
    checkLengthInRange,
    checkRequired,
} from "../../utils/validateFunction";
import Button from "../../components/commons/Button";
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

    // States
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formValid = useRef({
        username: false,
        password: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (Object.values(formValid.current).every((valid) => valid === true)) {
            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData.entries());
            setIsLoading(true);
            authApi
                .login(body)
                .then((response) => {
                    const token = response.data.token;
                    const refreshToken = response.data.token;
                    console.log({ token, refreshToken });
                    login({ token, refreshToken });
                    navigate("/admin");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        onChangeValid={(isValid) => {
                            formValid.current.username = isValid;
                        }}
                        validator={usernameValidator}
                        disabled={isLoading}
                        containerClassName="mb-4"
                        rightIcon={<UserIcon />}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        containerClassName="mb-6"
                        validator={passwordValidator}
                        onChangeValid={(isValid) => {
                            formValid.current.password = isValid;
                        }}
                        isSubmitted={isSubmitted}
                        setIsSubmitted={setIsSubmitted}
                    />

                    <Button
                        isLoading={isLoading}
                        type="submit"
                        variant={"primary"}
                        fullWidth={true}
                    >
                        Login!
                    </Button>
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
