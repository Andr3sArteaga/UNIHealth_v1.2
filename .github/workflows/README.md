# GitHub Actions CI/CD Workflow

This directory contains the automated CI/CD pipeline for the UNIHealth mobile application.

## 📋 Workflow Overview

The `ci-cd.yml` workflow automates testing and deployment with the following stages:

### Stage 1: Checkout
- Downloads the repository code to the GitHub Actions runner
- Fetches complete git history for versioning

### Stage 2: Setup & Dependencies
- Configures Node.js v20 environment
- Caches `node_modules` for faster subsequent runs
- Installs all project dependencies using `npm ci`

### Stage 3: Code Quality & Unit Tests
- **TypeScript Type Checking**: Validates all TypeScript code compiles without errors
- **Jest Tests**: Runs unit and integration tests with coverage reporting
- Uploads coverage reports as artifacts (available for 7 days)

### Stage 4: Detox Mobile Tests (E2E)
- Runs on macOS for iOS simulator access
- Executes end-to-end mobile tests using Detox
- Only runs if unit tests pass
- Uploads test artifacts (screenshots, logs) on failure

### Stage 5: Build Validation
- Validates that the Expo app builds successfully
- Ensures no build-time errors exist

### Stage 6: Deploy
- **Trigger**: Only runs on `master` branch when all tests pass
- **Purpose**: Automated deployment to staging/production
- Currently configured as a placeholder - customize for your deployment target

## 🚀 Triggering the Workflow

The workflow automatically triggers on:
- **Push to any branch**: Runs all test stages
- **Pull requests to master**: Runs all test stages
- **Push to master**: Runs all stages including deployment

## 🔐 Required GitHub Secrets

To use this workflow, configure the following secrets in your repository:

1. Navigate to: **Repository Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Secret Name | Description | Required For |
|------------|-------------|--------------|
| `EXPO_TOKEN` | Expo authentication token | Detox tests & Deployment |

### Getting Your EXPO_TOKEN

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Login to your Expo account
expo login

# Generate a token
expo whoami
# Then create a token at: https://expo.dev/accounts/[username]/settings/access-tokens
```

## 📊 Viewing Workflow Results

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select a workflow run to view details
4. Each stage shows:
   - ✅ Success (green checkmark)
   - ❌ Failure (red X)
   - ⏭️ Skipped (gray dash)

## 🛠️ Customizing the Workflow

### Adding Detox Configuration

If Detox is not yet configured, add a `.detoxrc.js` file:

```javascript
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  configurations: {
    'ios.sim.release': {
      device: {
        type: 'iPhone 15'
      },
      app: 'ios.release'
    }
  }
};
```

### Customizing Deployment

Edit the `deploy` job in `ci-cd.yml`:

```yaml
- name: 🚀 Deploy application
  run: |
    # Option 1: Expo Publish (classic)
    npx expo publish --non-interactive
    
    # Option 2: EAS Update
    npx eas-cli update --branch production --message "Auto deploy"
    
    # Option 3: Custom deployment script
    npm run deploy
```

## 🐛 Troubleshooting

### Tests fail in CI but pass locally
- Ensure all dependencies are in `package.json` (not just `node_modules`)
- Check for environment-specific code (file paths, environment variables)

### Detox tests are skipped
- Detox configuration may not be complete
- Add `.detoxrc.js` and E2E test files in `e2e/` directory

### Deployment doesn't trigger
- Verify you're pushing to the `master` branch
- Check that all previous stages passed
- Review the workflow run logs in GitHub Actions

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo CI/CD Guide](https://docs.expo.dev/build/building-on-ci/)
- [Detox Documentation](https://wix.github.io/Detox/)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)

## 🎯 SQA Best Practices

This workflow implements several Software Quality Assurance best practices:

1. **Automated Testing**: Every commit is automatically tested
2. **Staged Pipeline**: Tests run in logical order (unit → integration → E2E)
3. **Fail Fast**: Later stages only run if earlier stages pass
4. **Artifact Collection**: Test results and coverage reports are preserved
5. **Branch Protection**: Deployment only occurs on verified master branch
6. **Continuous Integration**: Code is continuously validated against the test suite
