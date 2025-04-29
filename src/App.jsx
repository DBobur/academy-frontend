import { AuthProvider } from "./store/AuthContext.jsx";
import AppRouter from "./routes/Router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <AppRouter />
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
