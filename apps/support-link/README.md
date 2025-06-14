# support-link Application

This is the support-link application of the support-link platform.

## Development

### Prerequisites
- Node.js (v16 or higher)
- NPM (v8 or higher)
- NX CLI (global installation recommended)

### Installation
```bash
npm install
```

### Available Environments

The application supports the following environments:
- Development (dev)
- Quality Assurance (qa)
- User Acceptance Testing (uat)
- Production (prod)

### Serving the Application

To serve the application in different environments:

```bash
# Development (default)
nx serve support-link

# QA Environment
nx serve support-link --configuration=qa

# UAT Environment
nx serve support-link --configuration=uat

# Production Environment
nx serve support-link --configuration=production
```

### Building the Application

To build the application for different environments:

```bash
# Development Build
nx build support-link --configuration=development

# QA Build
nx build support-link --configuration=qa

# UAT Build
nx build support-link --configuration=uat

# Production Build (default)
nx build support-link
```

### Environment Configuration

Each environment has its own configuration file:
- `environment.ts` - Base environment
- `environment.dev.ts` - Development environment
- `environment.qa.ts` - QA environment
- `environment.uat.ts` - UAT environment
- `environment.prod.ts` - Production environment

### Environment Variables

Each environment has the following configuration:
- `production`: Boolean flag indicating if it's a production build
- `apiUrl`: API endpoint URL
- `version`: Application version

### Additional Commands

```bash
# Run tests
nx test support-link

# Lint the code
nx lint support-link

# Extract i18n messages
nx extract-i18n support-link
```

## Deployment

The built application will be available in the `dist/apps/support-link` directory. The specific output path depends on the environment configuration used during the build process. 