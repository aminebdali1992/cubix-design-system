import { GithubIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import { getGitHubStars } from "@/lib/github";
import { siteConfig } from "@/lib/site";

const starsFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const STAR_COUNT_THRESHOLD = 100;

export async function GitHubLink() {
  const stars = await getGitHubStars();
  const showStarCount = stars !== null && stars > STAR_COUNT_THRESHOLD;
  const label = showStarCount
    ? `Cubix on GitHub, ${stars} stars`
    : "Cubix on GitHub";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5"
      nativeButton={false}
      render={
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
        />
      }
    >
      <GithubIcon />
      {showStarCount ? (
        <span className="text-muted-foreground tabular-nums">
          {starsFormatter.format(stars)}
        </span>
      ) : (
        "GitHub"
      )}
    </Button>
  );
}
