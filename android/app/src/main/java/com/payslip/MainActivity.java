package com.payslip;

import com.facebook.react.ReactActivity;
import uk.co.chrisjenx.calligraphy.CalligraphyContextWrapper;
import android.content.Context;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Payslip";
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(CalligraphyContextWrapper.wrap(newBase));
    }
}
