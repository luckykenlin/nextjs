"use server";

import {revalidateTag} from "next/cache";
import {CreatePostInputType, CreatePostReturnType} from "@/actions/create-post/types";

const headers = {
    'Authorization': `Bearer ${process.env.API_TOKEN as string}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const createPost = async (data: CreatePostInputType): Promise<CreatePostReturnType> => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/posts`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers
        });

        const result = await response.json();

        if (response.ok) {
            revalidateTag('posts');
            return {data: result};
        }

        return {
            error: result
        }
    } catch (error: any) {
        return {
            error
        }
    }
};
