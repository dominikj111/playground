// Core aura visualization functionality
export class AuraVisualizer {
    constructor() {
        this.canvas = document.getElementById('aura-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.updateSize(640, 480); // Set initial size
    }

    // Basic aura visualization
    drawAura(color) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(this.canvas.width, this.canvas.height) / 3;

        // Create gradient for aura effect
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, radius * 0.5,
            centerX, centerY, radius * 2
        );

        // Convert color name to rgba
        const colorMap = {
            red: 'rgba(255, 0, 0, ',
            green: 'rgba(0, 255, 0, ',
            blue: 'rgba(0, 0, 255, ',
            white: 'rgba(255, 255, 255, ',
            purple: 'rgba(128, 0, 128, ',
            yellow: 'rgba(255, 255, 0, '
        };

        const baseColor = colorMap[color] || 'rgba(255, 255, 255, ';

        gradient.addColorStop(0, baseColor + '0.1)');
        gradient.addColorStop(0.5, baseColor + '0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Can be enhanced later with multiple layers and effects
    updateSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}
