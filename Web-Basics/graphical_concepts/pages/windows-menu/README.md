# Windows Menu Bar Component

This component implements a classic Windows-style menu bar with responsive overflow behavior.

## Features

- Classic Windows 95/98-style appearance
- Responsive overflow handling (items move to "..." menu when space is limited)
- Dropdown submenus
- Keyboard navigation support
- Proper event handling for clicks and focus
- TypeScript type safety

## Usage

```typescript
import { MenuItem } from "./types.ts";
import "./components/WindowsMenuBar.ts";

// Define your menu structure
const menuItems: MenuItem[] = [
    {
        label: 'File',
        items: [
            { 
                label: 'New',
                action: () => console.log('New clicked')
            },
            // ... more menu items
        ]
    }
];

// Create and use the menu bar
const menuBar = document.createElement('windows-menu-bar') as any;
menuBar.setMenuItems(menuItems);
document.body.appendChild(menuBar);
```

## Types

The component uses TypeScript interfaces for type safety:

```typescript
interface MenuItem {
    label: string;
    items?: MenuItem[];
    action?: () => void;
}
```

## Styling

The component uses Shadow DOM for style encapsulation and provides a classic Windows look and feel. The menu automatically adapts to container width, moving items to an overflow menu when space is limited.
