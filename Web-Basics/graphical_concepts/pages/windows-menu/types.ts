export interface MenuItem {
    label: string;
    items?: MenuItem[];
    action?: () => void;
}

export interface MenuBarProps {
    items: MenuItem[];
}
