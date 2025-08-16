import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
    const { user, setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        if (res.data) {
            setUser(res.data.user); // Update user context with the fetched user data
        }
        setIsAppLoading(false); // Set loading to false after fetching user data
    }

    return (
        <div>
            {isAppLoading === true ?
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Spin />
                </div>
                :
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            }
        </div>
    )
}

export default App
