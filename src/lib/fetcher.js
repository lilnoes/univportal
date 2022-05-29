// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// export const fetcherGet = (url) => fetcher(url);

export default async function fetcher(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json;
}
