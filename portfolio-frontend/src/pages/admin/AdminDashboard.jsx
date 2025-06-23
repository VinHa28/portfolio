import useAuth from "../../contexts/AuthContext";
import Button, { ButtonGroup } from "../../components/commons/Button";
import { useToast } from "../../hooks/useToast";
import Toast, { ToastContainer } from "../../components/commons/Toast";

export default function () {
    const { logout } = useAuth();
    const { toasts, showToast, removeToast } = useToast();
    const handleLogOut = () => {
        logout();
    };
    return (
        <>
            <ButtonGroup>
                <Button onClick={handleLogOut}>Logout</Button>
                <Button
                    onClick={() =>
                        showToast.success("Thành công", {
                            position: "top-right",
                        })
                    }
                    variant="success"
                >
                    Success
                </Button>
                <Button
                    onClick={() =>
                        showToast.error("Có lỗi xảy ra", {
                            position: "top-left",
                        })
                    }
                    variant="danger"
                >
                    Error
                </Button>
                <Button
                    onClick={() =>
                        showToast.warning("Cảnh báo", {
                            position: "top-center",
                        })
                    }
                    variant="warning"
                >
                    Warning
                </Button>
                <Button
                    onClick={() =>
                        showToast.info("Thông tin", {
                            position: "bottom-center",
                        })
                    }
                >
                    Info
                </Button>
            </ButtonGroup>
            <ToastContainer>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </ToastContainer>
        </>
    );
}
