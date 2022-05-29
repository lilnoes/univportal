import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useAnnouncements(course) {
  const { data, error } = useSWR(
    course ? ["/api/course/announcement/list", { shortName: course }] : null,
    fetcher
  );
  return {
    announcements: data?.data?.announcements,
    isLoading: !error && !data,
    isError: error,
  };
}
