"use server";

import {revalidateTag} from "next/cache";

export interface Post {
    id: number;
    title: string;
    body?: string;
}

const headers = {
    'Authorization': `Bearer ${process.env.API_TOKEN as string}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const getPosts = async (): Promise<Post[]> => {
    return fetch(`${process.env.API_URL}/api/posts`, {
        headers,
        next: {tags: ['posts']}
    }).then(r => r.json());
}

export const getPost = async (id: number): Promise<Post> => {
    return fetch(`${process.env.API_URL}/api/posts/${id}`, {
        headers,
        next: {tags: ['post', `post-${id}`]}

    }).then(r => r.json());
}

export const updatePost = async (data: Post) => {
    const {id, ...rest} = data;
    const result = await fetch(`${process.env.API_URL}/api/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(rest),
        headers
    }).then(r => r.json());

    revalidateTag('posts');
    revalidateTag(`post-${id}`);

    return result;
}

export const deletePost = async (id: number) => {
    const result = await fetch(`${process.env.API_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers
    }).then(r => r.json());

    revalidateTag('posts')

    return result;
}