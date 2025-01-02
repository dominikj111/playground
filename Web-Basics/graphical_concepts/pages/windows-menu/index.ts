import { MenuItem } from "./types.ts";
import "./components/WindowsMenuBar.ts";

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
    },
    {
        label: 'Tools',
        items: [
            { 
                label: 'Options',
                action: () => console.log('Options clicked')
            },
            { 
                label: 'Customize',
                action: () => console.log('Customize clicked')
            }
        ]
    },
    {
        label: 'Help',
        items: [
            { 
                label: 'About',
                action: () => console.log('About clicked')
            },
            { 
                label: 'Documentation',
                action: () => console.log('Documentation clicked')
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

// Add menu bar
const menuBar = document.createElement('windows-menu-bar') as any;
menuBar.setMenuItems(menuItems);

// Add resizable container for testing
const resizeContainer = document.createElement('div');
resizeContainer.style.border = '1px solid #ccc';
resizeContainer.style.margin = '20px';
resizeContainer.style.padding = '10px';
resizeContainer.style.resize = 'horizontal';
resizeContainer.style.overflow = 'auto';
resizeContainer.style.minWidth = '200px';
resizeContainer.style.maxWidth = '100%';
resizeContainer.appendChild(menuBar);

// Add instructions
const instructions = document.createElement('p');
instructions.textContent = 'Resize this container to see how the menu adapts →';
instructions.style.margin = '20px';

container.appendChild(instructions);
container.appendChild(resizeContainer);

document.body.appendChild(container);
