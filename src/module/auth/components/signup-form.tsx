'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/themes/components/input';
import Button from '@/themes/components/button';
import { useAuthService, SignupFormErrors } from '../services/auth-service';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const { signup } = useAuthService();
  
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleAvatarUpload = (file: File) => {
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, avatar: 'Please select an image file' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, avatar: 'Image size should be less than 5MB' }));
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setFormData(prev => ({ ...prev, avatar: file }));
    
    // Clear avatar error
    if (errors.avatar) {
      setErrors(prev => ({ ...prev, avatar: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const response = await signup(formData);
      
      if (response.status) {
        // Signup successful
        console.log('Signup successful:', response.message);
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Handle validation errors or other errors
        if (response.data?.errors) {
          setErrors(response.data.errors);
        } else {
          // Set a general error message
          setErrors({ email: response.message });
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ email: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join us today by entering your details below.</p>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
    
        
        {errors.avatar && (
          <p className="text-sm text-red-600 text-center">{errors.avatar}</p>
        )}

        {/* Full Name Field */}
        <Input
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="John"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />

        {/* Email Field */}
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        {/* Password Field */}
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Min 8 Characters"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          showPasswordToggle
        />

        {/* Confirm Password Field */}
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
          showPasswordToggle
        />

        {/* Signup Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={isLoading}
        >
          SIGN UP
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-purple-600 hover:text-purple-700 underline font-medium">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
