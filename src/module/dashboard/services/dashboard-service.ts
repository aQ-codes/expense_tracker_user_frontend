import http from "@/utils/http";
import { 
  DashboardData, 
  DashboardStats, 
  DashboardExpense, 
  CategoryDistributionData, 
  ExpenseData 
} from "@/interfaces/expense";

// Response interfaces
interface DashboardResponse {
  status: boolean;
  message: string;
  data: DashboardData;
}

/**
 * Service for managing dashboard data in the system.
 * Contains methods for fetching dashboard statistics, recent expenses, and chart data.
 */
const useDashboardService = () => {
  const apiUrl = "/api";

  /**
   * Get complete dashboard data including stats, recent expenses, and charts
   * @returns Promise resolving to complete dashboard data
   */
  const getDashboardData = async (): Promise<DashboardResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/expenses/dashboard`);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch dashboard data. Please try again.",
        data: {
          stats: {
            totalExpenses: 0,
            thisMonthExpenses: 0,
            lastMonthExpenses: 0,
            percentageChange: 0
          },
          recentExpenses: [],
          expenseDistribution: [],
          monthlyExpensesData: []
        }
      };
    }
  };

  /**
   * Get dashboard statistics only
   * @returns Promise resolving to dashboard statistics
   */
  const getDashboardStats = async (): Promise<{ status: boolean; message: string; data: DashboardStats }> => {
    try {
      const { body } = await http().post(`${apiUrl}/expenses/dashboard/stats`);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch dashboard statistics. Please try again.",
        data: {
          totalExpenses: 0,
          thisMonthExpenses: 0,
          lastMonthExpenses: 0,
          percentageChange: 0
        }
      };
    }
  };

  /**
   * Get recent expenses for dashboard
   * @param limit - Number of recent expenses to fetch
   * @returns Promise resolving to recent expenses
   */
  const getRecentExpenses = async (limit: number = 5): Promise<{ status: boolean; message: string; data: DashboardExpense[] }> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ limit });
      const { body } = await http().post(`${apiUrl}/expenses/dashboard/recent`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch recent expenses. Please try again.",
        data: []
      };
    }
  };

  /**
   * Get expense distribution data for pie chart
   * @returns Promise resolving to expense distribution data
   */
  const getExpenseDistribution = async (): Promise<{ status: boolean; message: string; data: CategoryDistributionData[] }> => {
    try {
      const { body } = await http().post(`${apiUrl}/expenses/dashboard/distribution`);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch expense distribution. Please try again.",
        data: []
      };
    }
  };

  /**
   * Get monthly expenses data for bar chart
   * @param months - Number of months to fetch (default: 6)
   * @returns Promise resolving to monthly expenses data
   */
  const getMonthlyExpensesData = async (months: number = 6): Promise<{ status: boolean; message: string; data: ExpenseData[] }> => {
    try {
      const payload: JSON = <JSON>(<unknown>{ months });
      const { body } = await http().post(`${apiUrl}/expenses/dashboard/monthly`, payload);

      return {
        status: body.status,
        message: body.message,
        data: body.data
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch monthly expenses data. Please try again.",
        data: []
      };
    }
  };

  return {
    getDashboardData,
    getDashboardStats,
    getRecentExpenses,
    getExpenseDistribution,
    getMonthlyExpensesData
  };
};

export default useDashboardService;
