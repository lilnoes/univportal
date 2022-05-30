import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useAvailableCourses(year, department) {
  const { data, error } = useSWR("/api/course/available", fetcher);
  return {
    courses: data?.data?.courses,
    isLoading: !error && !data,
    isError: error,
  };
}
