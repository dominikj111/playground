import { MenuItem } from "./types.ts";
import "./components/WindowsMenuBar.ts";
import "./components/ModernMenuBar.ts";
import "./components/RibbonMenuBar.ts";
import "./components/AppMenuBar.ts";

// Sample menu structure
const menuItems: MenuItem[] = [
    {
        label: 'File',
        items: [
            { 
                label: 'New',
                action: () => console.log('New clicked')
            },
            { 
                label: 'Open',
                action: () => console.log('Open clicked')
            },
            { 
                label: 'Save',
                action: () => console.log('Save clicked')
            },
            { 
                label: 'Exit',
                action: () => console.log('Exit clicked')
            }
        ]
    },
    {
        label: 'Edit',
        items: [
            { 
                label: 'Cut',
                action: () => console.log('Cut clicked')
            },
            { 
                label: 'Copy',
                action: () => console.log('Copy clicked')
            },
            { 
                label: 'Paste',
                action: () => console.log('Paste clicked')
            }
        ]
    },
    {
        label: 'View',
        items: [
            { 
                label: 'Zoom In',
                action: () => console.log('Zoom In clicked')
            },
            { 
                label: 'Zoom Out',
                action: () => console.log('Zoom Out clicked')
            },
            { 
                label: 'Reset Zoom',
                action: () => console.log('Reset Zoom clicked')
            }
        ]
    }
];

// Sample ribbon menu structure
const ribbonItems: MenuItem[] = [
    {
        label: 'Home',
        items: [
            {
                label: 'Clipboard',
                items: [
                    {
                        label: 'Paste',
                        icon: '📋',
                        action: () => console.log('Paste clicked'),
                        description: 'Paste content from clipboard'
                    },
                    {
                        label: 'Cut',
                        icon: '✂️',
                        action: () => console.log('Cut clicked'),
                        description: 'Cut selection to clipboard'
                    },
                    {
                        label: 'Copy',
                        icon: '📑',
                        action: () => console.log('Copy clicked'),
                        description: 'Copy selection to clipboard'
                    }
                ]
            },
            {
                label: 'Format',
                items: [
                    {
                        label: 'Bold',
                        icon: '𝐁',
                        action: () => console.log('Bold clicked'),
                        description: 'Make text bold'
                    },
                    {
                        label: 'Italic',
                        icon: '𝐼',
                        action: () => console.log('Italic clicked'),
                        description: 'Make text italic'
                    },
                    {
                        label: 'Underline',
                        icon: '̲U̲',
                        action: () => console.log('Underline clicked'),
                        description: 'Underline text'
                    }
                ]
            }
        ]
    },
    {
        label: 'Insert',
        items: [
            {
                label: 'Media',
                items: [
                    {
                        label: 'Picture',
                        icon: '🖼️',
                        action: () => console.log('Picture clicked'),
                        description: 'Insert picture from file'
                    },
                    {
                        label: 'Video',
                        icon: '🎬',
                        action: () => console.log('Video clicked'),
                        description: 'Insert video from file'
                    }
                ]
            }
        ]
    }
];

// Sample app menu structure
const appItems: MenuItem[] = [
    {
        label: 'File',
        items: [
            {
                label: 'New File',
                icon: '📄',
                shortcut: '⌘N',
                action: () => console.log('New File clicked')
            },
            {
                label: 'New Window',
                icon: '🗖',
                shortcut: '⇧⌘N',
                action: () => console.log('New Window clicked')
            },
            {
                label: 'New Incognito Window',
                icon: '🕶️',
                shortcut: '⇧⌘P',
                action: () => console.log('New Incognito Window clicked')
            },
            { label: '-' },
            {
                label: 'Open',
                icon: '📂',
                shortcut: '⌘O',
                action: () => console.log('Open clicked')
            },
            {
                label: 'Open Recent',
                icon: '🕒',
                items: [
                    {
                        label: 'Reopen Closed Tab',
                        shortcut: '⇧⌘T',
                        action: () => console.log('Reopen clicked')
                    },
                    {
                        label: 'Reopen Closed Window',
                        shortcut: '⇧⌘N',
                        action: () => console.log('Reopen Window clicked')
                    },
                    { label: '-' },
                    {
                        label: 'Recent Files',
                        items: [
                            {
                                label: 'document1.txt',
                                action: () => console.log('Open document1.txt')
                            },
                            {
                                label: 'document2.txt',
                                action: () => console.log('Open document2.txt')
                            }
                        ]
                    },
                    { label: '-' },
                    {
                        label: 'Clear Recently Closed',
                        action: () => console.log('Clear Recent clicked')
                    }
                ]
            },
            {
                label: 'Open Workspace...',
                icon: '📁',
                action: () => console.log('Open Workspace clicked')
            },
            { label: '-' },
            {
                label: 'Save',
                icon: '💾',
                shortcut: '⌘S',
                action: () => console.log('Save clicked')
            },
            {
                label: 'Save As...',
                shortcut: '⇧⌘S',
                action: () => console.log('Save As clicked')
            },
            {
                label: 'Save All',
                shortcut: '⌥⌘S',
                action: () => console.log('Save All clicked')
            },
            { label: '-' },
            {
                label: 'Share',
                icon: '🔗',
                items: [
                    {
                        label: 'Copy Link',
                        action: () => console.log('Copy Link clicked')
                    },
                    {
                        label: 'Email Link',
                        action: () => console.log('Email Link clicked')
                    }
                ]
            },
            { label: '-' },
            {
                label: 'Exit',
                shortcut: '⌘Q',
                action: () => console.log('Exit clicked')
            }
        ]
    },
    {
        label: 'Edit',
        items: [
            {
                label: 'Undo',
                icon: '↩',
                shortcut: '⌘Z',
                action: () => console.log('Undo clicked')
            },
            {
                label: 'Redo',
                icon: '↪',
                shortcut: '⇧⌘Z',
                action: () => console.log('Redo clicked')
            },
            { label: '-' },
            {
                label: 'Cut',
                icon: '✂️',
                shortcut: '⌘X',
                action: () => console.log('Cut clicked')
            },
            {
                label: 'Copy',
                icon: '📋',
                shortcut: '⌘C',
                action: () => console.log('Copy clicked')
            },
            {
                label: 'Paste',
                icon: '📎',
                shortcut: '⌘V',
                action: () => console.log('Paste clicked')
            },
            { label: '-' },
            {
                label: 'Find',
                icon: '🔍',
                items: [
                    {
                        label: 'Find',
                        shortcut: '⌘F',
                        action: () => console.log('Find clicked')
                    },
                    {
                        label: 'Find Next',
                        shortcut: '⌘G',
                        action: () => console.log('Find Next clicked')
                    },
                    {
                        label: 'Find Previous',
                        shortcut: '⇧⌘G',
                        action: () => console.log('Find Previous clicked')
                    },
                    { label: '-' },
                    {
                        label: 'Replace',
                        shortcut: '⌥⌘F',
                        action: () => console.log('Replace clicked')
                    }
                ]
            },
            { label: '-' },
            {
                label: 'Selection',
                items: [
                    {
                        label: 'Select All',
                        shortcut: '⌘A',
                        action: () => console.log('Select All clicked')
                    },
                    {
                        label: 'Expand Selection',
                        shortcut: '⇧⌥→',
                        action: () => console.log('Expand Selection clicked')
                    },
                    {
                        label: 'Shrink Selection',
                        shortcut: '⇧⌥←',
                        action: () => console.log('Shrink Selection clicked')
                    }
                ]
            }
        ]
    },
    {
        label: 'View',
        items: [
            {
                label: 'Command Palette',
                icon: '⌘',
                shortcut: '⇧⌘P',
                action: () => console.log('Command Palette clicked')
            },
            { label: '-' },
            {
                label: 'Appearance',
                icon: '👁',
                items: [
                    {
                        label: 'Light Theme',
                        action: () => {
                            const appMenu = document.querySelector('app-menu-bar') as any;
                            appMenu?.setTheme(false);
                        }
                    },
                    {
                        label: 'Dark Theme',
                        action: () => {
                            const appMenu = document.querySelector('app-menu-bar') as any;
                            appMenu?.setTheme(true);
                        }
                    },
                    { label: '-' },
                    {
                        label: 'High Contrast',
                        action: () => console.log('High Contrast clicked')
                    }
                ]
            },
            {
                label: 'Layout',
                icon: '⚏',
                items: [
                    {
                        label: 'Single Column',
                        action: () => console.log('Single Column clicked')
                    },
                    {
                        label: 'Two Columns',
                        action: () => console.log('Two Columns clicked')
                    },
                    {
                        label: 'Three Columns',
                        action: () => console.log('Three Columns clicked')
                    }
                ]
            },
            { label: '-' },
            {
                label: 'Zoom',
                items: [
                    {
                        label: 'Zoom In',
                        icon: '🔍',
                        shortcut: '⌘+',
                        action: () => console.log('Zoom In clicked')
                    },
                    {
                        label: 'Zoom Out',
                        icon: '🔍',
                        shortcut: '⌘-',
                        action: () => console.log('Zoom Out clicked')
                    },
                    {
                        label: 'Reset Zoom',
                        shortcut: '⌘0',
                        action: () => console.log('Reset Zoom clicked')
                    }
                ]
            },
            { label: '-' },
            {
                label: 'Side Bar',
                shortcut: '⌘B',
                action: () => console.log('Toggle Side Bar clicked')
            },
            {
                label: 'Status Bar',
                action: () => console.log('Toggle Status Bar clicked')
            }
        ]
    },
    {
        label: 'Help',
        items: [
            {
                label: 'Welcome',
                icon: '👋',
                action: () => console.log('Welcome clicked')
            },
            {
                label: 'Documentation',
                icon: '📚',
                action: () => console.log('Documentation clicked')
            },
            { label: '-' },
            {
                label: 'Release Notes',
                items: [
                    {
                        label: 'Current Version',
                        action: () => console.log('Current Version clicked')
                    },
                    {
                        label: 'Previous Versions',
                        action: () => console.log('Previous Versions clicked')
                    }
                ]
            },
            { label: '-' },
            {
                label: 'Keyboard Shortcuts',
                icon: '⌨️',
                shortcut: '⌘K ⌘S',
                action: () => console.log('Keyboard Shortcuts clicked')
            },
            {
                label: 'Report Issue',
                icon: '🐛',
                action: () => console.log('Report Issue clicked')
            },
            { label: '-' },
            {
                label: 'About',
                icon: 'ℹ️',
                action: () => console.log('About clicked')
            }
        ]
    }
];

// Create demo page content
const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100vh';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '40px';

// Add instructions
const instructions = document.createElement('p');
instructions.textContent = 'Resize containers to see how menus adapt →';
instructions.style.margin = '20px';

// Add classic menu section
const classicSection = document.createElement('div');
classicSection.style.display = 'flex';
classicSection.style.flexDirection = 'column';
classicSection.style.gap = '10px';

const classicTitle = document.createElement('h2');
classicTitle.textContent = 'Classic Windows Menu (nested menus on left)';
classicTitle.style.margin = '20px 20px 0';

const classicContainer = document.createElement('div');
classicContainer.style.border = '1px solid #ccc';
classicContainer.style.margin = '0 20px';
classicContainer.style.resize = 'horizontal';
classicContainer.style.overflow = 'auto';
classicContainer.style.minWidth = '200px';
classicContainer.style.maxWidth = '100%';

const classicMenu = document.createElement('windows-menu-bar') as any;
classicMenu.setMenuItems(menuItems);
classicContainer.appendChild(classicMenu);

classicSection.appendChild(classicTitle);
classicSection.appendChild(classicContainer);

// Add modern menu section
const modernSection = document.createElement('div');
modernSection.style.display = 'flex';
modernSection.style.flexDirection = 'column';
modernSection.style.gap = '10px';

const modernTitle = document.createElement('h2');
modernTitle.textContent = 'Modern Menu (nested menus underneath)';
modernTitle.style.margin = '20px 20px 0';

const modernContainer = document.createElement('div');
modernContainer.style.border = '1px solid #ccc';
modernContainer.style.margin = '0 20px';
modernContainer.style.resize = 'horizontal';
modernContainer.style.overflow = 'auto';
modernContainer.style.minWidth = '200px';
modernContainer.style.maxWidth = '100%';

const modernMenu = document.createElement('modern-menu-bar') as any;
modernMenu.setMenuItems(menuItems);
modernContainer.appendChild(modernMenu);

modernSection.appendChild(modernTitle);
modernSection.appendChild(modernContainer);

// Add ribbon menu section
const ribbonSection = document.createElement('div');
ribbonSection.style.display = 'flex';
ribbonSection.style.flexDirection = 'column';
ribbonSection.style.gap = '10px';

const ribbonTitle = document.createElement('h2');
ribbonTitle.textContent = 'Ribbon Menu (Office-style)';
ribbonTitle.style.margin = '20px 20px 0';

const ribbonContainer = document.createElement('div');
ribbonContainer.style.border = '1px solid #ccc';
ribbonContainer.style.margin = '0 20px';
ribbonContainer.style.resize = 'horizontal';
ribbonContainer.style.overflow = 'auto';
ribbonContainer.style.minWidth = '200px';
ribbonContainer.style.maxWidth = '100%';

const ribbonMenu = document.createElement('ribbon-menu-bar') as any;
ribbonMenu.setMenuItems(ribbonItems);
ribbonContainer.appendChild(ribbonMenu);

ribbonSection.appendChild(ribbonTitle);
ribbonSection.appendChild(ribbonContainer);

// Add app menu section
const appSection = document.createElement('div');
appSection.style.display = 'flex';
appSection.style.flexDirection = 'column';
appSection.style.gap = '10px';

const appTitle = document.createElement('h2');
appTitle.textContent = 'Modern App Menu (VS Code style)';
appTitle.style.margin = '20px 20px 0';

const appContainer = document.createElement('div');
appContainer.style.border = '1px solid #ccc';
appContainer.style.margin = '0 20px';
appContainer.style.resize = 'horizontal';
appContainer.style.overflow = 'auto';
appContainer.style.minWidth = '200px';
appContainer.style.maxWidth = '100%';

const appMenu = document.createElement('app-menu-bar') as any;
appMenu.setMenuItems(appItems);
appContainer.appendChild(appMenu);

appSection.appendChild(appTitle);
appSection.appendChild(appContainer);

container.appendChild(instructions);
container.appendChild(classicSection);
container.appendChild(modernSection);
container.appendChild(ribbonSection);
container.appendChild(appSection);

document.body.appendChild(container);
