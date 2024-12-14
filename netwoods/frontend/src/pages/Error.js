import { useRouteError } from "react-router-dom";
import Navbar from "../components/UI/Navbar";

const ErrorPage = () => {
    const error = useRouteError();
    let title = "An Error Occurred";
    let message = "Something went wrong please try again later.";

    if(error.data.message){
        message = error.data.message;
    }
    else if(error.status === 500){
        message = error.data.message
    }
    else if(error.status === 404){
        title = "Not Found";
        message = "Could not fetch the page you are looking for"
    }

    return (
        <>
        <Navbar/>
            <div className="h-screen flex flex-col justify-center items-center text-center p-4">
                <h1 className="text-5xl text-coolWhite text-center">{title + " 😮‍💨"}</h1>
                <br/>
                <p className="text-coolWhite">{message}</p>
            </div>
        </>
    )
}

export default ErrorPage;