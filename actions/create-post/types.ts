import {z} from "zod";
import {ActionState} from "@/hooks/useAction";

export const CreatePostSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(3, {
        message: "Title is too short."
    }),

    body: z.string().optional()
});

export type CreatePostInputType = z.infer<typeof CreatePostSchema>;
export type CreatePostReturnType = ActionState<Boolean>;