import fetcher from "lib/fetcher";
import useSWR from "swr";

export default function useStudentMessages(recipient) {
  const { data, error } = useSWR(
    recipient
      ? [
          "/api/message/student",
          {
            courseId: recipient.course._id,
            teacherId: recipient.creator._id,
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
