import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <Result
            status="403"
            title="Unauthorize!"
            subTitle={"Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục."}
            extra={
                <Button type="primary">
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </Button>
            }
        />
    )
}

export default PrivateRoute;