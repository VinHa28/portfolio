import React from "react";
import useAuth from "../../contexts/AuthContext";
import Button from "../../components/commons/Button";

export default function () {
    const {logout} = useAuth();
    return (
        <div>
            <Button>Logout</Button>
        </div>
    );
}
