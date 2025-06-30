import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MobileOTPInput } from "./MobileOTPInput";
import { LoginMethodToggle } from "./LoginMethodToggle";
import { PasswordLoginForm } from "./PasswordLoginForm";
import { OTPLoginForm } from "./OTPLoginForm";
import { SignupForm } from "./SignupForm";
import { useMobileAuth } from "@/hooks/useMobileAuth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";



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
    handleGoogleLogin,
  } = useMobileAuth();

  useEffect(() => {
    let isComponentMounted = true;

    const ensureRecaptchaContainer = () => {
      if (!document.getElementById("recaptcha-container")) {
        const container = document.createElement("div");
        container.id = "recaptcha-container";

        const isProduction = window.location.hostname !== "localhost";

        if (isProduction) {
          container.style.display = "none";
          console.log("🔒 reCAPTCHA container created for production (invisible)");
        } else {
          container.style.display = "block";
          container.style.margin = "10px auto";
          container.style.textAlign = "center";
          container.style.border = "2px dashed #ccc";
          container.style.padding = "10px";
          container.innerHTML =
            '<p style="font-size: 12px; color: #666;">reCAPTCHA will appear here</p>';
          console.log("🔧 reCAPTCHA container visible for localhost debugging");
        }

        document.body.appendChild(container);
      }
    };

    if (isComponentMounted) {
      ensureRecaptchaContainer();
    }

    return () => {
      isComponentMounted = false;

      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
          console.log("✅ Firebase reCAPTCHA verifier cleared on unmount");
        } catch (error) {
          console.log("Error clearing Firebase reCAPTCHA verifier on unmount:", error);
        }
        delete (window as any).recaptchaVerifier;
      }

      const container = document.getElementById("recaptcha-container");
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
        console.log("✅ reCAPTCHA container removed on unmount");
      }
    };
  }, []);

  const handleCountryCodeChange = (value: string) => {
    setFormData({ ...formData, countryCode: value });
  };

  if (authMode === "otp") {
    return (
      <>
        <div id="recaptcha-container" style={{ display: "none" }}></div>
        <MobileOTPInput
          phoneNumber={formData.countryCode + formData.phoneNumber}
          onSuccess={handleOTPSuccess}
          onBack={() => {
            setAuthMode("signin");
            setConfirmationResult(null);
          }}
          onResendOTP={handleSendOTP}
          confirmationResult={confirmationResult}
          isLoading={isLoading}
        />
      </>
    );
  }

  return (
    <>
      <div id="recaptcha-container" style={{ display: "none" }}></div>
      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as any)} className="w-full">
        {/* SIGN IN FORM */}
        <TabsContent value="signin" className="space-y-4 mt-6">
          <LoginMethodToggle loginMethod={loginMethod} onMethodChange={setLoginMethod} />

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

        {/* SIGN UP FORM */}
        <TabsContent value="signup" className="space-y-4 mt-6">
          {/* Google Sign Up Button */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300"
            variant="outline"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </Button>

          {/* Final Signup Form with fields inside */}
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
