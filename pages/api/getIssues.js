import fs from "fs";
import path from "path";
import testIssues from "../../_data/_testIssues.json";

const useTestData = process.env.NEXT_PUBLIC_USE_TEST_DATA;

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
console.log("aww yiss?", useTestData);
const findingsRepo = process.env.REPO;

const ISSUES_CACHE_PATH = path.resolve("_data/.issues.json");

export default async function handler(req, res) {
  let cachedData;

  // Function that grabs new data from GitHub
  // If useTestData is set to true, it will grab a file of old, static data from _data
  const fetchGitHubIssues = async () => {
    if (useTestData === "false") {
      console.log("Fetching fresh issue data from GitHub...");
      const allIssues = await octokit.rest.issues // ) //   (response) => response.data //   {}, //   "GET /user/issues", //   // you have to use paginate because otherwise octokit will only give you like 30 // .paginate(
        .listForOrg({
          org: "Netlify",
        })
        .then((issues) => {
          let issuesObject = issues;

          // console.log(JSON.stringify(issuesObject));
          console.log(
            "Grabbed from GitHub. Number of files with issues: ",
            Object.keys(issuesObject).length
          );
          return issuesObject;
        });

      return allIssues;
    }
    if (useTestData !== "false") {
      const issuesObject = await testIssues;
      console.log(
        "🌺🌸🌺🌸🌺🌸🌺 IMPORTANT: This is using test data! ",
        Object.keys(issuesObject).length
      );
      return issuesObject;
    }
  };

  // Look for cached file
  try {
    cachedData = JSON.parse(fs.readFileSync(ISSUES_CACHE_PATH, "utf8")).data;
  } catch (error) {
    console.log("No cache data found here:", ISSUES_CACHE_PATH);
  }

  // Create cached file
  if (!cachedData) {
    const allData = await fetchGitHubIssues();
    console.log(Object.keys(allData).length);
    try {
      fs.writeFileSync(ISSUES_CACHE_PATH, JSON.stringify(allData), "utf8");
      console.log("Created issues cache");
      console.log("Created issuesByFile cache");
    } catch (error) {
      console.log("ERROR WRITING CACHE TO FILE");
      console.log(error);
    }
    cachedData = allData.data;
  }

  // return the cachedData
  res.status(200).json(cachedData);
}
