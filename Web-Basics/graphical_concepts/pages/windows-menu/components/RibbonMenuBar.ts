import { MenuItem } from "../types.ts";

export class RibbonMenuBar extends HTMLElement {
    private menuItems: MenuItem[] = [];
    private menuContainer: HTMLElement;
    private activeTab: HTMLElement | null = null;
    private ribbonContent: HTMLElement;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Create main container
        this.menuContainer = document.createElement('div');
        this.menuContainer.className = 'menu-bar';
        
        // Create ribbon content area
        this.ribbonContent = document.createElement('div');
        this.ribbonContent.className = 'ribbon-content';
        
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
                height: 30px;
                align-items: center;
                padding: 0 4px;
                position: relative;
            }
            
            .menu-item {
                padding: 4px 12px;
                cursor: default;
                position: relative;
                color: #000;
                border-radius: 3px 3px 0 0;
            }
            
            .menu-item:hover {
                background-color: #e5e5e5;
            }
            
            .menu-item.active {
                background-color: #fff;
                border: 1px solid #d1d1d1;
                border-bottom: none;
            }
            
            .ribbon-content {
                display: none;
                background-color: #fff;
                border-bottom: 1px solid #d1d1d1;
                padding: 8px;
                min-height: 100px;
            }
            
            .ribbon-content.active {
                display: block;
            }
            
            .ribbon-group {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                padding: 4px 8px;
                border-right: 1px solid #e0e0e0;
                min-width: 80px;
            }
            
            .ribbon-group:last-child {
                border-right: none;
            }
            
            .ribbon-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 4px;
                border-radius: 3px;
                cursor: default;
                margin: 2px;
            }
            
            .ribbon-button:hover {
                background-color: #e5e5e5;
            }
            
            .ribbon-button .icon {
                font-size: 24px;
                margin-bottom: 4px;
            }
            
            .ribbon-button .label {
                font-size: 12px;
                text-align: center;
            }
            
            .ribbon-section {
                display: none;
                padding: 8px;
            }
            
            .ribbon-section.active {
                display: flex;
            }
        `;
        
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(this.menuContainer);
        this.shadowRoot?.appendChild(this.ribbonContent);
        
        // Close ribbon when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target as Node)) {
                this.closeAllTabs();
            }
        });
    }
    
    private createRibbonSection(item: MenuItem): HTMLElement {
        const section = document.createElement('div');
        section.className = 'ribbon-section';
        
        if (item.items) {
            item.items.forEach(group => {
                const ribbonGroup = document.createElement('div');
                ribbonGroup.className = 'ribbon-group';
                
                if (group.items) {
                    group.items.forEach(button => {
                        const ribbonButton = document.createElement('div');
                        ribbonButton.className = 'ribbon-button';
                        
                        if (button.icon) {
                            const icon = document.createElement('div');
                            icon.className = 'icon';
                            icon.textContent = button.icon;
                            ribbonButton.appendChild(icon);
                        }
                        
                        const label = document.createElement('div');
                        label.className = 'label';
                        label.textContent = button.label;
                        ribbonButton.appendChild(label);
                        
                        if (button.action) {
                            ribbonButton.addEventListener('click', (e) => {
                                e.stopPropagation();
                                button.action?.();
                            });
                        }
                        
                        if (button.description) {
                            ribbonButton.title = button.description;
                        }
                        
                        ribbonGroup.appendChild(ribbonButton);
                    });
                }
                
                section.appendChild(ribbonGroup);
            });
        }
        
        return section;
    }
    
    private createMenuItem(item: MenuItem): HTMLElement {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.textContent = item.label;
        
        const section = this.createRibbonSection(item);
        this.ribbonContent.appendChild(section);
        
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasActive = menuItem === this.activeTab;
            this.closeAllTabs();
            
            if (!wasActive) {
                menuItem.classList.add('active');
                section.classList.add('active');
                this.ribbonContent.classList.add('active');
                this.activeTab = menuItem;
            }
        });
        
        return menuItem;
    }
    
    private closeAllTabs(): void {
        this.shadowRoot?.querySelectorAll('.menu-item.active').forEach(item => {
            item.classList.remove('active');
        });
        this.shadowRoot?.querySelectorAll('.ribbon-section.active').forEach(section => {
            section.classList.remove('active');
        });
        this.ribbonContent.classList.remove('active');
        this.activeTab = null;
    }
    
    setMenuItems(items: MenuItem[]): void {
        this.menuItems = items;
        this.menuContainer.innerHTML = '';
        this.ribbonContent.innerHTML = '';
        
        items.forEach(item => {
            const menuItem = this.createMenuItem(item);
            this.menuContainer.appendChild(menuItem);
        });
    }
}

customElements.define('ribbon-menu-bar', RibbonMenuBar);
