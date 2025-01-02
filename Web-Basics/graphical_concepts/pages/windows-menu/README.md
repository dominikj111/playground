# Windows-Style Menu Bar Components

This project implements four variants of a Windows-style menu bar using TypeScript and Web Components:

1. Classic Windows Menu Bar
2. Modern Menu Bar
3. Ribbon Menu Bar (Office-style)
4. Modern App Menu Bar (VS Code-style)

All components are responsive and handle overflow gracefully when the window is resized.

## Features

### Common Features (All Styles)
- Responsive design that adapts to window size
- Overflow menu (▼) for hidden items when space is limited
- Support for nested menus up to multiple levels deep
- Keyboard navigation support
- Click-to-open main menu items
- Clean and consistent styling

### Classic Windows Menu Bar
- Traditional Windows-style appearance
- Nested menus appear to the left of parent items
- Uses left-pointing arrows (◄) for nested menu indicators
- Maintains Windows 95/98 era menu behavior
- Perfect for applications requiring classic Windows look

### Modern Menu Bar
- Contemporary styling and behavior
- Nested menus appear to the right of parent items
- Uses right-pointing arrows (►) for nested menu indicators
- More modern dropdown-style behavior
- Suitable for modern web applications

### Ribbon Menu Bar
- Microsoft Office-style ribbon interface
- Tabbed interface with expandable sections
- Support for icons and tooltips
- Groups related commands together
- Visual command organization with icons and labels
- Perfect for feature-rich applications

### Modern App Menu Bar
- Contemporary VS Code/Electron-style appearance
- Support for icons and keyboard shortcuts
- Light and dark theme support
- Separators for menu organization
- Disabled state support for menu items
- Perfect for modern desktop applications

## Usage

### Installation
```typescript
// Import the components
import "./components/WindowsMenuBar.ts";  // Classic style
import "./components/ModernMenuBar.ts";   // Modern style
import "./components/RibbonMenuBar.ts";   // Ribbon style
import "./components/AppMenuBar.ts";      // Modern app style
```

### Basic Implementation
```html
<!-- Classic Windows Menu -->
<windows-menu-bar></windows-menu-bar>

<!-- Modern Menu -->
<modern-menu-bar></modern-menu-bar>

<!-- Ribbon Menu -->
<ribbon-menu-bar></ribbon-menu-bar>

<!-- Modern App Menu -->
<app-menu-bar></app-menu-bar>
```

### Menu Configuration

#### Classic/Modern Menu
```typescript
const menuItems = [
    {
        label: 'File',
        items: [
            { 
                label: 'New',
                action: () => console.log('New clicked')
            },
            { 
                label: 'Open',
                items: [  // Nested submenu
                    {
                        label: 'Project',
                        action: () => console.log('Open Project')
                    }
                ]
            }
        ]
    }
];

// Set menu items
const menuBar = document.querySelector('windows-menu-bar');
menuBar.setMenuItems(menuItems);
```

#### Ribbon Menu
```typescript
const ribbonItems = [
    {
        label: 'Home',
        items: [
            {
                label: 'Clipboard',  // Group label
                items: [
                    {
                        label: 'Paste',
                        icon: '📋',  // Icon for the button
                        action: () => console.log('Paste clicked'),
                        description: 'Paste content from clipboard'  // Tooltip
                    }
                ]
            }
        ]
    }
];

// Set ribbon items
const ribbonBar = document.querySelector('ribbon-menu-bar');
ribbonBar.setMenuItems(ribbonItems);
```

#### Modern App Menu
```typescript
const appItems = [
    {
        label: 'File',
        items: [
            {
                label: 'New File',
                icon: '📄',               // Optional icon
                shortcut: '⌘N',           // Optional keyboard shortcut
                action: () => console.log('New clicked'),
                disabled: false           // Optional disabled state
            },
            { label: '-' },              // Separator
            {
                label: 'Open Recent',
                items: [                  // Nested submenu
                    {
                        label: 'Reopen Closed Editor',
                        shortcut: '⇧⌘T'
                    }
                ]
            }
        ]
    }
];

// Set menu items
const appMenu = document.querySelector('app-menu-bar');
appMenu.setMenuItems(appItems);

// Optional: Set theme
appMenu.setTheme(true);  // true for dark theme, false for light theme
```

## Menu Item Interfaces
```typescript
interface MenuItem {
    label: string;           // Text to display
    items?: MenuItem[];      // Optional submenu items
    action?: () => void;     // Optional click handler
    icon?: string;          // Optional icon (for ribbon/app menu)
    description?: string;   // Optional tooltip (for ribbon menu)
    shortcut?: string;     // Optional keyboard shortcut (for app menu)
    disabled?: boolean;    // Optional disabled state
}
```

## Behavior Specifications

### Classic Menu
- Click to open/close
- Nested menus appear to the left
- Only one menu open at a time
- Click outside to close all menus

### Modern Menu
- Click to open/close
- Nested menus appear to the right
- Only one menu open at a time
- Click outside to close all menus

### Ribbon Menu
- Click tabs to switch sections
- Groups organize related commands
- Icons and labels for visual clarity
- Tooltips provide additional information
- Click outside to close active tab

### Modern App Menu
- Click to open/close menus
- Hover to open submenus
- Support for keyboard shortcuts
- Icons for visual recognition
- Separators for menu organization
- Light/dark theme support
- Disabled state styling
- Click outside to close all menus

## Styling
All components use Shadow DOM for encapsulation and provide consistent styling across browsers. The styling respects:
- Windows-like appearance for classic menu
- Office-like appearance for ribbon menu
- VS Code-like appearance for app menu
- Proper spacing and alignment
- Hover states and transitions
- Consistent menu widths
- Proper z-indexing for overlays
- Theme-aware styling (light/dark modes)

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Building
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
windows-menu/
├── components/
│   ├── WindowsMenuBar.ts    # Classic Windows menu
│   ├── ModernMenuBar.ts     # Modern menu variant
│   ├── RibbonMenuBar.ts     # Office-style ribbon menu
│   └── AppMenuBar.ts        # Modern app menu
├── types.ts                 # TypeScript interfaces
├── index.ts                 # Demo implementation
└── index.html              # Demo page
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
