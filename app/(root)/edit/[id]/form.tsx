"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useParams, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {Post, updatePost} from "@/lib/post";
import {useEffect, useState} from "react";
import {useAction} from "@/hooks/useAction";

type FormData = Omit<Post, 'id'>;

export default function Form({data}: { data: Omit<Post, 'id'> }) {
    const route = useRouter();
    const id = Number(useParams().id);

    const {mutate} = useAction(updatePost);

    const {register, handleSubmit, formState: {isSubmitSuccessful, isSubmitting}} = useForm<FormData>({
        defaultValues: data
    });

    const onSubmit = handleSubmit(async (data: FormData) => {
        await mutate({id: id, title: data.title, body: data.body});
        route.back();
    });


    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    if (!isClient) return null;

    return (
        <Dialog
            open={true}
            onOpenChange={() => {
                route.back();
            }}
        >
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                            Update a post here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" {...register("title", {required: true})} className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="body" className="text-right">
                                Content
                            </Label>
                            <Input id="body" {...register("body")} className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
