import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/account", fetcher);
  return { user: data?.data?.user, isLoading: !error && !data, isError: error };
}
