import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useQuizzes(shortName) {
  const { data, error } = useSWR(
    shortName ? ["/api/quiz/list", { shortName }] : null,
    fetcher
  );
  return {
    quizzes: data?.data?.quizzes,
    isLoading: !error && !data,
    isError: error,
  };
}
