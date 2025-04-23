# Portal Application

This is the portal application of the Nimic platform.

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
nx serve portal

# QA Environment
nx serve portal --configuration=qa

# UAT Environment
nx serve portal --configuration=uat

# Production Environment
nx serve portal --configuration=production
```

### Building the Application

To build the application for different environments:

```bash
# Development Build
nx build portal --configuration=development

# QA Build
nx build portal --configuration=qa

# UAT Build
nx build portal --configuration=uat

# Production Build (default)
nx build portal
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
nx test portal

# Lint the code
nx lint portal

# Extract i18n messages
nx extract-i18n portal
```

## Deployment

The built application will be available in the `dist/apps/portal` directory. The specific output path depends on the environment configuration used during the build process. 