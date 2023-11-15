"use client";

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createPost} from "@/actions/create-post";
import {useAction} from "@/hooks/useAction";
import {CreatePostInputType, CreatePostSchema} from "@/actions/create-post/types";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import useMatchServer from "@/hooks/useMatchServer";

export default function Page() {
    const route = useRouter();
    const form = useForm<CreatePostInputType>({resolver: zodResolver(CreatePostSchema)});

    const {mutate, error, isLoading, data} = useAction(createPost, {
        onSuccess: (data) => {
            console.log("success callback", data);
            route.back();
        },
        onError: (error) => {
            console.log("error callback", error);
        },
    });

    if (!useMatchServer()) return null;

    return (
        <Dialog
            open={true}
            onOpenChange={() => {
                route.back();
            }}
        >
            <DialogContent className="sm:max-w-xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(mutate)}>
                        <DialogHeader>
                            <DialogTitle>Create Post</DialogTitle>
                            <DialogDescription>
                                Create a post here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="body"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Body</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting || isLoading}
                            >
                                Save changes {form.formState.isSubmitting && '...'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
