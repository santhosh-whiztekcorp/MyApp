# Release Strategy — Dev, QA & Production

This document covers the complete release strategy for MyApp including branching, versioning, bundle IDs, secrets management, build management, and rollbacks for both Android and iOS.

---

## 1. Branching Strategy

Use a single `main` branch with **short-lived feature branches** and **environment-specific tags**. Do NOT maintain separate long-lived branches per environment — they cause merge conflicts and drift.

```
main                        ← always production-ready code
├── feature/login           ← developer feature branch
├── feature/payment         ← developer feature branch
├── fix/crash-on-launch     ← hotfix branch
└── release/1.2.0           ← optional release branch for stabilization
```

### Flow

```
feature branch
    └── PR → main
              └── tag v1.2.0-dev    ← triggers Dev build
              └── tag v1.2.0-qa     ← triggers QA build
              └── tag v1.2.0        ← triggers Production build
```

### Rules

| Branch      | Purpose                          | Who pushes     |
| ----------- | -------------------------------- | -------------- |
| `main`      | Production-ready code            | PR merges only |
| `feature/*` | New features                     | Developers     |
| `fix/*`     | Bug fixes                        | Developers     |
| `release/*` | Release stabilization (optional) | Lead developer |

---

## 2. Versioning

React Native has two version systems — keep them in sync manually or via script.

### Version Format

```
vMAJOR.MINOR.PATCH

v1.0.0    ← first release
v1.1.0    ← new features
v1.1.1    ← bug fix
v2.0.0    ← breaking change
```

### Android — `android/app/build.gradle`

```groovy
android {
    defaultConfig {
        versionCode 10          // ← increment by 1 every build (Play Store requires this)
        versionName "1.2.0"     // ← human readable version
    }
}
```

|             | `versionCode`              | `versionName`        |
| ----------- | -------------------------- | -------------------- |
| What it is  | Integer, e.g. 10           | String, e.g. "1.2.0" |
| Who sees it | Play Store internally      | Users see this       |
| Rule        | Must increase every upload | Free format          |

### iOS — `ios/MyApp/Info.plist`

```xml
<key>CFBundleShortVersionString</key>
<string>1.2.0</string>          <!-- user-facing version -->

<key>CFBundleVersion</key>
<string>10</string>             <!-- build number, must increase every upload -->
```

### Keep Them in Sync

Update `package.json` version too:

```json
{
  "version": "1.2.0"
}
```

Use this script to bump all three at once — add to `package.json`:

```json
{
  "scripts": {
    "version:bump": "node scripts/bump-version.js"
  }
}
```

Create `scripts/bump-version.js`:

```javascript
const fs = require('fs');
const version = process.argv[2]; // e.g. node bump-version.js 1.2.0
const buildNumber = process.argv[3]; // e.g. node bump-version.js 1.2.0 11

if (!version || !buildNumber) {
  console.error('Usage: node bump-version.js <version> <buildNumber>');
  process.exit(1);
}

// Update package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = version;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// Update android/app/build.gradle
let gradle = fs.readFileSync('android/app/build.gradle', 'utf8');
gradle = gradle.replace(/versionCode \d+/, `versionCode ${buildNumber}`);
gradle = gradle.replace(/versionName ".*"/, `versionName "${version}"`);
fs.writeFileSync('android/app/build.gradle', gradle);

// Update ios/MyApp/Info.plist
let plist = fs.readFileSync('ios/MyApp/Info.plist', 'utf8');
plist = plist.replace(
  /<key>CFBundleShortVersionString<\/key>\s*<string>.*<\/string>/,
  `<key>CFBundleShortVersionString</key>\n\t<string>${version}</string>`,
);
plist = plist.replace(
  /<key>CFBundleVersion<\/key>\s*<string>.*<\/string>/,
  `<key>CFBundleVersion</key>\n\t<string>${buildNumber}</string>`,
);
fs.writeFileSync('ios/MyApp/Info.plist', plist);

console.log(`✅ Bumped to version ${version} (build ${buildNumber})`);
```

Usage:

```bash
node scripts/bump-version.js 1.2.0 11
```

---

## 3. Bundle IDs / Application IDs per Environment

Give each environment a **separate bundle ID** so Dev, QA and Production can be installed on the same device simultaneously.

### Android — `android/app/build.gradle`

```groovy
android {
    defaultConfig {
        applicationId "com.myapp"           // Production base ID
    }

    buildTypes {
        debug {
            applicationIdSuffix ".dev"      // com.myapp.dev
        }
        release {
            applicationIdSuffix ""          // com.myapp (production)
        }
    }
}
```

For QA — use **Product Flavors**:

```groovy
android {
    flavorDimensions "environment"

    productFlavors {
        dev {
            dimension "environment"
            applicationIdSuffix ".dev"          // com.myapp.dev
            resValue "string", "app_name", "MyApp Dev"
        }
        qa {
            dimension "environment"
            applicationIdSuffix ".qa"           // com.myapp.qa
            resValue "string", "app_name", "MyApp QA"
        }
        production {
            dimension "environment"
            applicationIdSuffix ""              // com.myapp
            resValue "string", "app_name", "MyApp"
        }
    }
}
```

Build commands per flavor:

```bash
# Dev debug
cd android && ./gradlew assembleDevDebug

# QA release APK
cd android && ./gradlew assembleQaRelease

# Production release AAB (Play Store)
cd android && ./gradlew bundleProductionRelease
```

### iOS — Bundle IDs in Xcode

Create 3 separate targets or use schemes with different bundle IDs:

| Environment | Bundle ID       |
| ----------- | --------------- |
| Dev         | `com.myapp.dev` |
| QA          | `com.myapp.qa`  |
| Production  | `com.myapp`     |

In Xcode:

1. Go to **Target → Build Settings → Product Bundle Identifier**
2. Set per scheme:
   - `MyApp Dev` scheme → `com.myapp.dev`
   - `MyApp QA` scheme → `com.myapp.qa`
   - `MyApp Production` scheme → `com.myapp`

---

## 4. Secrets Management

### What counts as a secret

| Secret                      | Android                        | iOS                  |
| --------------------------- | ------------------------------ | -------------------- |
| Keystore + passwords        | `local.properties`             | N/A                  |
| API keys (maps, push, etc.) | `local.properties` or env vars | Xcode build settings |
| Signing certificates        | `local.properties`             | Mac Keychain / Xcode |
| Provisioning profiles       | N/A                            | Xcode auto / manual  |

### Android Secrets — `android/local.properties`

```properties
# SDK
sdk.dir=C:\\Users\\Santhosh\\AppData\\Local\\Android\\Sdk

# Release signing
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=yourpassword
MYAPP_RELEASE_KEY_PASSWORD=yourpassword

# API Keys (if needed natively)
MAPS_API_KEY=your_maps_api_key
```

### iOS Secrets — Xcode Build Settings

1. Go to **Xcode → Target → Build Settings → User-Defined**
2. Add keys like `MAPS_API_KEY`
3. Reference in `Info.plist`:

```xml
<key>MapsApiKey</key>
<string>$(MAPS_API_KEY)</string>
```

Set different values per scheme (Dev / QA / Production).

### Never Commit Secrets

```gitignore
# .gitignore
android/local.properties
android/app/*.keystore
ios/GoogleService-Info.plist
.env
.env.*
*.p12
*.mobileprovision
```

---

## 5. Build Management

### Android Build Outputs

| Command                   | Output | Use for     |
| ------------------------- | ------ | ----------- |
| `assembleDevDebug`        | `.apk` | Dev testing |
| `assembleQaRelease`       | `.apk` | QA testing  |
| `bundleProductionRelease` | `.aab` | Play Store  |

Output location:

```
android/app/build/outputs/
├── apk/
│   ├── dev/debug/app-dev-debug.apk
│   └── qa/release/app-qa-release.apk
└── bundle/
    └── production/release/app-production-release.aab
```

### iOS Build Outputs

| Method              | Output             | Use for                |
| ------------------- | ------------------ | ---------------------- |
| Run via CLI         | Installed directly | Dev testing            |
| Archive → Ad Hoc    | `.ipa`             | QA testing             |
| Archive → App Store | Uploaded           | TestFlight / App Store |

### Distribution per Environment

| Environment | Android             | iOS                             |
| ----------- | ------------------- | ------------------------------- |
| Dev         | Direct APK / USB    | Xcode direct install            |
| QA          | APK shared via link | TestFlight internal             |
| Production  | Play Store          | App Store / TestFlight external |

---

## 6. Git Tagging Strategy

Tag every build that goes to QA or Production:

```bash
# QA build
git tag v1.2.0-qa
git push origin v1.2.0-qa

# Production build
git tag v1.2.0
git push origin v1.2.0
```

### Tag Naming Convention

```
v1.2.0          ← Production release
v1.2.0-qa       ← QA build
v1.2.0-dev      ← Dev build (optional)
v1.2.1-hotfix   ← Emergency fix
```

This means you can always trace **exactly what code** was in any build.

---

## 7. Rollbacks

### Android Rollback

Play Store does not allow uploading a lower `versionCode`. Options:

**Option 1 — Staged rollout halt (fastest)**

```
Play Console → Release → Production →
Managed publishing → Halt rollout
```

Stops the bad build from reaching more users.

**Option 2 — Re-release previous version**

- Checkout the previous tag: `git checkout v1.1.0`
- Bump `versionCode` higher than the bad build (e.g. bad = 11, re-release = 12)
- Build and upload the AAB again

```bash
git checkout v1.1.0
# bump versionCode to 12 in build.gradle
cd android && ./gradlew bundleProductionRelease
# upload to Play Console
```

### iOS Rollback

App Store does not serve old versions automatically. Options:

**Option 1 — Remove from sale (fastest)**

```
App Store Connect → MyApp →
Pricing and Availability → Remove from sale
```

**Option 2 — Expedited review (re-release old version)**

- Checkout the previous tag: `git checkout v1.1.0`
- Bump `CFBundleVersion` higher
- Archive and submit with **expedited review request**

```bash
git checkout v1.1.0
# bump build number in Info.plist
# Archive via Xcode → Distribute → App Store Connect
```

**Option 3 — TestFlight rollback**
For TestFlight builds, testers can manually install a previous build from the TestFlight app until it expires (90 days).

---

## 8. Summary Checklist

### Before Every QA Build

- [ ] Version bumped (`npm run version:bump`)
- [ ] Changes merged to `main` via PR
- [ ] Git tag created (`v1.2.0-qa`)
- [ ] Build generated and distributed

### Before Every Production Release

- [ ] QA sign-off received
- [ ] Version and build number bumped
- [ ] Git tag created (`v1.2.0`)
- [ ] Android AAB uploaded to Play Console
- [ ] iOS IPA submitted to App Store Connect
- [ ] Staged rollout used (don't release 100% at once)

### Staged Rollout Recommendation

| Day     | Android rollout % | iOS                   |
| ------- | ----------------- | --------------------- |
| Day 1   | 10%               | TestFlight external   |
| Day 2-3 | 50%               | Monitor crash reports |
| Day 4-5 | 100%              | Full release          |

---

## 9. Recommended Tools

| Tool                                                                               | Purpose                           |
| ---------------------------------------------------------------------------------- | --------------------------------- |
| [Fastlane](https://fastlane.tools)                                                 | Automate builds, signing, uploads |
| [Firebase App Distribution](https://firebase.google.com/products/app-distribution) | Distribute Dev/QA APK and IPA     |
| [Sentry](https://sentry.io)                                                        | Crash reporting per environment   |
| [TestFlight](https://developer.apple.com/testflight/)                              | iOS QA distribution               |
| [Play Console](https://play.google.com/console)                                    | Android staged rollouts           |
