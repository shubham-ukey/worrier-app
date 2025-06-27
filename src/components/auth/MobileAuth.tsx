import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MobileOTPInput } from "./MobileOTPInput";
import { LoginMethodToggle } from "./LoginMethodToggle";
import { PasswordLoginForm } from "./PasswordLoginForm";
import { OTPLoginForm } from "./OTPLoginForm";
import { SignupForm } from "./SignupForm";
import { useMobileAuth } from "@/hooks/useMobileAuth";
import { useNavigate } from "react-router-dom";

export const MobileAuth = () => {
  const navigate = useNavigate();

  const {
    authMode,
    setAuthMode,
    loginMethod,
    setLoginMethod,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    confirmationResult,
    setConfirmationResult,
    isLoading,
    handlePasswordLogin,
    handleSendOTP,
    handleInputChange,
  } = useMobileAuth();

  // ✅ Updated to accept user from MobileOTPInput
  const handleOTPSuccess = async (user: any) => {
    console.log("OTP verified successfully:", user);
    navigate("/profile"); // ✅ Redirect
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
  };

  // ✅ If OTP screen is active
  if (authMode === "otp") {
    return (
      <MobileOTPInput
        phoneNumber={formData.countryCode + formData.phoneNumber}
        onSuccess={handleOTPSuccess} // ✅ user is passed here
        onBack={() => {
          setAuthMode("signin");
          setConfirmationResult(null);
        }}
        onResendOTP={handleSendOTP}
        confirmationResult={confirmationResult}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      {/* Firebase reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      <Tabs
        value={authMode}
        onValueChange={(value) => setAuthMode(value as any)}
        className="w-full"
      >
        {/* ✅ Sign In */}
        <TabsContent value="signin" className="space-y-4 mt-6">
          <LoginMethodToggle
            loginMethod={loginMethod}
            onMethodChange={setLoginMethod}
          />

          {loginMethod === "password" ? (
            <PasswordLoginForm
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onCountryCodeChange={handleCountryCodeChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onSubmit={handlePasswordLogin}
              onModeChange={setAuthMode}
            />
          ) : (
            <OTPLoginForm
              formData={formData}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onCountryCodeChange={handleCountryCodeChange}
              onSubmit={handleSendOTP}
              onModeChange={setAuthMode}
            />
          )}
        </TabsContent>

        {/* ✅ Sign Up */}
        <TabsContent value="signup" className="space-y-4 mt-6">
          <SignupForm
            formData={formData}
            showPassword={showPassword}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onCountryCodeChange={handleCountryCodeChange}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onSubmit={handleSendOTP}
            onModeChange={setAuthMode}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};
