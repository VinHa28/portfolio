import { useState } from "react";

 export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = Date.now() + Math.random();
        const newToast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);
        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toasts) => toasts.id !== id));
    };

    const showToast = {
        success: (message, option = {}) => {
            addToast({ message, type: "success", ...option });
        },
        error: (message, option = {}) => {
            addToast({ message, type: "error", ...option });
        },
        warning: (message, option = {}) => {
            addToast({ message, type: "warning", ...option });
        },
        info: (message, option = {}) => {
            addToast({ message, type: "info", ...option });
        },
    };

    return {toasts, addToast, removeToast, showToast};
};
