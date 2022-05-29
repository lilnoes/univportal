import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/user", fetcher);
  return { user: data, isLoading: !error && !data, isError: error };
}
