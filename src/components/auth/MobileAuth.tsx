
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MobileOTPInput } from "./MobileOTPInput";
import { LoginMethodToggle } from "./LoginMethodToggle";
import { PasswordLoginForm } from "./PasswordLoginForm";
import { OTPLoginForm } from "./OTPLoginForm";
import { SignupForm } from "./SignupForm";
import { useMobileAuth } from "@/hooks/useMobileAuth";

export const MobileAuth = () => {
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
    handleOTPSuccess,
    handleInputChange,
  } = useMobileAuth();

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
  };

  if (authMode === 'otp') {
    return (
      <MobileOTPInput
        phoneNumber={formData.countryCode + formData.phoneNumber}
        onSuccess={handleOTPSuccess}
        onBack={() => {
          setAuthMode('signin');
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
      <div id="recaptcha-container"></div>
      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)} className="w-full">
        {/* SIGN IN FORM */}
        <TabsContent value="signin" className="space-y-4 mt-6">
          <LoginMethodToggle
            loginMethod={loginMethod}
            onMethodChange={setLoginMethod}
          />

          {loginMethod === 'password' ? (
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

        {/* SIGN UP FORM */}
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
