import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useStore<T = unknown>(key: string, initialValue?: T) {
    const queryClient = useQueryClient()

    const setStore = (data: T) => {
        queryClient.setQueryData([key], data)
        localStorage.setItem(key, JSON.stringify(data))
    }

    const { data: store } = useQuery<T>({
        queryKey: [key],
        queryFn: () => {
            const data = localStorage.getItem(key)
            return data ? JSON.parse(data) : null
        },
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    })

    return {
        store:
            store ? store
            : initialValue ? initialValue
            : store,
        setStore,
    }
}
