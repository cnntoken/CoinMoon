package com.stark;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNCWebViewPackage(),
            new PickerPackage(),
            new FastImageViewPackage(),
            new RNLanguagesPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new RNAWSCognitoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    SoLoader.init(this, /* native exopackage */ false);
  }
}
