import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useContext<T = unknown>(key: string, initialValue?: T) {
    const queryClient = useQueryClient()

    const setStore = (data: T) => {
        queryClient.setQueryData(["context" + key], data)
    }

    const { data: store } = useQuery<T>({
        queryKey: ["context" + key],
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    function remove() {
        queryClient.removeQueries({
            queryKey: ["context" + key],
        })
    }

    return {
        store:
            store ? store
            : initialValue ? initialValue
            : store,
        setStore,
        remove
    }
}
