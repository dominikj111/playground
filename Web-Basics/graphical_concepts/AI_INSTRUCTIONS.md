# AI Instructions for Graphical Concepts Project

This document provides instructions for AI assistants to help maintain and
extend the project structure consistently.

## Creating a New Page Application

When creating a new page application, follow these steps:

1. **Directory Structure**
   ```
   pages/
   └── [page-name]/
       ├── index.html      # Entry point HTML
       ├── index.[ts|tsx]  # Main application code
       └── README.md       # Page-specific documentation
   ```

2. **HTML Template Requirements**
   - Must include proper meta tags and viewport settings
   - For development mode: Import source TypeScript/TSX files directly
   - Live reload script will be injected automatically by the dev server

3. **Build System Integration**
   - Add the main TS/TSX file to `CLIENT_TS_FILES` in `build.ts`
   - Ensure proper loader configuration in both `server.ts` and `build.ts`
   - Test both development (live reload) and production builds

4. **Import Management**
   - For single-use external imports: Use direct URL imports
   - For shared dependencies: Add to `deno.json` import map
   - Example:
     ```json
     {
       "imports": {
         "shared-lib": "https://esm.sh/shared-lib@version"
       }
     }
     ```

5. **Documentation**
   - Create a README.md for the page application
   - Update root README.md to include the new page
   - Document any special build or runtime requirements

6. **Utility Functions**
   - Place shared utilities in `/utils` directory
   - Each utility must have associated unit tests
   - Example structure:
     ```
     utils/
     ├── [feature]/
     │   ├── index.ts
     │   └── test.ts
     └── README.md
     ```

## Structure Validation Checklist

Use this checklist to verify project structure integrity:

1. **Page Application Structure**
   - [ ] Proper directory naming (`pages/[page-name]`)
   - [ ] Required files present (index.html, main script, README.md)
   - [ ] Correct import paths and extensions
   - [ ] Page-specific README.md exists and is complete

2. **Build System**
   - [ ] Main script added to CLIENT_TS_FILES in build.ts
   - [ ] Correct loaders configured for file type
   - [ ] Development mode compilation works
   - [ ] Production build generates correct output

3. **Import Management**
   - [ ] Shared dependencies in import map
   - [ ] Direct imports used appropriately
   - [ ] No duplicate dependency versions

4. **Documentation**
   - [ ] Page README.md exists and is complete
   - [ ] Root README.md updated
   - [ ] Build and run instructions accurate

5. **Utils and Testing**
   - [ ] Shared code properly placed in utils
   - [ ] Unit tests exist for utilities
   - [ ] Tests pass and provide good coverage

## Example Commands

1. **Create New Page**
   ```
   Ask: "Create a new page application called [name] using [technology]"
   Example: "Create a new page application called 'canvas-game' using Canvas API"
   ```

2. **Validate Structure**
   ```
   Ask: "Validate the project structure for the [page-name] application"
   Example: "Validate the project structure for the 'react' application"
   ```

3. **Add Shared Utility**
   ```
   Ask: "Create a shared utility for [feature] with unit tests"
   Example: "Create a shared utility for vector calculations with unit tests"
   ```

## Common Issues and Solutions

1. **Development Mode Issues**
   - Problem: TSX/TS files not compiling
   - Solution: Check server.ts loaders and file watchers

2. **Build Issues**
   - Problem: Production build failing
   - Solution: Verify build.ts configuration and file paths

3. **Import Issues**
   - Problem: Duplicate dependencies
   - Solution: Move to import map in deno.json

4. **Live Reload Issues**
   - Problem: Changes not reflecting
   - Solution: Check file extensions in watcher configuration

## Best Practices

1. **Code Organization**
   - Keep page-specific code within its directory
   - Use utils for shared functionality
   - Maintain clear separation of concerns

2. **Documentation**
   - Keep READMEs up to date
   - Document any special requirements
   - Include examples where helpful

3. **Testing**
   - Write tests for shared utilities
   - Consider adding page-specific tests
   - Maintain test coverage

4. **Dependencies**
   - Use import maps for shared dependencies
   - Keep dependencies up to date
   - Document version requirements

Remember to maintain consistency across all page applications and keep the
project structure clean and obvious for future development.
