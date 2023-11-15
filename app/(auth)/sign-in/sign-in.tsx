"use client";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {useEffect, useState} from "react";

type FormData = {
    email: string;
    password: string;
}

export default function SignIn() {
    const route = useRouter();
    const {register, handleSubmit} = useForm<FormData>();
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);

    const onSubmit = handleSubmit(async (data: FormData) => {
        signIn("credentials", {email: data.email, password: data.password, callbackUrl: '/'})
    });

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

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
                        <DialogTitle>Sign In</DialogTitle>
                    </DialogHeader>

                    {
                        searchParams.has('error') &&
                        <p className={'p-4 text-destructive'}>
                            Credential not match.
                        </p>
                    }

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input id="email" type={'email'} {...register("email", {required: true})}
                                   className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Content
                            </Label>
                            <Input id="password" type={'password'} {...register("password")} className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Sign in</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
