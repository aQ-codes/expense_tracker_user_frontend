import http from '@/utils/http';

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
  const apiUrl = '/api';

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
          data: { errors: validationErrors }
        };
      }

      // Prepare data for backend (remove confirmPassword and avatar for now)
      const signupPayload = {
        name: data.fullName,
        email: data.email,
        password: data.password
      };

      const payload: JSON = <JSON>(<unknown>signupPayload);
      const { body } = await http().post(`${apiUrl}/auth/signup`, payload);
      
      // Backend sets HTTP-only cookie automatically
      return body;
    } catch (error: unknown) {
      console.error('Signup error:', error);
      
      // Handle specific error cases
      const signupError = error as { response?: { status?: number; data?: { message?: string } } };
      if (signupError.response?.status === 409) {
        return {
          status: false,
          message: 'User with this email already exists'
        };
      }
      
      const signupAxiosError = error as { response?: { data?: { message?: string } } };
      return {
        status: false,
        message: signupAxiosError.response?.data?.message || 'Signup failed. Please try again.'
      };
    }
  };

  /**
   * User login
   */
  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>data);
      const { body } = await http().post(`${apiUrl}/auth/login`, payload);
      
      // Backend sets HTTP-only cookie automatically
      return body;
    } catch (error: unknown) {
      console.error('Login error:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      return {
        status: false,
        message: axiosError.response?.data?.message || 'Login failed'
      };
    }
  };

  /**
   * User logout
   */
  const logout = async (): Promise<{ status: boolean; message: string }> => {
    try {
      console.log('Auth service: Starting logout...');
      
      // Call backend logout endpoint to clear HTTP-only cookie
      console.log('Auth service: Calling backend logout...');
      const payload: JSON = <JSON>(<unknown>{});
      await http().post(`${apiUrl}/auth/logout`, payload);
      console.log('Auth service: Backend logout successful');
      
      console.log('Auth service: Logout completed - HTTP-only cookies cleared by server');
      
      return {
        status: true,
        message: 'Logged out successfully'
      };
    } catch (error: unknown) {
      console.error('Auth service: Logout error:', error);
      
      return {
        status: true,
        message: 'Logged out successfully (local cleanup completed)'
      };
    }
  };

  /**
   * Get current user profile
   */
  const getProfile = async (): Promise<{ status: boolean; data?: User; message: string }> => {
    try {
      const { body } = await http().post(`${apiUrl}/auth/profile`);

      if (body.status) {
        return {
          status: true,
          data: body.data.user,
          message: body.message
        };
      } else {
        return {
          status: false,
          message: body.message
        };
      }
    } catch (error: unknown) {
      console.error('Get profile error:', error);
      const profileError = error as { response?: { data?: { message?: string } } };
      return {
        status: false,
        message: profileError.response?.data?.message || 'Failed to get profile'
      };
    }
  };

  /**
   * Check if user is authenticated
   * Note: This relies on the backend to validate the HTTP-only cookie
   */
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const { body } = await http().post(`${apiUrl}/auth/profile`);
      return body.status;
    } catch {
      return false;
    }
  };

  /**
   * Get current user from profile
   */
  const getCurrentUser = async (): Promise<User | null> => {
    try {
      const { body } = await http().post(`${apiUrl}/auth/profile`);
      if (body.status) {
        return body.data.user;
      }
      return null;
    } catch {
      return null;
    }
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
