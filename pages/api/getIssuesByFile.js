import fs from "fs";
import path from "path";
import testIssues from "../../_data/_testIssues.json";

const useTestData = process.env.NEXT_PUBLIC_USE_TEST_DATA;

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const findingsRepo = process.env.REPO;

const ISSUES_CACHE_PATH = path.resolve("_data/.issuesByFile.json");

export default async function handler(req, res) {
  let cachedData;

  // Helper function that takes the raw GitHub json and turns it into
  // an object of all the issues arranged by file name.
  // What are all those dots? That's how I got numbers to sort themselves.
  const arrangeIssuesByFile = (issues) => {
    let issuesSorted = {};
    issues.forEach((issue) => {
      const labels = issue.labels;
      const matches = issue.body.matchAll(
        new RegExp( // Note the escape on \w since I'm not using // notation, that was necessary. It took a long time to figure out.
          "https?://(?:www.)?github.com/[\\w/-]+/([^#\\s]+)#L([0-9]+)",
          "g"
        )
      );

      for (const match of matches) {
        const fileName = match[1];
        // TODO: update regex to grab the whole range and do something with it.
        const lineNumber = match[2];
        if (!issuesSorted.hasOwnProperty(fileName)) {
          issuesSorted[fileName] = {};
        }
        if (!issuesSorted[fileName].hasOwnProperty(lineNumber)) {
          issuesSorted[fileName][lineNumber] = [];
        }

        issuesSorted[fileName][lineNumber].push({
          title: issue.title,
          url: issue.html_url,
          number: issue.number,
          labels: issue.labels,
        });
      }
    });

    return issuesSorted;
  };

  // Function that grabs new data from GitHub
  // If useTestData is set to true, it will grab a file of old, static data from _data
  const fetchGitHubIssues = async () => {
    if (!useTestData) {
      console.log("Fetching fresh issue data from GitHub...");
      const allIssues = await octokit
        .paginate(
          // you have to use paginate because otherwise octokit will only give you like 30
          "GET /repos/{owner}/{repo}/issues",
          { owner: "code-423n4", repo: findingsRepo },
          (response) => response.data
        )
        .then((issues) => {
          let issuesObject = issues;

          // res.status(200).json(issuesObject);
          // console.log(JSON.stringify(issuesObject));
          console.log(
            "Grabbed from GitHub. Number of issues: ",
            Object.keys(issuesObject).length
          );
          return issuesObject;
        });
      return allIssues;
    }

    if (useTestData) {
      const issuesObject = testIssues;
      console.log("🌺🌸🌺🌸🌺🌸🌺 IMPORTANT: This is using test data! ");
      res.status(200).json(issuesObject);
      return issuesObject;
    }
  };

  // Look for cached file
  try {
    cachedData = JSON.parse(fs.readFileSync(ISSUES_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("No cache data found here:", ISSUES_CACHE_PATH);
  }

  // Create cached file
  // This is where the data is sorted by file name
  if (!cachedData) {
    const data = await fetchGitHubIssues();
    try {
      fs.writeFileSync(
        ISSUES_CACHE_PATH,
        JSON.stringify(arrangeIssuesByFile(data)),
        "utf8"
      );
      console.log("Created issues cache");
    } catch (error) {
      console.log("ERROR WRITING CACHE TO FILE");
      console.log(error);
    }

    cachedData = data;
  }

  // return the cachedData
  res.status(200).json(cachedData);
}
