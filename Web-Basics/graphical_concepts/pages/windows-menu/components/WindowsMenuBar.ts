import { MenuItem } from "../types.ts";

export class WindowsMenuBar extends HTMLElement {
    private menuItems: MenuItem[] = [];
    private menuContainer: HTMLElement;
    private overflowButton: HTMLElement | null = null;
    private hiddenItems: MenuItem[] = [];
    private resizeObserver: ResizeObserver;

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
            }
            
            .menu-item {
                padding: 2px 8px;
                cursor: default;
                position: relative;
                color: #000;
            }
            
            .menu-item:hover {
                background-color: #e5e5e5;
            }
            
            .submenu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: #f0f0f0;
                border: 1px solid #d1d1d1;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                z-index: 1000;
                min-width: 150px;
            }
            
            .submenu-item {
                padding: 4px 20px;
                cursor: default;
            }
            
            .submenu-item:hover {
                background-color: #e5e5e5;
            }
            
            .overflow-button {
                display: none;
                padding: 2px 8px;
                cursor: default;
            }
            
            .overflow-button:hover {
                background-color: #e5e5e5;
            }
            
            .menu-item.active .submenu {
                display: block;
            }
        `;
        
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(this.menuContainer);
        
        // Setup resize observer
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
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
    
    private closeAllMenus(): void {
        this.shadowRoot?.querySelectorAll('.menu-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    private handleResize(): void {
        const containerWidth = this.menuContainer.offsetWidth;
        let currentWidth = 0;
        this.hiddenItems = [];
        
        // Reset visibility
        this.menuContainer.querySelectorAll('.menu-item').forEach((item, index) => {
            const menuItem = item as HTMLElement;
            currentWidth += menuItem.offsetWidth;
            
            if (currentWidth > containerWidth - 40) { // Leave space for overflow button
                menuItem.style.display = 'none';
                this.hiddenItems.push(this.menuItems[index]);
            } else {
                menuItem.style.display = 'block';
            }
        });
        
        // Show/hide overflow button
        if (this.hiddenItems.length > 0) {
            if (!this.overflowButton) {
                this.overflowButton = this.createMenuItem({
                    label: '...',
                    items: this.hiddenItems
                });
                this.overflowButton.className = 'overflow-button';
                this.menuContainer.appendChild(this.overflowButton);
            } else {
                this.overflowButton.style.display = 'block';
                // Update overflow menu items
                const submenu = this.overflowButton.querySelector('.submenu');
                if (submenu) {
                    submenu.innerHTML = '';
                    this.hiddenItems.forEach(item => {
                        const submenuItem = document.createElement('div');
                        submenuItem.className = 'submenu-item';
                        submenuItem.textContent = item.label;
                        if (item.action) {
                            submenuItem.addEventListener('click', (e) => {
                                e.stopPropagation();
                                item.action?.();
                                this.closeAllMenus();
                            });
                        }
                        submenu.appendChild(submenuItem);
                    });
                }
            }
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
