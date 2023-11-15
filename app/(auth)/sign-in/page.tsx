import SignIn from "@/app/(auth)/sign-in/sign-in";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/_auth-options";

const Page = async function () {
    const token = await getServerSession(authOptions)

    if (token) {
        redirect('/');
    }

    return (
        <SignIn/>
    )
};

export default Page;