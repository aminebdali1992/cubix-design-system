# Releasing

## Documentation site and registry

The site and the registry at https://cubixflow.ir/r deploy automatically from `main`. To ship component changes, run `npm run registry:build`, commit the regenerated `public/r` files, and merge to `main`.

## cubix-ui CLI

Preferred path: npm Trusted Publishing from GitHub Actions (no long-lived npm token).

1. On https://www.npmjs.com/package/cubix-ui/access → Trusted Publisher, connect GitHub Actions:
   - Organization or user: `aminebdali1992`
   - Repository: `cubix-design-system`
   - Workflow filename: `release-cli.yml` (filename only, not a path)
   - Allowed actions: enable **npm publish** (configs created after 2026-09-03 default to stage-only; direct `npm publish` will 404 without this)
2. Do **not** add an `NPM_TOKEN` secret for this workflow. An empty `_authToken` from `actions/setup-node` `registry-url` blocks OIDC; the release workflow intentionally omits `registry-url`.
3. Update `version` in `packages/cubix/package.json` following semantic versioning.
4. Verify the package:

   ```bash
   npm run typecheck -w cubix-ui
   npm pack -w cubix-ui --dry-run
   ```

5. Commit the version bump, then tag and push:

   ```bash
   git tag cubix-ui@<version>
   git push origin main
   git push origin cubix-ui@<version>
   ```

6. The `Release CLI` workflow publishes with OIDC. Confirm:

   ```bash
   npx cubix-ui@latest --version
   ```

Manual publish is still possible with `npm publish -w cubix-ui` when you are logged in locally. Prefer Trusted Publishing for releases.