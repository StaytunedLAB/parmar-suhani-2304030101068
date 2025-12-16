const OWNER = process.env.GH_OWNER || "StaytunedLAB";
const REPO = process.env.GH_REPO || "parmar-suhani-2304030101068";
const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  console.error("Missing GITHUB_TOKEN env var.");
  process.exit(1);
}

const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

const issue = {
  title: "Sample issue created via REST API",
  body: "This issue was created using JavaScript and GitHub REST API.",
  labels: ["bug"]
};

async function createIssue() {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issue)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error:", data);
    return;
  }

  console.log("✅ Issue created successfully!");
  console.log("🔗 Issue URL:", data.html_url);
}


createIssue();
