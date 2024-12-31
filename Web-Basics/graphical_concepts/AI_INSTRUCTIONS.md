# AI Instructions for Graphical Concepts Project

This document provides instructions for AI assistants to help maintain and
extend the project structure consistently. All code implementations MUST use
TypeScript.

## Project Overview

This is a Deno-based modular web application focused on exploring and
implementing various web development concepts. Key aspects:

1. **Technology Stack**
   - Deno as the runtime environment
   - TypeScript for type-safe development
   - ESM modules for dependency management
   - Built-in development server with live reload

2. **Modular Structure**
   - Each concept/feature is a standalone page application
   - Shared utilities and components
   - Independent development and testing
   - Easy to add new concepts without affecting existing ones

3. **Development Focus**
   - Web APIs and modern browser features
   - Interactive graphics and animations
   - UI frameworks and libraries
   - Performance optimization techniques

## TypeScript Standards

1. **File Extensions**
   - Use `.ts` for regular TypeScript files
   - Use `.tsx` for files containing JSX/TSX syntax
   - NEVER use `.js` or `.jsx` extensions

2. **Type Safety**
   - Enable strict TypeScript configuration
   - Avoid using `any` type
   - Define interfaces for all data structures
   - Use proper type annotations for functions
   - Leverage TypeScript's utility types

3. **Component Types**
   ```typescript
   // Props interface
   interface ComponentProps {
     data: DataType;
     onAction: (id: number) => void;
   }

   // Component with proper types
   const Component = ({ data, onAction }: ComponentProps): JSX.Element => {
     // Implementation
   };
   ```

## Creating a New Page Application

When creating a new page application, follow these steps:

1. **Directory Structure**
   ```
   pages/
   └── [page-name]/
       ├── index.html        # Entry point HTML
       ├── index.tsx         # Main application code
       ├── types.ts         # Type definitions
       └── README.md        # Page-specific documentation
   ```

2. **Root Navigation**
   - Add link to the new page in root `/index.html`
   - Use consistent styling with existing links
   - Add appropriate emoji icon if relevant
   - Example:
     ```html
     <a href="/pages/[page-name]" class="demo-link">
       [emoji] Page Title
     </a>
     ```

3. **HTML Template Requirements**
   - Must include proper meta tags and viewport settings
   - For development mode: Import source TypeScript files directly
   - Live reload script will be injected automatically by the dev server

4. **Deno TypeScript Configuration**
   - Configure TypeScript settings in `deno.json`
   - Set compiler options for Deno environment
   - Example:
     ```json
     {
       "compilerOptions": {
         "jsx": "react-jsx",
         "jsxImportSource": "preact"
       },
       "imports": {
         "preact": "https://esm.sh/preact@10.25.4",
         "preact/hooks": "https://esm.sh/preact@10.25.4/hooks"
       },
       "tasks": {
         "dev": "deno run --allow-net --allow-read server.ts"
       }
     }
     ```

5. **Import Management**
   - For single-use external imports: Use direct URL imports with types
   - For shared dependencies: Add to `deno.json` import map
   - Example:
     ```json
     {
       "imports": {
         "preact": "https://esm.sh/preact@10.25.4",
         "preact/hooks": "https://esm.sh/preact@10.25.4/hooks"
       }
     }
     ```

6. **Type Definitions**
   - Create separate `types.ts` file for shared types
   - Use TypeScript interfaces over type aliases when possible
   - Export all types with proper documentation
   - Example:
     ```typescript
     // types.ts
     export interface DataItem {
       id: number;
       name: string;
       value: number;
     }

     export type ActionType = "create" | "update" | "delete";
     ```

7. **Utility Functions**
   - Place shared utilities in `/utils` directory
   - Each utility must have associated unit tests
   - Use proper TypeScript types and generics
   - Example structure:
     ```
     utils/
     ├── [feature]/
     │   ├── index.ts          # Implementation
     │   ├── types.ts          # Type definitions
     │   └── test.ts           # Tests
     └── README.md
     ```

## Structure Validation Checklist

Use this checklist to verify project structure integrity:

1. **TypeScript Configuration**
   - [ ] Strict mode enabled
   - [ ] Proper JSX configuration
   - [ ] Appropriate module resolution
   - [ ] Correct lib and target settings

2. **Page Application Structure**
   - [ ] Proper directory naming (`pages/[page-name]`)
   - [ ] Required files present (index.html, .tsx/.ts files, README.md)
   - [ ] Type definitions in separate files
   - [ ] Page-specific README.md exists and is complete

3. **Type Safety**
   - [ ] No `any` types used
   - [ ] Interfaces defined for all data structures
   - [ ] Proper type annotations on functions
   - [ ] Generic types used where appropriate

4. **Import Management**
   - [ ] Shared dependencies in import map with types
   - [ ] Direct imports used appropriately
   - [ ] No duplicate dependency versions
   - [ ] Type definitions available for all imports

5. **Documentation**
   - [ ] Type definitions documented
   - [ ] Page README.md exists and is complete
   - [ ] Root README.md updated
   - [ ] Build and run instructions accurate

6. **Utils and Testing**
   - [ ] Shared code properly typed
   - [ ] Unit tests with type checking
   - [ ] Tests pass and provide good coverage
   - [ ] Type definitions for test utilities

## Example Commands

1. **Create New Page**
   ```
   Ask: "Create a new page application called [name] using [technology] with TypeScript"
   Example: "Create a new page application called 'canvas-game' using Canvas API with TypeScript"
   ```

2. **Validate Structure**
   ```
   Ask: "Validate the TypeScript implementation and project structure for the [page-name] application"
   Example: "Validate the TypeScript implementation for the 'react' application"
   ```

## Type Safety Guidelines

1. **Component Props**
   ```typescript
   // Bad
   const Component = (props: any) => { ... }

   // Good
   interface ComponentProps {
     title: string;
     onAction: (id: number) => void;
     optional?: boolean;
   }
   const Component = ({ title, onAction, optional = false }: ComponentProps) => { ... }
   ```

2. **Event Handlers**
   ```typescript
   // Bad
   const handleClick = (e) => { ... }

   // Good
   const handleClick = (e: MouseEvent) => { ... }
   ```

3. **State Management**
   ```typescript
   // Bad
   const [data, setData] = useState();

   // Good
   interface DataState {
     items: string[];
     loading: boolean;
   }
   const [data, setData] = useState<DataState>({ items: [], loading: false });
   ```

4. **API Responses**
   ```typescript
   // Define response types
   interface ApiResponse<T> {
     data: T;
     status: number;
     message: string;
   }

   // Use with fetch
   const getData = async <T>(): Promise<ApiResponse<T>> => {
     const response = await fetch("/api/data");
     return response.json();
   };
   ```

Remember: TypeScript is not optional - all new code must be written in
TypeScript with proper type definitions and safety checks.
