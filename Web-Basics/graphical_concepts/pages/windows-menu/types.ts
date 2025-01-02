export interface MenuItem {
    label: string;
    items?: MenuItem[];
    action?: () => void;
    icon?: string;  // For ribbon and app menu items
    description?: string;  // For ribbon tooltips
    shortcut?: string;  // For keyboard shortcuts
    disabled?: boolean; // For disabled items
}

export type MenuStyle = 'classic' | 'modern' | 'ribbon' | 'app';

export interface MenuBarProps {
    items: MenuItem[];
    style?: MenuStyle;
}
