import {Navigate, useLocation} from 'react-router-dom';
import { removeToken } from '../helper';
import useUserStore from '../stores/user';



const ProtectedRoute = (props) =>{
    const {children} = props;
    const {user} = useUserStore();
    const location = useLocation();

    if(!user){
        removeToken();
        return <Navigate to={`/signin?redirect=${location.pathname}`}/>
    }

    return (
        <div>{children}</div>
    )

}

export default ProtectedRoute;