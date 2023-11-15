type VerifyUserCredentials = {
    email: string;
    password: string;
}

const headers = {
    'Authorization': `Bearer ${process.env.API_TOKEN as string}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export type User = {
    id: string;
    name: string;
    email: string;
}

export const login = async (request: VerifyUserCredentials): Promise<Response> => {
    return await fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers
    });
}