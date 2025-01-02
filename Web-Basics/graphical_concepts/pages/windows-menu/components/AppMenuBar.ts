import { MenuItem } from "../types.ts";

export class AppMenuBar extends HTMLElement {
  private menuItems: MenuItem[] = [];
  private menuContainer: HTMLElement;
  private submenuContainer: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Create main container
    this.menuContainer = document.createElement("div");
    this.menuContainer.className = "menu-bar";

    // Create submenu container
    this.submenuContainer = document.createElement("div");
    this.submenuContainer.className = "submenu-container";

    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: block;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                user-select: none;
                --menu-bg: #ffffff;
                --menu-hover: #f0f0f0;
                --menu-active: #e5e5e5;
                --menu-border: #e0e0e0;
                --menu-text: #333333;
                --menu-disabled: #999999;
                --menu-shadow: 0 2px 6px rgba(0,0,0,0.15);
            }
            
            .menu-bar {
                display: flex;
                background-color: var(--menu-bg);
                border-bottom: 1px solid var(--menu-border);
                height: 30px;
                align-items: center;
                padding: 0 8px;
            }
            
            .menu-item {
                padding: 0 8px;
                height: 100%;
                display: flex;
                align-items: center;
                color: var(--menu-text);
                position: relative;
                font-size: 13px;
                cursor: default;
                border-radius: 3px;
                margin: 0 1px;
            }
            
            .menu-item:hover {
                background-color: var(--menu-hover);
            }
            
            .menu-item.active {
                background-color: var(--menu-active);
            }
            
            .menu-item.disabled {
                color: var(--menu-disabled);
                pointer-events: none;
            }
            
            .submenu-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
            }
            
            .submenu {
                display: none;
                position: absolute;
                background-color: var(--menu-bg);
                border: 1px solid var(--menu-border);
                border-radius: 4px;
                box-shadow: var(--menu-shadow);
                min-width: 200px;
                padding: 4px 0;
                pointer-events: auto;
            }
            
            .submenu.active {
                display: block;
            }
            
            .submenu-item {
                display: flex;
                align-items: center;
                padding: 6px 20px;
                font-size: 13px;
                color: var(--menu-text);
                position: relative;
                cursor: default;
            }
            
            .submenu-item:hover {
                background-color: var(--menu-hover);
            }
            
            .submenu-item.disabled {
                color: var(--menu-disabled);
                pointer-events: none;
            }
            
            .submenu-item .icon {
                width: 16px;
                height: 16px;
                margin-right: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
            
            .submenu-item .shortcut {
                margin-left: auto;
                padding-left: 20px;
                color: var(--menu-disabled);
                font-size: 12px;
            }
            
            .submenu-item.has-submenu::after {
                content: '›';
                position: absolute;
                right: 8px;
                font-size: 14px;
            }
            
            .separator {
                height: 1px;
                background-color: var(--menu-border);
                margin: 4px 0;
            }
        `;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(this.menuContainer);
    this.shadowRoot?.appendChild(this.submenuContainer);

    document.addEventListener("click", (e) => {
      if (!this.contains(e.target as Node)) {
        this.closeAllMenus();
      }
    });
  }

  private createSubmenu(
    items: MenuItem[],
    parentRect: DOMRect,
    isNested = false
  ): HTMLElement {
    const submenu = document.createElement("div");
    submenu.className = "submenu";

    items.forEach((item) => {
      if (item.label === "-") {
        const separator = document.createElement("div");
        separator.className = "separator";
        submenu.appendChild(separator);
      } else {
        const menuItem = document.createElement("div");
        menuItem.className = "submenu-item";

        if (item.disabled) {
          menuItem.classList.add("disabled");
        }

        if (item.icon) {
          const icon = document.createElement("span");
          icon.className = "icon";
          icon.textContent = item.icon;
          menuItem.appendChild(icon);
        }

        const label = document.createElement("span");
        label.className = "label";
        label.textContent = item.label;
        menuItem.appendChild(label);

        if (item.shortcut) {
          const shortcut = document.createElement("span");
          shortcut.className = "shortcut";
          shortcut.textContent = item.shortcut;
          menuItem.appendChild(shortcut);
        }

        if (item.items && item.items.length > 0) {
          menuItem.classList.add("has-submenu");

          menuItem.addEventListener("mouseenter", () => {
            const rect = menuItem.getBoundingClientRect();
            const childSubmenu = this.createSubmenu(
              item.items ?? [],
              rect,
              true
            );
            this.submenuContainer.appendChild(childSubmenu);

            // Position the submenu
            if (rect.right + 200 > window.innerWidth) {
              childSubmenu.style.right = "100%";
              childSubmenu.style.left = "auto";
            } else {
              childSubmenu.style.left = "100%";
              childSubmenu.style.right = "auto";
            }

            childSubmenu.style.top = "0";
            childSubmenu.classList.add("active");
          });

          menuItem.addEventListener("mouseleave", (e) => {
            const related = e.relatedTarget as HTMLElement;
            if (!menuItem.contains(related)) {
              const childSubmenus =
                this.submenuContainer.querySelectorAll(".submenu");
              childSubmenus.forEach((submenu) => {
                if (submenu !== menuItem.closest(".submenu")) {
                  submenu.remove();
                }
              });
            }
          });
        }

        if (item.action && !item.disabled) {
          menuItem.addEventListener("click", (e) => {
            e.stopPropagation();
            item.action?.();
            this.closeAllMenus();
          });
        }

        submenu.appendChild(menuItem);
      }
    });

    // Position the submenu
    if (!isNested) {
      submenu.style.top = `${parentRect.bottom}px`;
      submenu.style.left = `${parentRect.left}px`;

      // Check if submenu would go off-screen to the right
      if (parentRect.left + 200 > window.innerWidth) {
        submenu.style.left = "auto";
        submenu.style.right = "0";
      }
    }

    return submenu;
  }

  private createMenuItem(item: MenuItem): HTMLElement {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.textContent = item.label;

    if (item.items && item.items.length > 0) {
      menuItem.addEventListener("click", (e) => {
        e.stopPropagation();
        const wasActive = menuItem.classList.contains("active");
        this.closeAllMenus();

        if (!wasActive) {
          menuItem.classList.add("active");
          const rect = menuItem.getBoundingClientRect();
          const submenu = this.createSubmenu(item.items ?? [], rect);
          this.submenuContainer.appendChild(submenu);
          submenu.classList.add("active");
        }
      });
    } else if (item.action) {
      menuItem.addEventListener("click", (e) => {
        e.stopPropagation();
        item.action?.();
        this.closeAllMenus();
      });
    }

    return menuItem;
  }

  private closeAllMenus(): void {
    this.shadowRoot?.querySelectorAll(".menu-item.active").forEach((item) => {
      item.classList.remove("active");
    });
    this.submenuContainer.innerHTML = "";
  }

  setMenuItems(items: MenuItem[]): void {
    this.menuItems = items;
    this.menuContainer.innerHTML = "";
    this.submenuContainer.innerHTML = "";

    items.forEach((item) => {
      const menuItem = this.createMenuItem(item);
      this.menuContainer.appendChild(menuItem);
    });
  }

  setTheme(isDark: boolean): void {
    if (isDark) {
      this.style.setProperty("--menu-bg", "#252526");
      this.style.setProperty("--menu-hover", "#2a2d2e");
      this.style.setProperty("--menu-active", "#37373d");
      this.style.setProperty("--menu-border", "#454545");
      this.style.setProperty("--menu-text", "#cccccc");
      this.style.setProperty("--menu-disabled", "#666666");
    } else {
      this.style.setProperty("--menu-bg", "#ffffff");
      this.style.setProperty("--menu-hover", "#f0f0f0");
      this.style.setProperty("--menu-active", "#e5e5e5");
      this.style.setProperty("--menu-border", "#e0e0e0");
      this.style.setProperty("--menu-text", "#333333");
      this.style.setProperty("--menu-disabled", "#999999");
    }
  }
}

customElements.define("app-menu-bar", AppMenuBar);
