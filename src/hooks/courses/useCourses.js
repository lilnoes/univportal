import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useCourses() {
  const { data, error } = useSWR("/api/course/list", fetcher);
  return {
    courses: data?.data?.courses,
    isLoading: !error && !data,
    isError: error,
  };
}
