import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

/**
 * https://github.com/vercel/next.js/discussions/58520
 * Wrapper around `router.refresh()` from `next/navigation` `useRouter()` to return Promise, and resolve after refresh completed
 * @returns Refresh function
 */
export function useRouterRefresh() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [resolve, setResolve] = useState(null);
    const [isTriggered, setIsTriggered] = useState(false);

    const refresh = () => {
        return new Promise((resolve, reject) => {
            setResolve(() => resolve);
            startTransition(() => {
                router.refresh();
            });
        });
    };

    useEffect(() => {
        if (isTriggered && !isPending) {
            if (resolve) {
                resolve(null);

                setIsTriggered(false);
                setResolve(null);
            }
        }
        if (isPending) {
            setIsTriggered(true);
        }
    }, [isTriggered, isPending, resolve]);

    return refresh;
}
