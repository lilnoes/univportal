import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useAnnouncements(shortName) {
  const { data, error } = useSWR(
    shortName ? ["/api/announcement/list", { shortName }] : null,
    fetcher
  );
  return {
    announcements: data?.data?.announcements,
    isLoading: !error && !data,
    isError: error,
  };
}
