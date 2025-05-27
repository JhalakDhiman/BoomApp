import toast from "react-hot-toast";
import { commentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { giftEndpoints } from "../apis";

export const postComment = async(videoId,text,token)=>{
    const loading = toast.loading("Loading..");
    try{
        const response = await apiConnector('POST',`${commentEndpoints.POST_COMMENT}/${videoId}`,{text},
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while posting comments",error);
        toast.error("comment error");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const fetchComments = async(videoId,token)=>{
    const loading = toast.loading("Loading..");
    try{
        const response = await apiConnector('GET',`${commentEndpoints.GET_COMMENTS}/${videoId}`,null,
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while posting comments",error);
        toast.error("comment error");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const createGift = async(videoId,amount,token)=>{
    const loading = toast.loading("Loading..");
    try{
        console.log("going to fetch feed")
        const response = await apiConnector('POST',`${giftEndpoints.CREATE_GIFT}/${videoId}`,{amount},
        {
            Authorization:`Bearer ${token}`
        });
            console.log("reponse :  ",response);
            return response;
    } catch(error){
        console.log("Error while posting comments",error);
        toast.error("comment error");
    }
    finally{
        toast.dismiss(loading);
    }
}