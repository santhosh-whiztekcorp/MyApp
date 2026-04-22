# MyApp

A React Native application for Android & iOS.

---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or above)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS — Mac only)
- [JDK 17](https://www.oracle.com/java/technologies/downloads/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/santhosh-whiztekcorp/MyApp.git
cd MyApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup `local.properties` (Android)

Copy the example file and update it with your machine's paths and credentials:

```bash
cp android/local.properties.example android/local.properties
```

Then open `android/local.properties` and update:

- **Mac:** `sdk.dir=/Users/yourname/Library/Android/sdk`
- **Windows:** `sdk.dir=C:\\Users\\yourname\\AppData\\Local\\Android\\Sdk`
- **Linux:** `sdk.dir=/home/yourname/Android/Sdk`

Also add version and signing config (for local/emergency builds):

```properties
VERSION_CODE=1
VERSION_NAME=1.0.0

MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

> ⚠️ `local.properties` is gitignored — never commit it to the repo.
> ℹ️ In normal workflow CI/CD injects these values automatically via tag.

### 4. Install iOS Pods (iOS only)

```bash
cd ios && pod install && cd ..
```

---

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Android

```bash
# Debug (local development only)
npm run android

# Release builds are handled by CI/CD via git tags
# Emergency local build only:
cd android && ./gradlew assembleRelease   # APK
cd android && ./gradlew bundleRelease     # AAB
```

### iOS

```bash
# Debug - Simulator
npm run ios

# Debug - Specific simulator
npm run ios -- --simulator="iPhone 15"

# Debug - Physical device
npm run ios -- --device="Your iPhone Name"

# Release - via Xcode
# Open ios/MyApp.xcworkspace → Product → Archive
```

---

## Release Build Setup

### Android

1. Generate a release keystore (one time only):

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore android/app/my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 \
  -validity 10000
```

2. Add signing credentials to `android/local.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

3. Build per environment:

```bash
# Dev → APK → internal track
cd android && ./gradlew assembleDebug

# QA → APK → closed track / Firebase App Distribution
cd android && ./gradlew assembleRelease

# Production → AAB → Play Store
cd android && ./gradlew bundleRelease
```

> ⚠️ In normal workflow, CI/CD handles all builds automatically when a tag is pushed. Build locally only in emergencies.

Output: `android/app/build/outputs/`

### iOS

#### Prerequisites

- Mac with Xcode installed
- Apple Developer account (free for debug, paid $99/year for release/App Store)
- App registered on [Apple Developer Portal](https://developer.apple.com)

---

#### Debug Build

Xcode handles debug signing automatically with your Apple ID — no manual setup needed.

1. Open the project in Xcode:

```bash
open ios/MyApp.xcworkspace
```

2. Go to **Xcode → MyApp Target → Signing & Capabilities**

3. Under **Debug**:

   - ✅ Enable **Automatically manage signing**
   - Select your **Team** (your Apple ID)
   - Xcode auto-creates a development certificate & provisioning profile

4. Run on device or simulator:

```bash
# Simulator
npm run ios

# Specific simulator
npm run ios -- --simulator="iPhone 15"

# Physical device
npm run ios -- --device="Your iPhone Name"
```

---

#### Release Build (IPA for App Store / TestFlight)

1. Open `ios/MyApp.xcworkspace` in Xcode

2. Go to **Xcode → MyApp Target → Signing & Capabilities**

3. Under **Release**:

   - ✅ Enable **Automatically manage signing**
   - Select your **Team**
   - Xcode auto-creates a Distribution certificate & App Store provisioning profile

4. Set the scheme to **Release**:

```
Xcode → Product → Scheme → Edit Scheme → Run → Build Configuration → Release
```

5. Select **Any iOS Device (arm64)** as the build target (not a simulator)

6. Archive the app:

```
Xcode → Product → Archive
```

7. Once archived, **Xcode Organizer** opens automatically:
   - Click **Distribute App**
   - Choose **App Store Connect** (for App Store / TestFlight)
   - Or choose **Ad Hoc** (for direct device distribution)
   - Follow the steps and Xcode uploads automatically

Output IPA location (Ad Hoc):

```
~/Library/Developer/Xcode/Archives/
```

---

#### Debug vs Release — Key Differences

|                 | Debug                   | Release                         |
| --------------- | ----------------------- | ------------------------------- |
| Signing         | Development Certificate | Distribution Certificate        |
| Provisioning    | Development Profile     | App Store / Ad Hoc Profile      |
| JS Bundle       | Loaded from Metro       | Bundled into app                |
| Hermes          | Optional                | Recommended ✅                  |
| Installable via | Xcode / RN CLI          | TestFlight / App Store / Ad Hoc |
| Apple account   | Free Apple ID           | Paid Developer ($99/year)       |

---

## Project Structure

```
MyApp/
├── android/                  # Android native code
│   ├── app/
│   │   ├── build.gradle      # Android build config
│   │   └── src/
│   ├── local.properties      # Local machine config (gitignored)
│   └── local.properties.example  # Template for local.properties
├── ios/                      # iOS native code
├── src/                      # React Native source code
├── index.js                  # App entry point
└── package.json
```

---

## Environment Files

| File                               | Committed | Purpose                                         |
| ---------------------------------- | --------- | ----------------------------------------------- |
| `android/local.properties`         | ❌ No     | Machine-specific SDK path & signing credentials |
| `android/local.properties.example` | ✅ Yes    | Template for developers to copy                 |
| `android/app/*.keystore`           | ❌ No     | Release signing keystore                        |

---

## Troubleshooting

**Metro bundler cache issue:**

```bash
npm start -- --reset-cache
```

**Android build issue:**

```bash
cd android && ./gradlew clean
```

**iOS build issue:**

```bash
cd ios && pod deintegrate && pod install
```

**Check Android SDK path:**

```
Android Studio → Settings → Languages & Frameworks → Android SDK → Android SDK Location
```

---

## Contributing

1. Clone the repository and switch to the frontend branch:

```bash
git clone https://github.com/santhosh-whiztekcorp/MyApp.git
git checkout development-frontend
```

2. Create your feature or fix branch from `development-frontend`:

```bash
git checkout -b feature/my-feature
# or
git checkout -b fix/my-fix
```

3. Commit your changes:

```bash
git commit -m 'feat: add my feature'
```

4. Push your branch:

```bash
git push origin feature/my-feature
```

5. Open a Pull Request targeting `development-frontend`

> ⚠️ Never push directly to `development-frontend`. Always use a PR.

---

## License

This project is licensed under the MIT License.
