/**
 * Logger utility with timestamp and log levels
 */

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

/**
 * Logs a message with timestamp and log level
 * @param {string} level - The log level
 * @param {string} message - The message to log
 */
function logWithLevel(level, message, ...args) {
  console.log(`[${new Date().toISOString()}] [${level}] ${message}`, ...args);
}

/**
 * Logs a debug message with timestamp
 * @param {string} message - The debug message to log
 */
export function logDebug(message, ...args) {
  logWithLevel(LOG_LEVELS.DEBUG, message, ...args);
}

/**
 * Logs an info message with timestamp
 * @param {string} message - The info message to log
 */
export function logInfo(message, ...args) {
  logWithLevel(LOG_LEVELS.INFO, message, ...args);
}

/**
 * Logs a warning message with timestamp
 * @param {string} message - The warning message to log
 */
export function logWarn(message, ...args) {
  logWithLevel(LOG_LEVELS.WARN, message, ...args);
}

/**
 * Logs an error message with timestamp
 * @param {string} message - The error message to log
 */
export function logError(message, ...args) {
  logWithLevel(LOG_LEVELS.ERROR, message, ...args);
}