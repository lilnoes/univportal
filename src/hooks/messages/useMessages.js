import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useMessages(recipient) {
  const { data, error } = useSWR(
    recipient
      ? [
          "/api/message",
          {
            type: recipient.type,
            courseId: recipient.courseId,
            userId: recipient.userId,
          },
        ]
      : null,
    fetcher
  );
  return {
    messages: data?.data?.messages,
    isLoading: !error && !data,
    isError: error,
  };
}
