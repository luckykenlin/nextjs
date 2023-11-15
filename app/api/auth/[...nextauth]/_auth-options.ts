import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login, User} from "@/lib/user";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const response = await login({
                    email: credentials?.email!,
                    password: credentials?.password!
                });

                if (response.ok) {
                    const user = await response.json() as User;
                    return {id: user.id, name: user.name, email: user.email};
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        signOut: "/",
    },
};
