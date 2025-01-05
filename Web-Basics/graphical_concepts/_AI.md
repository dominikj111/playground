# AI Instructions for Graphical Concepts Project

This document provides instructions for AI assistants to help maintain and
extend the project structure consistently.

## Commands

1. `init: <page-name>`
   - Do not change the root's README.md
   - Creates a new page application structure in `pages/<page-name>` if it does
     not exist
   - Generates required files according to the project structure
   - Adds navigation link to root index.html
   - if not specified, prefer vanilla approach (no dependencies and no
     frameworks)
   - in case the library/framework may significantly reduce the amont of
     code/work, suggest to use it and wait for response
   - security is not a priority, so do not inlcude it into any specifications
   - responsiveness is not a priority, but good to have

2. `propose: <page-name>; <brief-description>`
   - Do not change the root's README.md
   - Creates a new page application structure in `pages/<page-name>`
   - Creates a README.md for the specified page by following the README Template
     structure and by following the provided brief description
   - if the <page-name> is empty, generate own page name according to the
     description/README.md
   - if the <brief-description> is empty, generate own description to match the
     <page-name> as much as possible
   - if the <page-name> is empty and <brief-description> is empty, scan all
     projects and generate own page name and description/README.md

3. `implement: <page-name>; <brief-feature-description>`
   - Do not change the root's README.md
   - There must be existing page application structure in `pages/<page-name>`,
     if not use `init page <page-name>`
   - According to provided brief feature description, implement the feature
   - Find a corresponding feature name
   - Add the feature to the README file

4. `validate: <page-name>`
   - Do not change the root's README.md
   - If the <page-name> is empty, check all pages
   - Report an issue if any of next steps are missing
   - Page application structure exists in `pages/<page-name>` (README.md only
     without reference in the root's index OR full project structure according
     to the page structure below with valid reference in the root's index alogn
     with the appropriate emoji)
   - The page application match it's description in it's README.md file
   - The page application contains index.html using the existing javascript/css
     files, so there are not any orphans
   - There are not missing files in the page application, so all references (in
     index.html) and imports in JS modules are valid
   - The code is type safe and clean
   - The code is properly tested
   - No usage of any type
   - Consistent file organization
   - Clear component separation

## Project Standards

### Technology Stack

- Deno runtime environment
- TypeScript for type-safe development
- ESM modules for dependency management
- Built-in development server with live reload
- Preact for UI components

### TypeScript Requirements

- Use `.ts` for TypeScript files, `.tsx` for JSX/TSX syntax
- Strict TypeScript configuration
- No `any` types
- Proper interfaces and type annotations

### Page Structure

```
pages/
└── [page-name]/
    ├── index.html    # Entry point
    ├── index.tsx     # Main preact component
    ├── index.ts      # Main code
    ├── types.ts      # Types
    └── README.md     # Documentation following the README Template structure
```

### README Template

```markdown
# [Page Title]

## Overview

Brief description of purpose and features.

## Technical Goals

- [ ] List of technical objectives
- [ ] Technologies/APIs to explore
- [ ] Performance targets

## Dependencies

- Main dependencies and versions
- Required external services

## Development Notes

- Implementation considerations
- Challenges and resources
```
