import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                {/* <Route path="/" element={<Home />} /> */}
                {/* Admin */}
                <Route
                    path="/admin/*"
                    element={
                        <AuthProvider>
                            <AdminRoutes />
                        </AuthProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="login" element={<AdminLogin/>}/>
        </Routes>
    );
};

export default App;
