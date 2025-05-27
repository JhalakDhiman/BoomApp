const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndpoints = {
    SIGNUP:`${BASE_URL}/auth/signup`,
    LOGIN:`${BASE_URL}/auth/login`,
}

export const videoEndpoints = {
    UPLOAD_VIDEO:`${BASE_URL}/video/uploadVideo`,
    GET_FEED:`${BASE_URL}/feed/getFeed`,
    PURCHASE_VIDEO:`${BASE_URL}/video/purchaseVideo`,
    GET_VIDEO:`${BASE_URL}/video/getVideo`
}

export const giftEndpoints = {
    CREATE_GIFT:`${BASE_URL}/gift/createGift`,
}

export const commentEndpoints = {
    POST_COMMENT:`${BASE_URL}/comments/postComment`,
    GET_COMMENTS:`${BASE_URL}/comments/getComments`
}