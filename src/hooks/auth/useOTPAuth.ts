import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthFormData, AuthMode } from './types';

export const useOTPAuth = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const setupRecaptcha = async () => {
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          },
        });
      }
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      throw error;
    }
  };

  const handleSendOTP = async (
    e: React.FormEvent,
    formData: AuthFormData,
    setAuthMode: (mode: AuthMode) => void
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await setupRecaptcha();
      
      const phoneNumber = formData.countryCode + formData.phoneNumber;
      const appVerifier = (window as any).recaptchaVerifier;
      
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setAuthMode('otp');
      
      toast({
        title: "OTP sent!",
        description: `Verification code sent to ${phoneNumber}`,
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Invalid phone number format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSuccess = async (firebaseUser: any, formData: AuthFormData, authMode: AuthMode) => {
    try {
      setIsLoading(true);
      
      const phoneNumber = formData.countryCode + formData.phoneNumber;
      const email = `${phoneNumber}@phone.local`;
      
      console.log('OTP verified, processing authentication for:', phoneNumber);
      
      // Check if user already exists in our profiles table
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('phone', phoneNumber)
        .single();
      
      if (existingProfile) {
        // User exists - sign them in directly
        console.log('Existing user found, signing in...');
        
        // First, sign out any existing session
        await supabase.auth.signOut();
        
        // Try to sign in with password
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: 'otp-verified-' + phoneNumber
        });
        
        if (signInError) {
          console.log('Password signin failed, creating auth user...', signInError.message);
          
          // If signin fails, try to create the auth user
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password: 'otp-verified-' + phoneNumber,
            options: {
              data: {
                full_name: existingProfile.full_name || 'Phone User',
                phone: phoneNumber,
                verified_via_otp: true
              }
            }
          });
          
          if (signUpError && !signUpError.message.includes('User already registered')) {
            throw signUpError;
          }
          
          // Try signin again after signup
          const { error: finalSignInError } = await supabase.auth.signInWithPassword({
            email,
            password: 'otp-verified-' + phoneNumber
          });
          
          if (finalSignInError) {
            throw finalSignInError;
          }
        }
        
        console.log('Existing user signed in successfully');
      } else {
        // New user - register them
        console.log('Creating new account for OTP user');
        const userName = formData.name || 'Phone User';
        await register(userName, email, 'otp-verified-' + phoneNumber);
      }
      
      toast({
        title: "Success!",
        description: "Phone number verified and signed in successfully!",
      });
      
      // Wait for Supabase session to be set before redirecting
      let maxWait = 20; // max 2 seconds
      let sessionSet = false;
      while (maxWait-- > 0) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          sessionSet = true;
          break;
        }
        await new Promise(res => setTimeout(res, 100));
      }

      if (!sessionSet) {
        console.warn('Supabase session not set after OTP login, forcing reload.');
      }

        window.location.href = '/dashboard';
      
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Error",
        description: "Failed to complete authentication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    handleSendOTP, 
    handleOTPSuccess, 
    confirmationResult, 
    setConfirmationResult,
    isLoading 
  };
};
