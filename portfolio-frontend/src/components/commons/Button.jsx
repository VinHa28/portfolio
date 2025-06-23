import React, { forwardRef } from "react";

const Button = forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            fullWidth = false,
            leftIcon,
            rightIcon,
            className,
            disabled = false,
            onClick,
            isLoading,
            ...props
        },
        ref
    ) => {
        const sizeClasses = {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-2 text-sm",
            md: "px-4 py-2.5 text-base",
            lg: "px-6 py-3 text-lg",
            xl: "px-8 py-4 text-xl",
        };

        const iconSize = {
            xs: "w-3 h-3",
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
            xl: "w-7 h-7",
        };

        const variantClasses = {
            primary: `
            bg-blue-600 hover:bg-blue-400 active:bg-blue-600 text-white
            border-transparent focus-ring-blue-200 disable:bg-blue-200`,
            secondary: `
            bg-gray-700 hover:bg-gray-600 active:bg-gray-700 text-white
            border-transparent focus:ring-gray-200 disable:bg-gray-300`,
            success: `
            bg-green-600 hover:bg-green-500 active:bg-green-700 text-white
            border-transparent focus:ring-green-200 disable:bg-green-300`,
            danger: `
            bg-red-600 hover:bg-red-500 active:bg-red-700 text-white
            border-transparent focus:ring-red-300 disable:bg-red-200`,
            warning: `
            bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white
            border-transparent focus:ring-yellow-200 disable:bg-yellow-200`,
            outline: `
            bg-transparent hover:bg-gray-50 active:bg-gray-100 
            text-gray-700 border-gray-300 hover:border-gray-400
            focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-400`,
            ghost: `
            bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 
            border-transparent focus:ring-gray-200 disabled:text-gray-400`,
            link: `
            bg-transparent hover:bg-transparent active:bg-transparent active:ring-transparent
            outline-none
            text-blue-600 hover:text-blue-700 border-transparent hover:underline
            disabled:text-blue-300`,
        };

        const baseClasses = `
        inline-flex items-center justify-center transition-all duration-200
        focus:outline-none active:ring-2 rounded-md font-medium 
        disabled:cursor-not-allowed disabled:opacity-40 border
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        ${className}
        `;
        const handleClick = (e) => {
            if (disabled) return;
            if (onClick) onClick(e);
        };

        const LoadingSpinner = ({ size }) => {
            return (
                <div
                    className={`animate-spin rounded-full border-b-2 border-current ${iconSize[size]}`}
                ></div>
            );
        };
        return (
            <button
                onClick={handleClick}
                className={baseClasses}
                disabled={disabled || isLoading}
                {...props}
                ref={ref}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner size={size} />
                        {children && <span className="ml-2">Loading...</span>}
                    </>
                ) : (
                    <>
                        {leftIcon && (
                            <span
                                className={`${iconSize[size]} ${
                                    children ? "mr-2" : ""
                                }`}
                            >
                                {leftIcon}
                            </span>
                        )}
                        {children && <span>{children}</span>}

                        {rightIcon && (
                            <span
                                className={`${iconSize[size]} ${
                                    children ? "ml-2" : ""
                                }`}
                            >
                                {rightIcon}
                            </span>
                        )}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export const ButtonGroup = ({ children, size = "md", variant, className }) => {
    return (
        <div
            className={`inline-flex rounded-md shadow-sm ${className}`}
            role="group"
        >
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    const isFirst = index === 0;
                    const isLast = index === React.Children.count(children) - 1;
                    return React.cloneElement(child, {
                        size: child.props.size || size,
                        variant: child.props.variant || variant,
                        className: `
                         ${child.props.className || ""}
                         ${!isFirst ? "-ml-px" : ""}
                         ${isFirst ? "rounded-r-none" : ""}
                         ${isLast ? "rounded-l-none" : ""}
                         ${!isFirst && !isLast ? "rounded-none" : ""}
                            `,
                    });
                }
            })}
        </div>
    );
};

ButtonGroup.displayName = "ButtonGroup";

export default Button;
