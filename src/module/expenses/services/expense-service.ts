import http from "@/utils/http";
import { Expense, ExpenseWithCategory, BackendCategory } from "@/interfaces/expense";

// Response interfaces
interface ExpenseResponse {
  status: boolean;
  message: string;
  data?: ExpenseWithCategory;
}

interface CategoryResponse {
  status: boolean;
  message: string;
  data?: BackendCategory;
}

interface ExpenseListResponse {
  status: boolean;
  message: string;
  data: ExpenseWithCategory[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ExpenseStatsResponse {
  status: boolean;
  message: string;
  data: {
    totalAmount: number;
    totalExpenses: number;
    averageAmount: number;
  };
}

interface CategoryListResponse {
  status: boolean;
  message: string;
  data: BackendCategory[];
}

interface ChartDataResponse {
  status: boolean;
  message: string;
  data: {
    monthlyData: Array<{ date: string; amount: number }>;
    categoryDistribution: Array<{ name: string; value: number; color: string }>;
  };
}

/**
 * Service for managing expenses in the system.
 * Contains methods for CRUD operations, statistics, and chart data.
 */
const useExpenseService = () => {
  const apiUrl = "/api";

  /**
   * Get all expenses for the authenticated user with pagination and filters
   * @param page - Page number
   * @param limit - Items per page
   * @param filters - Additional filters (category, month, etc.)
   * @returns Promise resolving to expense list with pagination
   */
  const getExpenses = async (
    page: number = 1,
    limit: number = 10,
    filters: { category?: string; month?: string } = {}
  ): Promise<ExpenseListResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        page,
        limit,
        ...filters
      });

      const { body } = await http().post(`${apiUrl}/expenses/list`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data,
        pagination: body.pagination
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch expenses. Please try again.",
        data: []
      };
    }
  };

  /**
   * Get a single expense by ID
   * @param expenseId - The expense ID
   * @returns Promise resolving to expense data
   */
  const getExpenseById = async (expenseId: string): Promise<ExpenseResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ expenseId });
      const { body } = await http().post(`${apiUrl}/expenses/get`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch expense. Please try again."
      };
    }
  };

  /**
   * Create a new expense
   * @param expenseData - The expense data to create
   * @returns Promise resolving to creation response
   */
  const createExpense = async (expenseData: Omit<Expense, '_id'>): Promise<ExpenseResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>expenseData);
      const { body } = await http().post(`${apiUrl}/expenses`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to create expense. Please try again."
      };
    }
  };

  /**
   * Update an existing expense
   * @param expenseId - The expense ID to update
   * @param expenseData - The updated expense data
   * @returns Promise resolving to update response
   */
  const updateExpense = async (
    expenseId: string,
    expenseData: Partial<Omit<Expense, '_id'>>
  ): Promise<ExpenseResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ expenseId, ...expenseData });
      const { body } = await http().post(`${apiUrl}/expenses/update`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to update expense. Please try again."
      };
    }
  };

  /**
   * Delete an expense
   * @param expenseId - The expense ID to delete
   * @returns Promise resolving to deletion response
   */
  const deleteExpense = async (expenseId: string): Promise<ExpenseResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ expenseId });
      const { body } = await http().post(`${apiUrl}/expenses/delete`, payload);

      return {
        status: body.status,
        message: body.message
      };
    } catch {
      return {
        status: false,
        message: "Failed to delete expense. Please try again."
      };
    }
  };

  /**
   * Get expense statistics for the authenticated user
   * @param dateRange - Optional date range filter
   * @returns Promise resolving to expense statistics
   */
  const getExpenseStats = async (dateRange?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ExpenseStatsResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>dateRange || {});
      const { body } = await http().post(`${apiUrl}/expenses/stats`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch expense statistics. Please try again.",
        data: {
          totalAmount: 0,
          totalExpenses: 0,
          averageAmount: 0
        }
      };
    }
  };

  /**
   * Get all categories for the authenticated user
   * @returns Promise resolving to category list
   */
  const getCategories = async (): Promise<CategoryListResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/categories`);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch categories. Please try again.",
        data: []
      };
    }
  };

  /**
   * Create a new category for the authenticated user
   * @param categoryName - The name of the category to create
   * @returns Promise resolving to creation response
   */
  const createCategory = async (categoryName: string): Promise<CategoryResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ name: categoryName });
      const { body } = await http().post(`${apiUrl}/categories/create`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to create category. Please try again."
      };
    }
  };

  /**
   * Get chart data for expense overview
   * @param dateRange - Optional date range filter
   * @returns Promise resolving to chart data
   */
  const getChartData = async (dateRange?: {
    startDate?: string;
    endDate?: string;
  }): Promise<ChartDataResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>dateRange || {});
      const { body } = await http().post(`${apiUrl}/expenses/chart-data`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch chart data. Please try again.",
        data: {
          monthlyData: [],
          categoryDistribution: []
        }
      };
    }
  };

  /**
   * Export expenses to CSV
   * @param filters - Optional filters for export
   * @returns Promise resolving to CSV data
   */
  const exportExpenses = async (filters: { category?: string; month?: string } = {}): Promise<ExpenseResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>filters);
      const { body } = await http().post(`${apiUrl}/expenses/export`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to export expenses. Please try again."
      };
    }
  };

  return {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenseStats,
    getCategories,
    createCategory,
    getChartData,
    exportExpenses
  };
};

export default useExpenseService;
