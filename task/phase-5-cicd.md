# Phase 5: CI/CD Pipeline

**Priority: MEDIUM** | **Estimated Time: 1-2 days**

## Goal
Set up GitHub Actions for automated testing, building, and deployment.

## Tasks

### 5.1 GitHub Actions Setup
- [ ] Create `.github/workflows/ci.yml` for pull requests
- [ ] Create `.github/workflows/deploy.yml` for production deployment
- [ ] Set up Node.js and pnpm caching for faster builds
- [ ] Configure environment variables for CI
- [ ] Add workflow status badges to README

### 5.2 Quality Checks Pipeline
- [ ] Run `pnpm lint` on every PR
- [ ] Run `pnpm test` (unit tests)
- [ ] Run type checking: `pnpm tsc --noEmit`
- [ ] Run build verification: `pnpm build`
- [ ] Add dependency audit: `pnpm audit`

### 5.3 Deployment Pipeline
- [ ] Configure Vercel deployment (or other platform)
- [ ] Set up preview deployments for PRs
- [ ] Add production deployment on main branch merge
- [ ] Configure environment variables for staging/production
- [ ] Add deployment notifications (Discord/Slack webhook)

### 5.4 Security & Secrets
- [ ] Add required secrets to GitHub repository:
  - `NEXT_PUBLIC_PROJECT_ID`
  - `NEXT_PUBLIC_ALCHEMY_KEY`
  - `GROQ_API_KEY`
  - `PINATA_JWT`
  - `PINATA_GATEWAY_URL`
- [ ] Ensure secrets are never logged in CI
- [ ] Add secret scanning to prevent leaks
- [ ] Configure branch protection rules

### 5.5 Automated Checks
- [ ] Add PR template with checklist
- [ ] Configure CodeQL for security analysis
- [ ] Add Dependabot for dependency updates
- [ ] Set up automated browser testing with Playwright
- [ ] Add bundle size monitoring

## Acceptance Criteria
- [ ] CI runs on every PR with all checks passing
- [ ] Preview deployments work for feature branches
- [ ] Production deployment is automated on merge to main
- [ ] All environment variables are configured as secrets
- [ ] Failed builds block PR merging
- [ ] Deployment status is visible in PR checks

## Files to Create
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/pull_request_template.md`
- `.github/dependabot.yml`
- `.github/workflows/codeql.yml` (optional)

## CI Workflow Structure

### ci.yml
```yaml
name: CI
on: [pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm tsc --noEmit
      - run: pnpm test
      - run: pnpm build
```

### deploy.yml
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm build
      - name: Deploy to Vercel
        uses: vercel/action-deploy@v1
```

## Branch Protection Rules
- Require PR reviews before merging (1 approval)
- Require status checks to pass (CI workflow)
- Require branches to be up to date
- Restrict pushes to main (only via PR)

## Notes
- Use pnpm caching to speed up builds
- Set NODE_ENV=production for build verification
- Test deployments on a staging branch first
- Monitor build times and optimize if >5 minutes
- Consider parallel jobs for lint/test/build
