# Quiz Processing System - Refactored Structure

This directory contains the refactored quiz processing system, segmented by responsibility for better readability and maintainability.

## Directory Structure

```
./
├── config/          # Configuration constants
├── email/           # Email templates and sending functionality
├── quiz/            # Quiz-specific logic and prompt generation
├── services/        # API services and external integrations
├── utils/           # Utility functions
├── main.js          # Main entry point
```

## Files Overview

### Configuration
- **`config/constants.js`**: Contains all configuration constants like API endpoints, question IDs, and file paths.

### Email
- **`email/template.js`**: HTML email template for persona quiz results
- **`email/sender.js`**: Email sending functionality using Nodemailer

### Quiz Logic
- **`quiz/questions.js`**: Quiz questions, prompt generation, and email extraction logic

### Services
- **`services/api.js`**: API interactions (fetching submissions, generating persona descriptions)

### Utilities
- **`utils/emailManager.js`**: Email management utilities (reading/saving sent emails)

### Entry Points
- **`main.js`**: Main entry point for the refactored system
- **`quiz.js`**: Original file (kept for reference)

## Usage

To run the refactored system:
```bash
node main.js
```

## Benefits of the Refactored Structure

1. **Separation of Concerns**: Each file has a single responsibility
2. **Better Readability**: Smaller, focused files are easier to understand
3. **Improved Maintainability**: Changes to one component don't affect others

## Docker

### Build the Docker Image

To build the Docker image:
```bash
docker build -t tools-app .
```

### Run the Container

To run the container with cron executing the application every minute:
```bash
docker run -dv ./data:/var/data tools-app
```

The `-d` flag runs the container in background mode.

### View Logs

To view the cron logs from a running container:
```bash
docker exec <container_id> tail -f /var/log/cron.log
```

### Stop the Container

```bash
docker stop <container_id>
```

### Notes

- The application runs every minute via cron
- Logs are written to `/var/log/cron.log` inside the container
- Ensure environment variables (like API keys) are available in the container (use `.env` file or pass via `-e` flag)
4. **Easier Testing**: Individual components can be tested in isolation
5. **Better Documentation**: Clear JSDoc comments for each function
6. **Reusability**: Components can be reused in other parts of the application
