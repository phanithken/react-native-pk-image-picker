package com.pkimagepicker
import android.graphics.Color
import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.ViewGroupManager;

public class PkImagePickerViewManager(reactContext: ReactApplicationContext) :
  ViewGroupManager<PkImagePickerViewHost>() {

  override fun getName() = "PkImagePickerView"

  @ReactProp(name = "color")
  fun setColor(view: View, color: String) {
    view.setBackgroundColor(Color.parseColor(color))
  }

  override fun createViewInstance(reactContext: ThemedReactContext): PkImagePickerViewHost {
    return PkImagePickerViewHost(reactContext)
  }
}
