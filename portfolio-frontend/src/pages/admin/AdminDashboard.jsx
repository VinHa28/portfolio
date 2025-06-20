import React from "react";
import useAuth from "../../contexts/AuthContext";

export default function () {
    const {logout} = useAuth();
    return (
        <div>
            <button
                onClick={logout}
                className="bg-blue-500 p-4 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
            >
                Logout
            </button>
        </div>
    );
}
