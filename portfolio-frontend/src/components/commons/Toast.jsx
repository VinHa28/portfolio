import React, { useEffect, useState } from "react";
import {
    CheckIcon,
    InfoIcon,
    WarningIcon,
    XCircleIcon,
    XMarkIcon,
} from "../icons/Icons";

export default function Toast(
    {
        type = "info",
        message = "Message",
        position = "top-right",
        duration = 3000,
        autoClose = true,
        closable = true,
        className = "",
        onClose,
        ...props
    },
    ref
) {
    // Component States
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isEntering, setIsEntering] = useState(true);

    // Event Handlers
    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300);
    };

    // Styles
    const getAnimationStyles = () => {
        const animationConfig = {
            "top-right": {
                entering: "transform translate-x-full opacity-0",
                leaving: "transform translate-x-full opacity-0",
                normal: "transform translate-x-0 opacity-100"
            },
            "top-left": {
                entering: "transform -translate-x-full opacity-0",
                leaving: "transform -translate-x-full opacity-0",
                normal: "transform translate-x-0 opacity-100"
            },
            "top-center": {
                entering: "transform -translate-y-full opacity-0",
                leaving: "transform -translate-y-full opacity-0",
                normal: "transform translate-y-0 opacity-100"
            },
            "bottom-right": {
                entering: "transform translate-x-full opacity-0",
                leaving: "transform translate-x-full opacity-0",
                normal: "transform translate-x-0 opacity-100"
            },
            "bottom-left": {
                entering: "transform -translate-x-full opacity-0",
                leaving: "transform -translate-x-full opacity-0",
                normal: "transform translate-x-0 opacity-100"
            },
            "bottom-center": {
                entering: "transform translate-y-full opacity-0",
                leaving: "transform translate-y-full opacity-0",
                normal: "transform translate-y-0 opacity-100"
            }
        };

        const config = animationConfig[position] || animationConfig["top-right"];

        if (isLeaving) {
            return config.leaving;
        } else if (isEntering) {
            return config.entering;
        } else {
            return config.normal;
        }
    };
    const typeStyles = {
        info: {
            bg: "bg-blue-500",
            text: "text-white",
            icon: <InfoIcon />,
        },
        success: {
            bg: "bg-green-500",
            text: "text-white",
            icon: <CheckIcon />,
        },
        error: {
            bg: "bg-red-500",
            text: "text-white",
            icon: <XCircleIcon />,
        },
        warning: {
            bg: "bg-yellow-500",
            text: "text-white",
            icon: <WarningIcon />,
        },
    };

    const positionStyles = {
        "top-right": "fixed top-4 right-4",
        "top-left": "fixed top-4 left-4",
        "top-center": "fixed top-4 left-1/2 -translate-x-1/2",
        "bottom-right": "fixed bottom-4 right-4",
        "bottom-left": "fixed bottom-4 left-4",
        "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2",
    };
    
    // Thêm pointer-events-auto để enable click events
    const baseClasses = `min-w-80 max-w-md rounded-lg flex items-center
                        justify-between px-4 py-3 transition-all
                        duration-300 ease-in-out z-50 pointer-events-auto shadow-lg`;

    const currentType = typeStyles[type] || typeStyles.info;

    // Side Effects
    useEffect(() => {
        // Animation for entering
        const enterTimer = setTimeout(() => {
            setIsEntering(false);
        }, 50);

        return () => clearTimeout(enterTimer);
    }, []);

    useEffect(() => {
        if (autoClose && duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration]);
    
    if (!isVisible) return null;
    
    return (
        <div
            className={`${baseClasses}
                ${positionStyles[position]}
                ${currentType.bg} 
                ${currentType.text}
                ${getAnimationStyles()}
                ${className}
            `}
            {...props}
            ref={ref}
        >
            <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{currentType.icon}</div>

                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
            </div>

            {closable && (
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 ml-4 inline-flex text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors duration-200"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

Toast.displayName = "Toast";

export const ToastContainer = ({ children, className = "" }) => {
    return (
        <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
            {children}
        </div>
    );
};