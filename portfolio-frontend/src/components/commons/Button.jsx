import React, { forwardRef } from "react";

const Button = forwardRef(
    (
        {
            children,
            variant = "primary",
            size = "md",
            disabled = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            onClick,
            type = "button",
            className = "",
            ...props
        },
        ref
    ) => {
        // Variant styles
        const variantClasses = {
            primary: `
            bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
            text-white border-transparent
            focus:ring-blue-200 disabled:bg-blue-300
        `,
            secondary: `
            bg-gray-600 hover:bg-gray-700 active:bg-gray-800 
            text-white border-transparent
            focus:ring-gray-200 disabled:bg-gray-300
        `,
            success: `
            bg-green-600 hover:bg-green-700 active:bg-green-800 
            text-white border-transparent
            focus:ring-green-200 disabled:bg-green-300
        `,
            danger: `
            bg-red-600 hover:bg-red-700 active:bg-red-800 
            text-white border-transparent
            focus:ring-red-200 disabled:bg-red-300
        `,
            warning: `
            bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 
            text-white border-transparent
            focus:ring-yellow-200 disabled:bg-yellow-300
        `,
            outline: `
            bg-transparent hover:bg-gray-50 active:bg-gray-100 
            text-gray-700 border-gray-300 hover:border-gray-400
            focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-400
        `,
            ghost: `
            bg-transparent hover:bg-gray-100 active:bg-gray-200 
            text-gray-700 border-transparent
            focus:ring-gray-200 disabled:text-gray-400
        `,
            link: `
            bg-transparent hover:bg-transparent active:bg-transparent 
            text-blue-600 hover:text-blue-700 border-transparent hover:underline
            focus:ring-blue-200 disabled:text-blue-300
        `,
        };

        // Size styles
        const sizeClasses = {
            xs: "px-2 py-1 text-xs",
            sm: "px-3 py-2 text-sm",
            md: "px-4 py-2.5 text-base",
            lg: "px-6 py-3 text-lg",
            xl: "px-8 py-4 text-xl",
        };

        // Icon sizes based on button size
        const iconSizes = {
            xs: "w-3 h-3",
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
            xl: "w-7 h-7",
        };

        // Base button classes
        const baseClasses = `
        inline-flex items-center justify-center
        font-medium rounded-lg border
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-60
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
    `;

        const handleClick = (e) => {
            if (disabled) return;
            if (onClick) onClick(e);
        };

        return (
            <button
                ref={ref}
                type={type}
                className={baseClasses}
                onClick={handleClick}
                disabled={disabled}
                {...props}
            >
                {/* Left Icon */}
                {leftIcon && (
                    <span
                        className={`${iconSizes[size]} ${
                            children ? "mr-2" : ""
                        }`}
                    >
                        {leftIcon}
                    </span>
                )}

                {/* Button Text */}
                {children && <span>{children}</span>}

                {/* Right Icon */}
                {rightIcon && (
                    <span
                        className={`${iconSizes[size]} ${
                            children ? "ml-2" : ""
                        }`}
                    >
                        {rightIcon}
                    </span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

// Button Group
export const ButtonGroup = ({
    children,
    size = "md",
    variant,
    className = "",
}) => {
    return (
        <div
            className={`inline-flex rounded-lg shadow-sm ${className}`}
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
                return child;
            })}
        </div>
    );
};

ButtonGroup.displayName = "ButtonGroup";

export default Button;
