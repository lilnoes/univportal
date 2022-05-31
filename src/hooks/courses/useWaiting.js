import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useWaitings(shortName) {
  const { data, error } = useSWR(
    shortName ? ["/api/course/waiting", { shortName }] : null,
    fetcher
  );
  return {
    waitings: data?.data?.waitings,
    isLoading: !error && !data,
    isError: error,
  };
}
