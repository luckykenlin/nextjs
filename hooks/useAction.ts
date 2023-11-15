import {useCallback, useState} from "react";

export type ActionState<TOutput, TError = unknown> = {
    data?: TOutput;
    error?: TError;
};

type Action<TInput, TOutput, TError> = (data: TInput) => Promise<ActionState<TOutput, TError>>;

interface UseActionOptions<TOutput, TError> {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: TError) => void;
    onComplete?: () => void;
}

export const useAction = <TInput, TOutput, TError>(
    action: Action<TInput, TOutput, TError>,
    options: UseActionOptions<TOutput, TError> = {}
) => {
    const [error, setError] = useState<TError | undefined>();
    const [data, setData] = useState<TOutput | undefined>();
    const [isPending, setIsPend] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const mutate = useCallback(
        async (input: TInput) => {
            setIsPend(true);
            setIsError(false);
            setError(undefined);
            setIsSuccess(false);

            try {
                const result = await action(input);

                if (!result) {
                    return;
                }

                if (result.error) {
                    setError(result.error);
                    setData(undefined);
                    setIsError(true);
                    setIsSuccess(false);
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setError(undefined);
                    setData(result.data);
                    setIsError(false);
                    setIsSuccess(true);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsPend(false);
                options.onComplete?.();
            }
        },
        [action, options]
    );

    const reset = useCallback(
        () => {
            setIsSuccess(false);
            setIsError(false);
            setIsPend(false);
            setError(undefined);
            setData(undefined);
        }, []
    );

    return {
        reset,
        mutate,
        mutateAsync: action,
        error,
        data,
        isPending,
        isSuccess,
        isError
    };
};