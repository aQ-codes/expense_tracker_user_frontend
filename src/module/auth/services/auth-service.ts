import { setToken, removeToken, getToken, decodeToken } from '@/utils/cookie';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    errors?: SignupFormErrors;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

export interface SignupFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string;
}

export const useAuthService = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Create axios instance with credentials
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Validate signup form data
   */
  const validateSignupForm = (data: SignupData): SignupFormErrors => {
    const errors: SignupFormErrors = {};

    // Full name validation
    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  /**
   * User signup
   */
  const signup = async (data: SignupData): Promise<AuthResponse> => {
    try {
      // Validate form data first
      const validationErrors = validateSignupForm(data);
      if (Object.keys(validationErrors).length > 0) {
        return {
          status: false,
          message: 'Validation failed',
          data: { errors: validationErrors } as any
        };
      }

      // Prepare data for backend (remove confirmPassword and avatar for now)
      const signupPayload = {
        name: data.fullName,
        email: data.email,
        password: data.password
      };

      const response = await api.post('/api/auth/signup', signupPayload);
      
      if (response.data.status) {
        // Set token in cookie
        setToken(response.data.data.token);
        return response.data;
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        return {
          status: false,
          message: 'User with this email already exists'
        };
      }
      
      return {
        status: false,
        message: error.response?.data?.message || 'Signup failed. Please try again.'
      };
    }
  };

  /**
   * User login
   */
  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/api/auth/login', data);
      
      if (response.data.status) {
        // Set token in cookie
        setToken(response.data.data.token);
        return response.data;
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        status: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  /**
   * User logout
   */
  const logout = async (): Promise<{ status: boolean; message: string }> => {
    try {
      const token = getToken();
      if (token) {
        // Call backend logout endpoint
        await api.post('/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      // Remove token from cookie
      removeToken();
      
      return {
        status: true,
        message: 'Logged out successfully'
      };
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still remove token even if backend call fails
      removeToken();
      return {
        status: true,
        message: 'Logged out successfully'
      };
    }
  };

  /**
   * Get current user profile
   */
  const getProfile = async (): Promise<{ status: boolean; data?: User; message: string }> => {
    try {
      const token = getToken();
      if (!token) {
        return {
          status: false,
          message: 'No authentication token found'
        };
      }

      const response = await api.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status) {
        return {
          status: true,
          data: response.data.data.user,
          message: response.data.message
        };
      } else {
        return {
          status: false,
          message: response.data.message
        };
      }
    } catch (error: any) {
      console.error('Get profile error:', error);
      return {
        status: false,
        message: error.response?.data?.message || 'Failed to get profile'
      };
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    const token = getToken();
    if (!token) return false;

    // Check if token is expired
    const decoded = decodeToken(token);
    if (!decoded) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };

  /**
   * Get current user from token
   */
  const getCurrentUser = (): User | null => {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded) return null;

    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name || 'User'
    };
  };

  return {
    signup,
    login,
    logout,
    getProfile,
    isAuthenticated,
    getCurrentUser,
    validateSignupForm
  };
};
