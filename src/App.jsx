import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context";

const App = () => {
    const { user, setUser } = useContext(AuthContext);

    console.log('User data from context in App begin:', user);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        if (res.data) {
            setUser(res.data.user); // Update user context with the fetched user data
            console.log('User data fetched successfully:', res.data);
            console.log('User data from context after:', user);
        }
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App
