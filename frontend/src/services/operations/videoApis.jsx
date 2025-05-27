import { videoEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

export const uploadVideo = async(data,token)=>{
    const loading = toast.loading("Loading..");
    try{
        const response = await apiConnector('POST',videoEndpoints.UPLOAD_VIDEO,data,
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("error occurred during login : ",error);
        toast.error("unable to login");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const getFeed = async(page=1,token)=>{
    const loading = toast.loading("Loading..");
    try{
        console.log("going to fetch feed")
        const response = await apiConnector('GET',`${videoEndpoints.GET_FEED}?page=${page}`,null,
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while fetching feed",error);
        toast.error("feed error");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const purchaseVideo = async(videoId,token)=>{
    const loading = toast.loading("Loading..");
    try{
        console.log("going to fetch feed")
        const response = await apiConnector('POST',`${videoEndpoints.PURCHASE_VIDEO}/${videoId}`,null,
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while fetching feed",error);
        toast.error("feed error");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const getVideoWithComments = async(videoId,token)=>{
    const loading = toast.loading("Loading..");
    try{
        console.log("going to fetch feed")
        const response = await apiConnector('GET',`${videoEndpoints.GET_VIDEO}/${videoId}`,null,
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while fetching feed",error);
        toast.error("feed error");
    }
    finally{
        toast.dismiss(loading);
    }
}