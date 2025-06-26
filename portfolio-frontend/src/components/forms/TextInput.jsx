import React, { useState, forwardRef, useEffect } from "react";
import {
    EmailIcon,
    EyeIcon,
    EyeSlashIcon,
    PhoneIcon,
    SearchIcon,
} from "../icons/Icons";

const TextInput = forwardRef((props, ref) => {
    const {
        label,
        name,
        type = "text",
        placeholder,
        defaultValue,
        onBlur,
        disabled = false,
        required = false,
        className = "",
        containerClassName = "",
        labelClassName = "",
        errorClassName = "",
        leftIcon,
        rightIcon,
        onRightIconClick,
        helperText,
        size = "md",
        onFocus,
        readOnly = false,
        isSubmitted,
        setIsSubmitted,
        validator,
        onChangeValid,
        autoComplete,
        maxLength,
        ...restProps
    } = props;

    const sizeClass = {
        sm: "p-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
    };

    const [isFocused, setIsFocused] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [error, setError] = useState(false);
    const [innerValue, setInnerValue] = useState(defaultValue || "");
    const currentValue = props.value !== undefined ? props.value : innerValue;

    const baseInputClass = `
         w-full border rounded-md transition-all duration-200
         focus:outline-none focus:ring-2
         ${sizeClass[size]}
         ${leftIcon ? "pl-10" : ""}
         ${rightIcon ? "pr-10" : ""}
         ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        ${
            error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : isFocused
                ? "border-blue-500 focus:border-blue-500 focus:ring-blue-200"
                : "border-gray-300 hover:border-gray-400"
        }
    `;

    const onChange = (e) => {
        // if (readOnly) return;
        if (props.value === undefined) {
            setInnerValue(e.target.value);
        }
        if (props.onChange) {
            props.onChange(e);
        }
        if (!hasInteracted) setHasInteracted(true);
    };

    const handleFocus = (e) => {
        setIsFocused(true);
        if (!hasInteracted) setHasInteracted(true);
        if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e) => {
        const errorMessage = validator(e.target.value);
        setError(errorMessage);
        onChangeValid(!errorMessage);
    };

    useEffect(() => {
        if (isSubmitted) {
            const errorMessage = validator(currentValue);
            setError(errorMessage);
            onChangeValid(!errorMessage);
            setIsSubmitted(!errorMessage);
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (!hasInteracted) return;
        const val = props.value !== undefined ? props.value : innerValue;
        const handler = setTimeout(() => {
            const errorMessage = validator(val);
            setError(errorMessage);
            onChangeValid(!errorMessage);
        }, 500);

        return () => clearTimeout(handler);
    }, [props.value, innerValue, hasInteracted]);

    return (
        <div className={containerClassName}>
            {label && (
                <label
                    className={`text-base font-medium block mb-2 text-gray-700 ${labelClassName}`}
                >
                    {label}
                    {required && (
                        <span className="text-red-500 font-medium text-base ml-1">
                            *
                        </span>
                    )}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    className={`${baseInputClass}`}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    value={currentValue}
                    readOnly={readOnly}
                    disabled={disabled}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type={type}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    {...restProps}
                />
                {rightIcon && (
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={onRightIconClick}
                    >
                        {rightIcon}
                    </div>
                )}
            </div>
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}

            {error && (
                <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
                    {error}
                </p>
            )}
        </div>
    );
});
TextInput.displayName = "TextInput";

// Component PasswordInput
export const PasswordInput = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const RightIcon = showPassword ? (
        <EyeIcon className="w-5 h-5 cursor-pointer" />
    ) : (
        <EyeSlashIcon className="w-5 h-5 cursor-pointer" />
    );

    return (
        <TextInput
            ref={ref}
            type={showPassword ? "text" : "password"}
            rightIcon={RightIcon}
            onRightIconClick={togglePasswordVisibility}
            autoComplete="current-password"
            {...props}
        />
    );
});

PasswordInput.displayName = "PasswordInput";

// Component SearchInput
export const SearchInput = forwardRef(
    ({ iconPosition = "right", ...props }, ref) => {
        const iconProps =
            iconPosition === "right"
                ? { rightIcon: <SearchIcon /> }
                : iconPosition === "left"
                ? { leftIcon: <SearchIcon /> }
                : {};

        return (
            <TextInput
                ref={ref}
                type="search"
                placeholder="Search..."
                {...iconProps}
                {...props}
            />
        );
    }
);

SearchInput.displayName = "SearchInput";

// Component EmailInput
export const EmailInput = forwardRef(
    ({ iconPosition = "right", ...props }, ref) => {
        const iconProps =
            iconPosition === "right"
                ? { rightIcon: <EmailIcon /> }
                : iconPosition === "left"
                ? { leftIcon: <EmailIcon /> }
                : {};
        return (
            <TextInput
                ref={ref}
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                {...iconProps}
                {...props}
            />
        );
    }
);

EmailInput.displayName = "EmailInput";

// Component PhoneInput
export const PhoneInput = forwardRef(
    ({ iconPosition = "right", ...props }, ref) => {
        const iconProps =
            iconPosition === "right"
                ? { rightIcon: <PhoneIcon /> }
                : iconPosition === "left"
                ? { leftIcon: <PhoneIcon /> }
                : {};
        return (
            <TextInput
                ref={ref}
                type="tel"
                placeholder="Phone number"
                {...iconProps}
                {...props}
            />
        );
    }
);

PhoneInput.displayName = "PhoneInput";

// Component TextArea
export const TextArea = forwardRef((props, ref) => {
    const {
        label,
        name,
        placeholder,
        defaultValue,
        onBlur,
        disabled = false,
        required = false,
        className = "",
        containerClassName = "",
        labelClassName = "",
        errorClassName = "",
        helperText,
        size = "md",
        onFocus,
        readOnly = false,
        isSubmitted,
        setIsSubmitted,
        validator,
        onChangeValid,
        rows = 4,
        maxLength,
        showCharCount = false,
        ...restProps
    } = props;

    const sizeClass = {
        sm: "p-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
    };

    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState(defaultValue || "");

    const baseTextAreaClass = `
        w-full border rounded-md transition-all duration-200 resize-vertical
        focus:outline-none focus:ring-2
        ${sizeClass[size]}
        ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        ${
            error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : isFocused
                ? "border-blue-500 focus:border-blue-500 focus:ring-blue-200"
                : "border-gray-300 hover:border-gray-400"
        }
        ${className}
    `;

    const onChange = (e) => {
        setValue(e.target.value);
        if (validator && onChangeValid) {
            setTimeout(() => {
                const errorMessage = validator(e.target.value);
                onChangeValid(!errorMessage);
                setError(errorMessage);
            }, 300);
        }
    };

    const handleFocus = (e) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (validator) {
            const errorMessage = validator(e.target.value);
            setError(errorMessage);
            if (onChangeValid) onChangeValid(!errorMessage);
        }
        if (onBlur) onBlur(e);
    };

    return (
        <div className={containerClassName}>
            {label && (
                <label
                    htmlFor={name}
                    className={`text-base font-medium block mb-2 text-gray-700 ${labelClassName}`}
                >
                    {label}
                    {required && (
                        <span className="text-red-500 font-medium text-base ml-1">
                            *
                        </span>
                    )}
                </label>
            )}

            <textarea
                ref={ref}
                className={baseTextAreaClass}
                placeholder={placeholder}
                id={name}
                name={name}
                value={value}
                readOnly={readOnly}
                disabled={disabled}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={rows}
                maxLength={maxLength}
                {...restProps}
            />

            {showCharCount && maxLength && (
                <div className="flex justify-end mt-1">
                    <span
                        className={`text-sm ${
                            value?.length > maxLength * 0.9
                                ? "text-red-500"
                                : "text-gray-500"
                        }`}
                    >
                        {value?.length || 0}/{maxLength}
                    </span>
                </div>
            )}

            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}

            {error && (
                <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
                    {error}
                </p>
            )}
        </div>
    );
});

TextArea.displayName = "TextArea";

export default TextInput;
