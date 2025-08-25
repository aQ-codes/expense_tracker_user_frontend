import http from "@/utils/http";
import { ExpenseWithCategory } from "@/interfaces/expense";

// Response interfaces
interface MonthlyBreakdownResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

interface MonthlyBreakdownDataResponse {
  status: boolean;
  message: string;
  data: {
    summary: {
      totalSpent: number;
      totalExpenses: number;
      averagePerDay: number;
      daysInMonth: number;
    };
    expenses: ExpenseWithCategory[];
    categoryDistribution: Array<{ name: string; value: number; color: string }>;
    dailyBreakdown: Array<{ date: string; amount: number }>;
  };
}

/**
 * Service for managing monthly breakdown data in the system.
 * Contains methods for fetching monthly expense data and statistics.
 */
const useMonthlyBreakdownService = () => {
  const apiUrl = "/api";

  /**
   * Get monthly breakdown data for a specific month and year
   * @param month - Month number (1-12)
   * @param year - Year number
   * @returns Promise resolving to monthly breakdown data
   */
  const getMonthlyBreakdown = async (
    month: number,
    year: number
  ): Promise<MonthlyBreakdownDataResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch monthly breakdown. Please try again.",
        data: {
          summary: {
            totalSpent: 0,
            totalExpenses: 0,
            averagePerDay: 0,
            daysInMonth: 0
          },
          expenses: [],
          categoryDistribution: [],
          dailyBreakdown: []
        }
      };
    }
  };

  /**
   * Get monthly summary statistics
   * @param month - Month number (1-12)
   * @param year - Year number
   * @returns Promise resolving to monthly summary
   */
  const getMonthlySummary = async (
    month: number,
    year: number
  ): Promise<MonthlyBreakdownResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown/summary`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch monthly summary. Please try again."
      };
    }
  };

  /**
   * Get monthly expenses list
   * @param month - Month number (1-12)
   * @param year - Year number
   * @param page - Page number
   * @param limit - Items per page
   * @returns Promise resolving to monthly expenses list
   */
  const getMonthlyExpenses = async (
    month: number,
    year: number,
    page: number = 1,
    limit: number = 10
  ): Promise<MonthlyBreakdownResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year,
        page,
        limit
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown/expenses`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch monthly expenses. Please try again."
      };
    }
  };

  /**
   * Get monthly category distribution
   * @param month - Month number (1-12)
   * @param year - Year number
   * @returns Promise resolving to category distribution
   */
  const getMonthlyCategoryDistribution = async (
    month: number,
    year: number
  ): Promise<MonthlyBreakdownResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown/category-distribution`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch category distribution. Please try again."
      };
    }
  };

  /**
   * Get daily breakdown for the month
   * @param month - Month number (1-12)
   * @param year - Year number
   * @returns Promise resolving to daily breakdown
   */
  const getDailyBreakdown = async (
    month: number,
    year: number
  ): Promise<MonthlyBreakdownResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown/daily`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to fetch daily breakdown. Please try again."
      };
    }
  };

  /**
   * Export monthly expenses to CSV
   * @param month - Month number (1-12)
   * @param year - Year number
   * @returns Promise resolving to CSV data
   */
  const exportMonthlyExpenses = async (
    month: number,
    year: number
  ): Promise<MonthlyBreakdownResponse> => {
    try {
      const payload: JSON = <JSON>(<unknown>{
        month,
        year
      });

      const { body } = await http().post(`${apiUrl}/monthly-breakdown/export`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch {
      return {
        status: false,
        message: "Failed to export monthly expenses. Please try again."
      };
    }
  };

  return {
    getMonthlyBreakdown,
    getMonthlySummary,
    getMonthlyExpenses,
    getMonthlyCategoryDistribution,
    getDailyBreakdown,
    exportMonthlyExpenses
  };
};

export default useMonthlyBreakdownService;
