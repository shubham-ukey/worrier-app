import { useAuthState } from './auth/useAuthState';
import { useAuthValidation } from './auth/useAuthValidation';
import { usePasswordAuth } from './auth/usePasswordAuth';
import { useOTPAuth } from './auth/useOTPAuth';
import { AuthMode, LoginMethod } from './auth/types';

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client'; // ✅ your Supabase client file path

export type { AuthMode, LoginMethod };

export const useMobileAuth = () => {
  const {
    authMode,
    setAuthMode,
    loginMethod,
    setLoginMethod,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    handleInputChange,
  } = useAuthState();

  const { validateForm } = useAuthValidation();
  const { handlePasswordLogin, isLoading: passwordLoading } = usePasswordAuth();
  const {
    handleSendOTP,
    handleOTPSuccess,
    confirmationResult,
    setConfirmationResult,
    isLoading: otpLoading,
  } = useOTPAuth();

  const isLoading = passwordLoading || otpLoading;
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    if (!validateForm(formData, authMode, loginMethod)) return;
    await handlePasswordLogin(e, formData, authMode, setAuthMode);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    if (!validateForm(formData, authMode, loginMethod)) return;
    await handleSendOTP(e, formData, setAuthMode);
  };

  const handleOTPVerification = async (firebaseUser: any) => {
    await handleOTPSuccess(firebaseUser, formData, authMode);
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("🔄 Google login started...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("✅ Google login success:", user);

      // ✅ Supabase insert
  const { data, error } = await (supabase as any).from("users").upsert({
  uid: user.uid,
  name: user.displayName,
  email: user.email,
  photo_url: user.photoURL,
  auth_provider: "google",
  created_at: new Date().toISOString(),
});

      if (error) {
        console.error("❌ Supabase insert error:", error.message);
      } else {
        console.log("✅ Supabase user saved:", data);
      }

      // ✅ Navigate after storing
      navigate("/profile");
    } catch (error) {
      console.error("❌ Google login failed:", error);
    }
  };

  return {
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
    handlePasswordLogin: handlePasswordSubmit,
    handleSendOTP: handleOTPSubmit,
    handleOTPSuccess: handleOTPVerification,
    handleInputChange,
    handleGoogleLogin,
  };
};
