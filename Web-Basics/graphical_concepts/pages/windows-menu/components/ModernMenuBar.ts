import { MenuItem, MenuStyle } from "../types.ts";

export class ModernMenuBar extends HTMLElement {
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
                position: absolute;
                background-color: #f0f0f0;
                border: 1px solid #d1d1d1;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                z-index: 1000;
                min-width: 150px;
            }
            
            .menu-item > .submenu {
                position: fixed;
                top: 100%;
                left: 0;
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
            
            .submenu-item > .submenu {
                position: absolute;
                top: 0;
                left: 100%;
            }
            
            .overflow-button > .submenu {
                position: fixed;
                top: 100%;
                right: 0;
            }
            
            .has-submenu::after {
                content: '▼';
                font-size: 0.8em;
                margin-left: 5px;
            }
            
            .submenu .has-submenu::after {
                content: '►';
            }
            
            .active > .submenu {
                display: block;
            }
            
            .active {
                background-color: #e5e5e5;
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
            menuItem.classList.add('has-submenu');
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            
            item.items.forEach(subItem => {
                const submenuItem = document.createElement('div');
                submenuItem.className = 'submenu-item';
                submenuItem.textContent = subItem.label;
                
                if (subItem.items && subItem.items.length > 0) {
                    submenuItem.classList.add('has-submenu');
                    const nestedSubmenu = document.createElement('div');
                    nestedSubmenu.className = 'submenu';
                    
                    subItem.items.forEach(nestedItem => {
                        const nestedMenuItem = document.createElement('div');
                        nestedMenuItem.className = 'submenu-item';
                        nestedMenuItem.textContent = nestedItem.label;
                        
                        if (nestedItem.action) {
                            nestedMenuItem.addEventListener('click', (e) => {
                                e.stopPropagation();
                                nestedItem.action?.();
                                this.closeAllMenus();
                            });
                        }
                        
                        nestedSubmenu.appendChild(nestedMenuItem);
                    });
                    
                    submenuItem.appendChild(nestedSubmenu);
                    submenuItem.addEventListener('mouseenter', () => {
                        const activeItems = this.shadowRoot?.querySelectorAll('.submenu-item.active');
                        activeItems?.forEach(item => item.classList.remove('active'));
                        submenuItem.classList.add('active');
                    });
                } else if (subItem.action) {
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
                const wasActive = menuItem.classList.contains('active');
                this.closeAllMenus();
                if (!wasActive) {
                    menuItem.classList.add('active');
                    const rect = menuItem.getBoundingClientRect();
                    submenu.style.left = `${rect.left}px`;
                }
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
    
    private handleResize(): void {
        const containerWidth = this.menuContainer.offsetWidth;
        let currentWidth = 0;
        this.hiddenItems = [];
        
        const menuItems = Array.from(this.menuContainer.querySelectorAll('.menu-item')).filter(
            item => !item.classList.contains('overflow-button')
        ) as HTMLElement[];
        
        menuItems.forEach((menuItem, index) => {
            if (menuItem === this.overflowButton) return;
            
            const itemWidth = menuItem.offsetWidth;
            if (currentWidth + itemWidth > containerWidth - 40) {
                menuItem.classList.add('hidden');
                this.hiddenItems.push(this.menuItems[index]);
            } else {
                menuItem.classList.remove('hidden');
                currentWidth += itemWidth;
            }
        });
        
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
                    const wasActive = this.overflowButton?.classList.contains('active');
                    this.closeAllMenus();
                    if (!wasActive) {
                        this.overflowButton?.classList.add('active');
                    }
                });
                
                this.menuContainer.appendChild(this.overflowButton);
            }
            
            this.overflowButton.style.display = 'block';
            const submenu = this.overflowButton.querySelector('.submenu');
            if (submenu) {
                submenu.innerHTML = '';
                this.hiddenItems.forEach(item => {
                    const menuItem = this.createMenuItem(item);
                    menuItem.classList.remove('menu-item');
                    menuItem.classList.add('submenu-item');
                    submenu.appendChild(menuItem);
                });
            }
        } else if (this.overflowButton) {
            this.overflowButton.style.display = 'none';
        }
    }
    
    private closeAllMenus(): void {
        this.shadowRoot?.querySelectorAll('.active').forEach(item => {
            item.classList.remove('active');
        });
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

customElements.define('modern-menu-bar', ModernMenuBar);
