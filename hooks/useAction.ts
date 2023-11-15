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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const mutate = useCallback(
        async (input: TInput) => {
            setIsLoading(true);

            try {
                const result = await action(input);

                if (!result) {
                    return;
                }

                if (result.error) {
                    setError(result.error);
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsLoading(false);
                options.onComplete?.();
            }
        },
        [action, options]
    );

    return {
        mutate,
        error,
        data,
        isLoading,
    };
};