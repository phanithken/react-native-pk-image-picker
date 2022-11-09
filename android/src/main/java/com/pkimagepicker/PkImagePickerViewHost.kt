package com.pkimagepicker

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.content.DialogInterface
import android.view.ViewGroup
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.FabricViewStateManager
import com.facebook.react.uimanager.events.EventDispatcher
import com.facebook.react.views.common.ContextUtils

open class PkImagePickerViewHost(context: Context): ViewGroup(context), LifecycleEventListener, FabricViewStateManager.HasFabricViewStateManager {
  companion object {
    var TAG = "PkImagePickerHost"
  }

  // A listener when the user presses KeyEvent.KEYCODE_BACK
  public interface OnRequestCloseListener {
    fun onRequestClose(dialog: DialogInterface)
  }

  private lateinit var mHost: DialogInterface
  private lateinit var mAnimationType: String
  private var mHardwareAccelerated: Boolean = false
  private var mTransparent: Boolean = false
  private var mStatusBarTranslucent: Boolean = false
  private var mPropertyRequiresNewDialog: Boolean = false
  private var mDialog: Dialog? = null
  private var mOnShowListener: DialogInterface.OnShowListener? = null
  private var mOnRequestCloseListener: OnRequestCloseListener? = null

  override fun onLayout(p0: Boolean, p1: Int, p2: Int, p3: Int, p4: Int) {
    // Do nothing
  }

  override fun onHostResume() {
    TODO("Not yet implemented")
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()

  }

  override fun onHostPause() {
    TODO("Not yet implemented")
  }

  override fun onHostDestroy() {
    TODO("Not yet implemented")
  }

  override fun getFabricViewStateManager(): FabricViewStateManager {
    TODO("Not yet implemented")
  }

  private fun dismiss() {
    UiThreadUtil.assertOnUiThread();
    if (mDialog != null) {
      if (mDialog!!.isShowing) {
        val dialogContext: Activity? = ContextUtils.findContextOfType(mDialog!!.context, Activity::class.java)
        if (dialogContext == null || !dialogContext.isFinishing) {
          mDialog!!.dismiss()
        }
      }
      mDialog = null

      // remove the host from parent
      val parent: ViewGroup = (mHost as ViewGroup).parent as ViewGroup
      parent.removeViewAt(0)
    }
  }

  protected fun setOnRequestCloseListener(listener: OnRequestCloseListener) {
    mOnRequestCloseListener = listener
  }

  protected fun setOnShowListener(listener: DialogInterface.OnShowListener) {
    mOnShowListener = listener
  }

  protected fun setTransparent(transparent: Boolean) {
    mTransparent = transparent
  }

  protected fun setStatusBarTranslucent(statusBarTranslucent: Boolean) {
    mStatusBarTranslucent = statusBarTranslucent
    mPropertyRequiresNewDialog = true
  }

  protected fun setAnimationType(animationType: String) {
    mAnimationType = animationType
    mPropertyRequiresNewDialog = true
  }

  protected fun setHardwareAccelerated(hardwareAccelerated: Boolean) {
    mHardwareAccelerated = hardwareAccelerated
    mPropertyRequiresNewDialog = true
  }

  fun setEventDispatcher(eventDispatcher: EventDispatcher) {

  }
}
