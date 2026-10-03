# Releasing

## Documentation site and registry

The site and the registry at https://cubixflow.ir/r deploy automatically from `main`. To ship component changes, run `npm run registry:build`, commit the regenerated `public/r` files, and merge to `main`.

## cubix-ui CLI

1. Update `version` in `packages/cubix/package.json` following semantic versioning.
2. Verify the package:

   ```bash
   npm run typecheck -w cubix-ui
   npm pack -w cubix-ui --dry-run
   ```

3. Publish. `prepublishOnly` typechecks and builds before the upload. npm requires two-factor authentication for the account, or a granular access token with publish rights for `cubix-ui`.

   ```bash
   npm publish -w cubix-ui
   ```

4. Tag the release and push the tag:

   ```bash
   git tag cubix-ui@<version>
   git push origin cubix-ui@<version>
   ```

5. Confirm the published version runs:

   ```bash
   npx cubix-ui@latest --version
   ```
