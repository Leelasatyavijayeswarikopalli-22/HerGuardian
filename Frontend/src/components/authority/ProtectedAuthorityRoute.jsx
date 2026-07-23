import { Navigate } from "react-router-dom";

export default function ProtectedAuthorityRoute({

    children

}){


    const role=

    localStorage.getItem("role");


    if(role!=="AUTHORITY"){

        return <Navigate to="/login"/>;

    }


    return children;


}