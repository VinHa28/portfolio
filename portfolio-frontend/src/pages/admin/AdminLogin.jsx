import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "api/services/authApi";
import { useToast } from "hooks/useToast";
import useAuth from "contexts/AuthContext";
import TextInput, { PasswordInput } from "components/forms/TextInput";
import { UserIcon } from "components/icons/Icons";
import Button from "components/commons/Button";
import Toast, { ToastContainer } from "components/commons/Toast";
import { checkLengthInRange, checkRequired } from "utils/validateFunction";
import { useEffect } from "react";
import { EmailInput } from "../../components/forms/TextInput";
import { checkEmailFormat, checkMaxLength } from "../../utils/validateFunction";
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

const emailValidator = (value) => {
    let message =
        checkRequired("Email", value) || checkEmailFormat("Email", value);
    return message;
};

const otpValidator = (value) => {
    let message = checkRequired("OTP", value) || checkMaxLength("OTP", value);
    return message;
};

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { toasts, removeToast, showToast } = useToast();

    // States
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittedEmail, setIsSubmittedEmail] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoginEmail, setIsLoginEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSentOtp, setIsSentOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [containerClass, setContainerClass] = useState(
        "bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100"
    );
    const formValid = useRef({
        username: false,
        password: false,
    });
    const emailValid = useRef(false);
    const otpValid = useRef(false);

    // Handlers
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
                    login({ token, refreshToken });
                    navigate("/admin");
                })
                .catch((error) => {
                    showToast.error(error?.response?.data?.message, {
                        position: "top-center",
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleSendOtp = async () => {
        setIsSubmittedEmail(true);
        if (emailValid.current) {
            setIsLoading(true);
            authApi
                .requestOtp({ email })
                .then((response) => {
                    setIsSentOtp(true);
                    showToast.success(response?.data?.message, {
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    showToast.error(error?.response?.data?.message, {
                        position: "top-center",
                        className: "min-w-60",
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleVerifyOtp = () => {
        setIsSubmittedEmail(true);
        setIsVerified(true);
        if (emailValid.current || otpValid.current) {
            setIsLoading(true);
            authApi
                .verifyOtp({ email: email, otp: otp })
                .then((response) => {
                    const token = response.data.token;
                    const refreshToken = response.data.refreshToken;
                    login({ token, refreshToken });
                    navigate("/admin");
                })
                .catch((error) => {
                    console.log(error);
                    showToast.error(error?.response?.data?.message, {
                        position: "top-center",
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };
    // Side Effects
    useEffect(() => {
        setContainerClass(
            isLoginEmail
                ? "bg-white p-8 rounded-xl shadow-2xl w-full relative max-w-screen-lg flex flex-wrap items-baseline border border-gray-100 min-h-72"
                : "bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100"
        );
    }, [isLoginEmail]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  min-h-">
            <div className={containerClass}>
                {/* Header */}
                <div
                    className={`${
                        isLoginEmail
                            ? "flex flex-col w-1/2"
                            : "text-center mb-8"
                    } `}
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Admin Login
                    </h1>

                    {isLoginEmail ? (
                        <>
                            <p className="text-gray-600 text-xl">
                                Login with admin email
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-600">
                            Welcome back! Please sign in to continue.
                        </p>
                    )}
                </div>
                {isLoginEmail && (
                    <>
                        <div className="w-1/2">
                            <EmailInput
                                placeholder="Enter your email"
                                containerClassName="w-full"
                                validator={emailValidator}
                                isSubmitted={isSubmittedEmail}
                                setIsSubmitted={setIsSubmittedEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                onChangeValid={(isValid) => {
                                    emailValid.current = isValid;
                                }}
                                iconPosition="left"
                                value={email}
                                readOnly={isSentOtp}
                            />

                            {isSentOtp && (
                                <div className="w-full flex items-baseline space-x-4 mt-4">
                                    <TextInput
                                        placeholder="Enter OTP"
                                        containerClassName="w-1/4"
                                        maxLength="6"
                                        validator={otpValidator}
                                        isSubmitted={isVerified}
                                        setIsSubmitted={setIsVerified}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        onChangeValid={(isValid) => {
                                            otpValid.current = isValid;
                                        }}
                                    />
                                    <Button onClick={handleVerifyOtp}>
                                        Verify
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex justify-end space-x-4 absolute bottom-[32px] right-[32px]">
                            <Button
                                onClick={() => setIsLoginEmail(false)}
                                variant="link"
                            >
                                Remember your password?
                            </Button>
                            <Button
                                size="sm"
                                className=""
                                onClick={handleSendOtp}
                                isLoading={isLoading}
                            >
                                {isSentOtp ? "Re-send OTP" : "Get OTP"}
                            </Button>
                        </div>
                    </>
                )}

                {!isLoginEmail && (
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
                            autoComplete="username"
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
                            Login
                        </Button>
                    </form>
                )}

                {!isLoginEmail && (
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Forgot your password?{" "}
                            <Button
                                variant="link"
                                className="px-0"
                                onClick={() => setIsLoginEmail(true)}
                            >
                                Try login with email
                            </Button>
                        </p>
                    </div>
                )}
            </div>

            <ToastContainer>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </ToastContainer>
        </div>
    );
}
