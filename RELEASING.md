# Releasing

## Documentation site and registry

The site and the registry at https://cubixflow.ir/r deploy automatically from `main`. To ship component changes, run `npm run registry:build`, commit the regenerated `public/r` files, and merge to `main`.

## cubix-ui CLI

Preferred path: npm Trusted Publishing from GitHub Actions (no long-lived npm token).

1. On https://www.npmjs.com/package/cubix-ui → Access → Trusted Publisher, connect GitHub Actions:
   - Repository: `aminebdali1992/cubix-design-system`
   - Workflow: `release-cli.yml`
2. Update `version` in `packages/cubix/package.json` following semantic versioning.
3. Verify the package:

   ```bash
   npm run typecheck -w cubix-ui
   npm pack -w cubix-ui --dry-run
   ```

4. Commit the version bump, then tag and push:

   ```bash
   git tag cubix-ui@<version>
   git push origin main
   git push origin cubix-ui@<version>
   ```

5. The `Release CLI` workflow publishes with OIDC. Confirm:

   ```bash
   npx cubix-ui@latest --version
   ```

Manual publish is still possible with `npm publish -w cubix-ui` when you are logged in locally. Prefer Trusted Publishing for releases.