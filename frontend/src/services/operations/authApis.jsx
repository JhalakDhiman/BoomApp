import toast from 'react-hot-toast'
import { authEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';

export const signup = async({email,password,confirmPassword,navigate})=>{
    try{
        const loading = toast.loading("loading...");
        const response = await apiConnector('POST',authEndpoints.SIGNUP,{email,password,confirmPassword});

        if(!response.data.success){
            toast.error(response.data.message);
        }
        console.log(response.data);
        toast.success(response.data.message);

        navigate('/login');
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const login = async({email,password,setUser,setToken,navigate})=>{
    const loading = toast.loading("Loading..");
    try{
        const response = await apiConnector('POST',authEndpoints.LOGIN,{email,password});

        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log("token recieved during login : ",response.data.token);
            toast.success(response.data.message);
            await setUser(response.data.user);
            await setToken(response.data.token);
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate('/')
        }
    } catch(error){
        console.log("error occurred during login : ",error);
        toast.error("unable to login");
    }
    finally{
        toast.dismiss(loading);
    }
}