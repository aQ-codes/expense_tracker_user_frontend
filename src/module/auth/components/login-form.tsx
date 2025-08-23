'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/themes/components/Input';
import Button from '@/themes/components/Button';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

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
      // TODO: Implement login logic here
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle successful login
      console.log('Login successful');
      
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Handle login error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Please enter your details to log in.</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Login Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={isLoading}
        >
          LOGIN
        </Button>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="text-purple-600 hover:text-purple-700 underline font-medium">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
