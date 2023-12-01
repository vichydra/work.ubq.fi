import { GitHubUser } from "./authenticated-get-github-user";

export function displayGitHubUserInformation(gitHubUser: GitHubUser) {
  const toolbar = document.getElementById("toolbar");
  const authenticated = document.createElement("div");
  authenticated.id = "authenticated";
  if (!toolbar) throw new Error("toolbar not found");
  // const div = document.createElement("div");
  // div.textContent = `Logged in as ${gitHubUser.login}`;
  // authenticated.appendChild(div);

  const img = document.createElement("img");
  img.src = gitHubUser.avatar_url;
  img.alt = gitHubUser.login;
  authenticated.appendChild(img);

  const div = document.createElement("div");

  div.textContent = gitHubUser.name; // JSON.stringify(filteredUserInfo, null, 2);
  div.classList.add("full");
  authenticated.appendChild(div);
  toolbar.appendChild(authenticated);
  toolbar.setAttribute("data-authenticated", "true");
  toolbar.classList.add("ready");
}