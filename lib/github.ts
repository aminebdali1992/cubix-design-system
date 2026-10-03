import { siteConfig } from "@/lib/site";

const STARS_REVALIDATE_SECONDS = 60 * 60;
const GITHUB_API_TIMEOUT_MS = 5000;

function readStargazers(value: unknown): number | null {
  if (
    typeof value === "object" &&
    value !== null &&
    "stargazers_count" in value &&
    typeof value.stargazers_count === "number"
  ) {
    return value.stargazers_count;
  }
  return null;
}

/**
 * Live stargazer count for the Cubix repository, cached for an hour.
 * Returns null when GitHub is unreachable or rate limited so callers can
 * render without a number instead of a stale or invented one.
 */
export async function getGitHubStars(): Promise<number | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${siteConfig.githubRepo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: STARS_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(GITHUB_API_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return readStargazers(await response.json());
  } catch {
    return null;
  }
}
