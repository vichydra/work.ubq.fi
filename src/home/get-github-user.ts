import { Octokit } from "@octokit/rest";
import { OAuthToken } from "./get-github-access-token";
import { getLocalStore } from "./get-local-store";
import { GitHubUser, GitHubUserResponse } from "./github-types";

export async function getGitHubUser(): Promise<GitHubUser | null> {
  const activeSessionToken = await getSessionToken();
  if (activeSessionToken) {
    return getNewGitHubUser(activeSessionToken);
  } else {
    return null;
  }
}

async function getSessionToken(): Promise<string | null> {
  const cachedSessionToken = getLocalStore("sb-wfzpewmlyiozupulbuur-auth-token") as OAuthToken;
  if (cachedSessionToken) {
    return cachedSessionToken.provider_token;
  }
  const newSessionToken = await getNewSessionToken();
  if (newSessionToken) {
    return newSessionToken;
  }
  console.error("No session token found");
  return null;
}

async function getNewSessionToken(): Promise<string | null> {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substr(1)); // remove the '#' and parse
  const providerToken = params.get("provider_token");
  if (!providerToken) {
    return null;
  }
  return providerToken;
}

async function getNewGitHubUser(providerToken: string): Promise<GitHubUser> {
  const octokit = new Octokit({ auth: providerToken });
  const response = (await octokit.request("GET /user")) as GitHubUserResponse;
  return response.data;
}
