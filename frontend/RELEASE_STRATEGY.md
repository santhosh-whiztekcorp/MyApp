# Release Strategy — MyApp

This document covers the complete release strategy for MyApp including branching, versioning, environment workflows, CI/CD flow, and rollbacks for both Android and iOS.

---

## 1. Branch Structure

### Structure

```
repo/
├── development-frontend    ← frontend source of truth
└── development-backend     ← backend (separate, not covered here)
```

### Branch Naming

```
feature/login
feature/payment
bugfix/crash-on-launch
bugfix/qa-login-bug
```

### Rules

```
✅ Always create feature/bugfix branches FROM development-frontend
✅ Always merge back TO development-frontend via PR
✅ Never push directly to development-frontend
✅ development-frontend must always be in a buildable state
```

---

## 2. Versioning

### Two Numbers to Track

|               | What                                                                      | Example |
| ------------- | ------------------------------------------------------------------------- | ------- |
| `versionName` | Human readable version                                                    | 1.0.2   |
| `buildNumber` | Auto incrementing integer — fetched from App Store Connect and Play Store | 6       |

### Format

```
MAJOR.MINOR.PATCH

1.0.0   ← first release
1.0.1   ← bug fix
1.1.0   ← new feature
2.0.0   ← breaking change
```

### Tag Naming

```
v1.0.0    ← first prod release
v1.0.1    ← patch
v1.1.0    ← minor
v2.0.0    ← major
```

---

## 3. Workflows

### 4.1 Development

All development work happens locally. No CI/CD is involved at this stage.

```bash
# run debug build locally
npm run android
npm run ios
```

When a feature or bugfix is complete, the developer raises a PR to `development-frontend`.

**Before raising a PR:**

```
✅ pull latest development-frontend
✅ resolve all conflicts locally
✅ code review by at least one other developer
```

---

### 4.2 QA

Every merge to `development-frontend` automatically triggers a QA build. All developers work on the same branch and QA always tests the latest combined code.

**Build distribution:**

```
Android → APK → Play Store closed testing
iOS     → IPA → TestFlight internal
```

**Multiple developers merging:**

```
dev1 merges feature/feature1  → QA build 1
dev2 merges feature/feature2  → QA build 2  (has feature1 + feature2)
dev1 merges bugfix/qa-bug     → QA build 3  (has everything latest)
```

**Version across QA iterations:**

```
QA build 1  → versionName 1.0.2, buildNumber 5
QA build 2  → versionName 1.0.2, buildNumber 6
QA build 3  → versionName 1.0.2, buildNumber 7  ← QA approved ✅
```

Across QA iterations, `versionName` stays the same — only `buildNumber` increments, fetched automatically from TestFlight and Play Store. If a new prod tag is released during a QA cycle, `versionName` is recalculated on the next push.

---

### 4.3 Production

Once QA approves, the developer creates a prod tag on `development-frontend`. This is the only manual action required to trigger a production release.

```bash
git tag v1.0.2
git push origin v1.0.2
```

**Build distribution:**

```
Android → AAB → Play Store production track
iOS     → IPA → App Store Connect
```

**Staged rollout — do not release 100% at once:**

| Day     | Android | iOS                   |
| ------- | ------- | --------------------- |
| Day 1   | 10%     | App Store             |
| Day 2-3 | 50%     | monitor crash reports |
| Day 4-5 | 100%    | full release          |

---

### 4.4 Trigger Summary

```
Trigger                        Tag          CI/CD action
────────────────────────────────────────────────────────
push to development-frontend   (no tag)     QA build
QA approved                    v1.0.2       Prod build
```

---

## 4. CI/CD Flow

### 4.1 QA Build (push to `development-frontend`)

```
developer merges PR to development-frontend
                │
                ▼
        CI/CD triggered by push
                │
                ▼
        fetch latest prod tag
        calculate versionName (tag + 0.0.1)
        fetch latest buildNumber from TestFlight + Play Store
        increment buildNumber by 1
        inject versionName + buildNumber into android/local.properties
        set versionName + buildNumber in iOS project via Xcode build settings
                │
                ▼
        build APK (Android)
        build IPA (iOS)
                │
                ▼
        upload APK → Play Store closed testing
        upload IPA → TestFlight internal
                │
                ▼
        QA team notified
```

**Example:**

```
latest prod tag = v1.0.1  →  versionName = 1.0.2
latest prod tag = v1.0.2  →  versionName = 1.0.3
```

---

### 4.2 Production Build (push tag `v*.*.*`)

```
developer pushes tag v1.0.2
                │
                ▼
        CI/CD triggered by tag
                │
                ▼
        read versionName from tag (1.0.2)
        fetch latest buildNumber from App Store + Play Store
        increment buildNumber by 1
        inject versionName + buildNumber into android/local.properties
        set versionName + buildNumber in iOS project via Xcode build settings
                │
                ▼
        build AAB (Android)
        build IPA (iOS)
                │
                ▼
        upload AAB → Play Store production track
        submit IPA → App Store Connect
                │
                ▼
        staged rollout begins
```

**Example:**

```
latest prod tag = v1.0.1  →  versionName = 1.0.2
latest prod tag = v1.0.2  →  versionName = 1.0.3
```

---

### 4.3 Trigger Summary

| Event                             | CI/CD Action                  |
| --------------------------------- | ----------------------------- |
| Push to `development-frontend`    | APK + IPA → QA closed testing |
| Push tag `v*.*.*`                 | AAB + IPA → Production stores |
| Push to `feature/*` or `bugfix/*` | No build triggered            |

---

### 4.4 Build Outputs

| Environment | Android     | iOS                 | Distribution                            |
| ----------- | ----------- | ------------------- | --------------------------------------- |
| Dev         | APK (local) | Run via Xcode / CLI | Direct install                          |
| QA          | APK         | IPA                 | Play Store closed / TestFlight internal |
| Prod        | AAB         | IPA                 | Play Store / App Store                  |

---

### 4.5 Emergency Local Build

Use only when CI/CD is unavailable (server down, config broken, limits reached etc).

**Step 1 — Get the latest buildNumber manually**

```
Android → Play Store Console → App releases → latest build
iOS     → App Store Connect → TestFlight → latest build number
```

**Step 2 — Update version values**

Android — update `android/local.properties`:

```properties
VERSION_NAME=1.0.4
VERSION_CODE=8        # latest buildNumber + 1
```

iOS — update `ios/MyApp/Info.plist`:

```xml
<key>CFBundleShortVersionString</key>
<string>1.0.4</string>

<key>CFBundleVersion</key>
<string>8</string>
```

**Step 3 — Build**

```bash
# Android
cd android && ./gradlew bundleRelease
```

```
# iOS
Xcode → Product → Archive → Distribute App
```

---

## 5. Production Bug — Rollback + Fix Flow

### Step 1 — Halt Immediately

```
Play Console   → Release → Production → Halt rollout
App Store Connect → remove from sale
```

Stops more users receiving the bad build. Done manually via the store consoles.

---

### Step 2 — Revert `development-frontend` to Last Stable

```bash
git checkout development-frontend
git reset --hard v1.0.1
git push origin development-frontend --force
```

> ⚠️ Warn ALL developers before force pushing. Every other developer must **stop their current work** and immediately sync their local machine:
>
> ```bash
> git fetch origin
> git reset --hard origin/development-frontend
> ```
>
> **Do NOT use `git stash`** — if your local changes overlap with the reverted files, popping the stash later will reintroduce the bad code.
> Instead, manually copy any unrelated local changes to a safe place first, then reset. Re-apply only those unrelated changes after syncing.

---

### Step 3 — Release Last Stable Code as New Version

```bash
git tag v1.0.3
git push origin v1.0.3
```

CI/CD reads `versionName` from the tag and fetches `buildNumber` automatically from App Store Connect and Play Store. Users on the bad `1.0.2` build receive `1.0.3`, which contains the stable `1.0.1` code.

---

### Step 4 — Fix the Actual Bug

```bash
git checkout development-frontend
git checkout -b bugfix/production-crash

# cherry pick the bad tag to inspect what introduced the bug
git cherry-pick v1.0.2

# fix the bug

git push origin bugfix/production-crash

# raise PR on GitHub → get code review → merge to development-frontend

git tag v1.0.4
git push origin v1.0.4
```

---

### Full Rollback Timeline

```
v1.0.1    ← last stable prod       (buildNumber 4)
v1.0.2    ← bad prod release       (buildNumber 5) ← bug found, halt rollout
v1.0.3    ← rollback release       (buildNumber 6) ← 1.0.1 code, users safe
v1.0.4    ← actual bug fix         (buildNumber 7) ← everyone on fix ✅
```
