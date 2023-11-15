import {getPost} from "@/lib/post";
import Form from "@/app/(root)/edit/[id]/form";

export default async function EditPost({params}: { params: { id: number } }) {
    const post = await getPost(params.id);
    return (
        <Form data={post}/>
    )
}
