"use client";

import {Button} from "@/components/ui/button";
import {deletePost} from "@/lib/post";
import {useAction} from "@/hooks/useAction";

export default function DelButton({id}: { id: number }) {
    const {isLoading, mutate} = useAction(deletePost);

    return (
        <Button
            onClick={() => mutate(id)}
            variant={'destructive'}
            disabled={isLoading}
        >
            {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
    )
};