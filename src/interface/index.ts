import { Request } from "express"

export interface IUserPayload{
    name: string,
    email: string,
    userName: string,
    password: string
}

export interface ILoginPayload{
    userName: string,
    password: string
}

export interface AuthorizedRequest extends Request{
    user?: any
}


export interface IPostPayload{
    userId: number
    title: string,
    content: string,
    category?: string,
    keywords?: Array<string>
}

export interface IPostUpdatePayload{
    title?: string,
    content?: string,
    category?: string,
    keywords?: Array<string>
}

export interface ICommentPayload{
    userId: number,
    postId: number,
    content: string,
}

