import { MenuItem } from "../types.ts";

export class WindowsMenuBar extends HTMLElement {
    private menuItems: MenuItem[] = [];
    private menuContainer: HTMLElement;
    private overflowButton: HTMLElement | null = null;
    private hiddenItems: MenuItem[] = [];
    private resizeObserver: ResizeObserver;
    private resizeTimeout: number | null = null;
    private activeSubmenu: HTMLElement | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Create main container
        this.menuContainer = document.createElement('div');
        this.menuContainer.className = 'menu-bar';
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                user-select: none;
            }
            
            .menu-bar {
                display: flex;
                background-color: #f0f0f0;
                border-bottom: 1px solid #d1d1d1;
                height: 25px;
                align-items: center;
                padding: 0 4px;
                position: relative;
            }
            
            .menu-item {
                padding: 2px 8px;
                cursor: default;
                position: relative;
                color: #000;
                white-space: nowrap;
            }
            
            .menu-item:hover {
                background-color: #e5e5e5;
            }
            
            .submenu {
                display: none;
                position: fixed;
                background-color: #f0f0f0;
                border: 1px solid #d1d1d1;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                z-index: 1000;
                min-width: 150px;
            }
            
            .submenu-item {
                padding: 4px 20px;
                cursor: default;
                white-space: nowrap;
                position: relative;
            }
            
            .submenu-item:hover {
                background-color: #e5e5e5;
            }
            
            .overflow-button {
                display: none;
                padding: 2px 8px;
                cursor: default;
                margin-left: auto;
                position: relative;
            }
            
            .overflow-button:hover {
                background-color: #e5e5e5;
            }
            
            .overflow-button .submenu {
                position: fixed;
                top: 100%;
                right: 0;
                left: auto;
            }
            
            .submenu-item .submenu {
                position: absolute;
                top: 0;
                left: -100%;
                margin-left: -2px;
            }
            
            .submenu .submenu {
                position: fixed;
                left: auto;
                right: 100%;
                top: 0;
            }
            
            .menu-item.active {
                background-color: #e5e5e5;
            }
            
            .menu-item.active .submenu,
            .overflow-button.active .submenu {
                display: block;
            }
            
            .hidden {
                display: none !important;
            }
        `;
        
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(this.menuContainer);
        
        // Setup resize observer with debouncing
        this.resizeObserver = new ResizeObserver(() => {
            if (this.resizeTimeout) {
                window.clearTimeout(this.resizeTimeout);
            }
            this.resizeTimeout = window.setTimeout(() => this.handleResize(), 100);
        });
        this.resizeObserver.observe(this);
        
        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target as Node)) {
                this.closeAllMenus();
            }
        });
    }
    
    private createMenuItem(item: MenuItem): HTMLElement {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.textContent = item.label;
        
        if (item.items && item.items.length > 0) {
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            
            item.items.forEach(subItem => {
                const submenuItem = document.createElement('div');
                submenuItem.className = 'submenu-item';
                submenuItem.textContent = subItem.label;
                
                if (subItem.action) {
                    submenuItem.addEventListener('click', (e) => {
                        e.stopPropagation();
                        subItem.action?.();
                        this.closeAllMenus();
                    });
                }
                
                submenu.appendChild(submenuItem);
            });
            
            menuItem.appendChild(submenu);
            
            menuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeAllMenus();
                menuItem.classList.add('active');
                this.activeSubmenu = submenu;
                this.positionSubmenu(menuItem, submenu);
            });
        } else if (item.action) {
            menuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                item.action?.();
                this.closeAllMenus();
            });
        }
        
        return menuItem;
    }
    
    private positionSubmenu(menuItem: HTMLElement, submenu: HTMLElement): void {
        const menuItemRect = menuItem.getBoundingClientRect();
        const submenuRect = submenu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Initial position below the menu item
        let top = menuItemRect.bottom;
        let left = menuItemRect.left;

        // Check if submenu would go off the right edge
        if (left + submenuRect.width > viewportWidth) {
            left = viewportWidth - submenuRect.width - 5;
        }

        // Check if submenu would go off the bottom edge
        if (top + submenuRect.height > viewportHeight) {
            top = menuItemRect.top - submenuRect.height;
        }

        submenu.style.top = `${top}px`;
        submenu.style.left = `${left}px`;
    }
    
    private closeAllMenus(): void {
        this.shadowRoot?.querySelectorAll('.menu-item.active, .overflow-button.active').forEach(item => {
            item.classList.remove('active');
        });
        if (this.activeSubmenu) {
            this.activeSubmenu.style.display = 'none';
            this.activeSubmenu = null;
        }
    }
    
    private handleResize(): void {
        const containerWidth = this.menuContainer.offsetWidth;
        let currentWidth = 0;
        this.hiddenItems = [];
        const visibleItems: HTMLElement[] = [];
        
        // Get all menu items except the overflow button
        const menuItems = Array.from(this.menuContainer.querySelectorAll('.menu-item')).filter(
            item => !item.classList.contains('overflow-button')
        ) as HTMLElement[];
        
        // Calculate which items need to be hidden
        menuItems.forEach((menuItem, index) => {
            if (menuItem === this.overflowButton) return;
            
            const itemWidth = menuItem.offsetWidth;
            if (currentWidth + itemWidth > containerWidth - 40) { // Leave space for overflow button
                menuItem.classList.add('hidden');
                this.hiddenItems.push(this.menuItems[index]);
            } else {
                menuItem.classList.remove('hidden');
                visibleItems.push(menuItem);
                currentWidth += itemWidth;
            }
        });
        
        // Show/hide overflow button
        if (this.hiddenItems.length > 0) {
            if (!this.overflowButton) {
                this.overflowButton = document.createElement('div');
                this.overflowButton.className = 'overflow-button';
                this.overflowButton.textContent = '▼';
                
                const submenu = document.createElement('div');
                submenu.className = 'submenu';
                this.overflowButton.appendChild(submenu);
                
                this.overflowButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.closeAllMenus();
                    this.overflowButton?.classList.add('active');
                    if (submenu) {
                        this.activeSubmenu = submenu;
                        const buttonRect = this.overflowButton!.getBoundingClientRect();
                        submenu.style.top = `${buttonRect.bottom}px`;
                        submenu.style.right = `${window.innerWidth - buttonRect.right}px`;
                        submenu.style.display = 'block';
                    }
                });
                
                this.menuContainer.appendChild(this.overflowButton);
            }
            
            // Update overflow menu items
            const submenu = this.overflowButton.querySelector('.submenu');
            if (submenu) {
                submenu.innerHTML = '';
                this.hiddenItems.forEach(item => {
                    const submenuItem = document.createElement('div');
                    submenuItem.className = 'submenu-item';
                    submenuItem.style.position = 'relative';
                    submenuItem.innerHTML = `${item.label} ◄`;
                    
                    if (item.items && item.items.length > 0) {
                        const nestedSubmenu = document.createElement('div');
                        nestedSubmenu.className = 'submenu';
                        nestedSubmenu.style.position = 'absolute';
                        
                        item.items.forEach(subItem => {
                            const nestedItem = document.createElement('div');
                            nestedItem.className = 'submenu-item';
                            nestedItem.textContent = subItem.label;
                            
                            if (subItem.action) {
                                nestedItem.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    subItem.action?.();
                                    this.closeAllMenus();
                                });
                            }
                            
                            nestedSubmenu.appendChild(nestedItem);
                        });
                        
                        submenuItem.appendChild(nestedSubmenu);
                        submenuItem.addEventListener('mouseenter', () => {
                            nestedSubmenu.style.display = 'block';
                        });
                        
                        submenuItem.addEventListener('mouseleave', () => {
                            nestedSubmenu.style.display = 'none';
                        });
                    } else if (item.action) {
                        submenuItem.addEventListener('click', (e) => {
                            e.stopPropagation();
                            item.action?.();
                            this.closeAllMenus();
                        });
                    }
                    
                    submenu.appendChild(submenuItem);
                });
            }
            
            this.overflowButton.style.display = 'block';
        } else if (this.overflowButton) {
            this.overflowButton.style.display = 'none';
        }
    }
    
    setMenuItems(items: MenuItem[]): void {
        this.menuItems = items;
        this.menuContainer.innerHTML = '';
        
        items.forEach(item => {
            const menuItem = this.createMenuItem(item);
            this.menuContainer.appendChild(menuItem);
        });
        
        // Initial resize check
        this.handleResize();
    }
}

customElements.define('windows-menu-bar', WindowsMenuBar);
