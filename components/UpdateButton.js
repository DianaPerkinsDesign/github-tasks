async function updateFromGitHub() {
  const issues = await fetch("/api/getIssuesByFile").then((res) => res.json());
  console.log(issues);
}

export default function UpdateButton() {
  return (
    <>
      <button onClick={updateFromGitHub}>Update Data</button>
    </>
  );
}
