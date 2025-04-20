/**
 * Network error handling utility functions for API calls
 */

/**
 * Generic error handler for API calls
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred
 * @param {Function} callback - Optional callback function to execute
 * @returns {Object} Standardized error response
 */
export const handleApiError = (
  error,
  context = "API call",
  callback = null
) => {
  const errorResponse = {
    success: false,
    message: "An unknown error occurred",
    context,
    timestamp: new Date().toISOString(),
  };

  // Log the error to console in non-production environments
  if (import.meta.env.DEV) {
    console.error(`Error in ${context}:`, error);
  }

  // Handle specific error types
  if (error?.message) {
    errorResponse.message = error.message;
  }

  // Network errors
  if (error?.name === "NetworkError" || error?.message?.includes("network")) {
    errorResponse.message = "Network error. Please check your connection.";
    errorResponse.code = "NETWORK_ERROR";
  }

  // Timeout errors
  if (error?.name === "TimeoutError" || error?.message?.includes("timeout")) {
    errorResponse.message = "Request timed out. Please try again.";
    errorResponse.code = "TIMEOUT_ERROR";
  }

  // Execute callback if provided
  if (callback && typeof callback === "function") {
    callback(errorResponse);
  }

  return errorResponse;
};

/**
 * Retry mechanism for API calls
 * @param {Function} apiFn - The API function to call
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in milliseconds
 * @param {Array} args - Arguments to pass to the API function
 * @returns {Promise} Promise resolving to API response
 */
export const withRetry = async (
  apiFn,
  maxRetries = 3,
  delay = 1000,
  ...args
) => {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiFn(...args);
    } catch (error) {
      lastError = error;

      // Don't retry if it's not a network-related error
      if (!isNetworkError(error)) {
        throw error;
      }

      if (attempt < maxRetries - 1) {
        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, delay * (attempt + 1))
        );
      }
    }
  }

  throw lastError;
};

/**
 * Check if an error is network related
 * @param {Error} error - The error to check
 * @returns {boolean} True if it's a network error
 */
const isNetworkError = (error) => {
  return (
    error?.name === "NetworkError" ||
    error?.message?.includes("network") ||
    error?.name === "TimeoutError" ||
    error?.message?.includes("timeout") ||
    error?.message?.includes("Failed to fetch")
  );
};

/**
 * Creates an abortable fetch that times out after the specified duration
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise} Promise resolving to fetch response
 */
export const fetchWithTimeout = (url, options = {}, timeoutMs = 10000) => {
  const controller = new AbortController();
  const { signal } = controller;

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return fetch(url, { ...options, signal }).finally(() =>
    clearTimeout(timeout)
  );
};
