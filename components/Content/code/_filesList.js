import useSWR from "swr";

export default function filesList() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/getIssuesByFile", fetcher);
  if (error) return ["error"];

  const list = Object.keys(data).map((k) => k);
  console.log("aodij", list);
  return "hello";
}
