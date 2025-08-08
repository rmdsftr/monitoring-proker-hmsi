import { StandardResponse } from "../interfaces/standardResponse.interface";

export function success<T>(message:string, data?:T): StandardResponse<T>{
    return{
        status: 'success',
        message,
        data
    }
}

export function failed(message:string, error?:any):StandardResponse{
    return {
        status: 'failed',
        message,
        error
    }
}