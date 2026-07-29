plugins {
    id("com.android.application")
}

android {
    namespace = "com.herguardian.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.herguardian.app"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    // Prevent duplicate native lib errors (required for Vosk)
    packagingOptions {
        pickFirst("lib/arm64-v8a/libvosk.so")
        pickFirst("lib/armeabi-v7a/libvosk.so")
        pickFirst("lib/x86/libvosk.so")
        pickFirst("lib/x86_64/libvosk.so")
    }
}

dependencies {
    implementation("com.google.android.material:material:1.12.0")
    // Vosk (auto-download from Maven Central)
    implementation("com.alphacephei:vosk-android:0.3.47")
    // Retrofit
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.11.0")

    // Android basics
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.core:core-ktx:1.12.0")
}