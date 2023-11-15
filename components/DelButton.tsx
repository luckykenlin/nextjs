"use client";

import {Button} from "@/components/ui/button";
import {deletePost} from "@/lib/post";
import {useAction} from "@/hooks/useAction";

export default function DelButton({id}: { id: number }) {
    const {isPending, mutate} = useAction(deletePost);

    return (
        <Button
            onClick={() => mutate(id)}
            variant={'destructive'}
            disabled={isPending}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </Button>
    )
};