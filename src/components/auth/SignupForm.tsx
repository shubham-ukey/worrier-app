import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { CountryCodeSelect } from "./CountryCodeSelect";
import { AuthMode } from "@/hooks/useMobileAuth";


interface SignupFormProps {
  formData: {
    name: string;
    email: string; // ✅ added email here
    countryCode: string;
    phoneNumber: string;
    password: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryCodeChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onModeChange: (mode: AuthMode) => void;
}

export const SignupForm = ({
  formData,
  showPassword,
  isLoading,
  onInputChange,
  onCountryCodeChange,
  onTogglePassword,
  onSubmit,
  onModeChange,
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={onInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="signup-phone">Phone Number</Label>
        <div className="flex gap-2">
          <CountryCodeSelect
            value={formData.countryCode}
            onValueChange={onCountryCodeChange}
          />
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-phone"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={onInputChange}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={onInputChange}
            className="pl-10 pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Create Account"}
      </Button>

      {/* Switch to Sign In */}
      <div className="pt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onModeChange("signin")}
          className="text-purple-600 hover:underline font-medium"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};
