import { execa } from "execa";

import * as logger from "./logger";

/**
 * Initializes a repository with an initial commit. Never fails the scaffold:
 * a missing git binary or identity only produces a warning.
 */
export async function initGitRepository(cwd: string) {
  try {
    await execa("git", ["init"], { cwd });
  } catch {
    logger.warn("git is not available - skipped repository initialization.");
    return;
  }

  try {
    await execa("git", ["add", "-A"], { cwd });
    await execa("git", ["commit", "-m", "Initial commit from Cubix"], { cwd });
  } catch {
    logger.warn(
      "Initialized git, but the initial commit failed. Set git user.name and user.email, then commit."
    );
  }
}
