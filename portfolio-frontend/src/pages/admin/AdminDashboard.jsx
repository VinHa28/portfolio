import useAuth from "contexts/AuthContext";
import Button from "components/commons/Button";
import authApi from "../../api/services/authApi";

export default function () {
    const { logout } = useAuth();
    const refreshToken = localStorage.getItem("refreshToken");
    const handleLogOut = () => {
        authApi.logout({ refreshToken }).then(() => {
            logout();
        });
    };
    return (
        <>
            <Button onClick={handleLogOut}>Logout</Button>
        </>
    );
}
