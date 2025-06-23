import useAuth from "contexts/AuthContext";
import Button from "components/commons/Button";

export default function () {
    const { logout } = useAuth();
    const handleLogOut = () => {
        logout();
    };
    return (
        <>
            <Button onClick={handleLogOut}>Logout</Button>
        </>
    );
}
