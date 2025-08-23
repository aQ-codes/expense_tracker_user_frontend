'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/themes/components/Input';
import Button from '@/themes/components/Button';
import Avatar from '@/themes/components/Avatar';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

interface SignupFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string;
}

const SignupForm: React.FC = () => {
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

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement signup logic here
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle successful signup
      console.log('Signup successful');
      
    } catch (error) {
      console.error('Signup failed:', error);
      // TODO: Handle signup error
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
