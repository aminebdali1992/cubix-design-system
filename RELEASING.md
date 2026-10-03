# Releasing

## Documentation site and registry

The site and the registry at https://cubixflow.ir/r deploy automatically from `main`. To ship component changes, run `npm run registry:build`, commit the regenerated `public/r` files, and merge to `main`.

## cubix-ui CLI

Releases are driven by git tags. The `Release CLI` workflow publishes `packages/cubix` to npm.

### Auth

Use one of these:

1. **Repo secret `NPM_TOKEN`** (current working path): a granular access token with read/write on the package (and bypass 2FA while npm still allows it for direct publish).
2. **Trusted Publishing (OIDC)**: on https://www.npmjs.com/package/cubix-ui/access connect GitHub Actions with:
   - Organization or user: `aminebdali1992`
   - Repository: `cubix-design-system`
   - Workflow filename: `release-cli.yml`
   - Allowed actions: enable **npm publish** (configs created after 2026-09-03 default to stage-only)

Do not set `registry-url` on `actions/setup-node` for this workflow. An empty `_authToken` blocks OIDC.

### Release steps

1. Update `version` in `packages/cubix/package.json`.
2. Verify:

   ```bash
   npm run typecheck -w cubix-ui
   npm pack -w cubix-ui --dry-run
   npm run smoke:cli -- --cli local --base base
   ```

3. Commit on `main`, then create and push the matching tag (do **not** publish locally first):

   ```bash
   git push origin main
   git tag -a cubix-ui@<version> -m "cubix-ui@<version>"
   git push origin cubix-ui@<version>
   ```

4. Confirm the workflow and the published version:

   ```bash
   npx cubix-ui@<version> --version
   ```

The workflow is idempotent: if `cubix-ui@<version>` is already on npm, it skips publish and succeeds. You can also re-run a tag from Actions → Release CLI → Run workflow.

### Manual publish

Use `npm publish -w cubix-ui --access public` only when you are logged in locally and you will **not** also push the same version tag, or accept that Actions will no-op after the version exists.
