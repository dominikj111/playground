// Core aura visualization functionality
export class AuraVisualizer {
    constructor() {
        this.canvas = document.getElementById('aura-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.silhouetteLoaded = false;
        
        // Load human silhouette
        this.silhouette = new Image();
        this.silhouette.onload = () => {
            this.silhouetteLoaded = true;
            this.resizeCanvas();
            this.drawAura('white', [], null);
        };
        this.silhouette.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <!-- Head -->
                <circle cx="50" cy="30" r="20" fill="url(#bodyGradient)"/>
                <!-- Neck -->
                <rect x="45" y="50" width="10" height="15" fill="url(#bodyGradient)"/>
                <!-- Body -->
                <path d="M30,65 L70,65 L75,150 L25,150 Z" fill="url(#bodyGradient)"/>
                <!-- Arms -->
                <path d="M30,65 L10,110 L15,115 L35,70" fill="url(#bodyGradient)"/>
                <path d="M70,65 L90,110 L85,115 L65,70" fill="url(#bodyGradient)"/>
                <!-- Legs -->
                <path d="M25,150 L20,200 L35,200 L45,150" fill="url(#bodyGradient)"/>
                <path d="M75,150 L80,200 L65,200 L55,150" fill="url(#bodyGradient)"/>
            </svg>
        `);

        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth, container.clientHeight);
        this.canvas.width = size;
        this.canvas.height = size;
        
        // Only redraw if silhouette is loaded
        if (this.silhouetteLoaded) {
            this.drawAura('white', [], null);
        }
    }

    // Draw multiple aura layers
    drawAura(mainColor, additionalColors = [], mood = null) {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const baseRadius = Math.min(this.canvas.width, this.canvas.height) / 3;

        // Draw background gradient
        const bgGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, this.canvas.width
        );
        bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw multiple aura layers
        const layers = [mainColor, ...additionalColors].slice(0, 3);
        layers.forEach((color, index) => {
            const radius = baseRadius * (1 + index * 0.3);
            this.drawAuraLayer(centerX, centerY, radius, color, 0.3 / (index + 1));
        });

        // Draw human silhouette if loaded
        if (this.silhouetteLoaded) {
            const silhouetteWidth = baseRadius * 0.8;
            const silhouetteHeight = baseRadius * 1.6;
            this.ctx.drawImage(
                this.silhouette,
                centerX - silhouetteWidth / 2,
                centerY - silhouetteHeight / 2,
                silhouetteWidth,
                silhouetteHeight
            );
        }

        // Add mood-based glow if mood is provided
        if (mood) {
            this.addMoodGlow(centerX, centerY, baseRadius, mood);
        }
    }

    addMoodGlow(centerX, centerY, baseRadius, mood) {
        const moodColors = {
            happy: 'rgba(255, 223, 0, 0.2)',    // Golden yellow
            calm: 'rgba(173, 216, 230, 0.2)',   // Light blue
            excited: 'rgba(255, 105, 180, 0.2)', // Hot pink
            sad: 'rgba(0, 0, 139, 0.2)',        // Dark blue
            angry: 'rgba(255, 0, 0, 0.2)',      // Red
            neutral: 'rgba(192, 192, 192, 0.2)'  // Gray
        };

        const color = moodColors[mood] || 'rgba(255, 255, 255, 0.2)';
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, baseRadius * 1.5,
            centerX, centerY, baseRadius * 2.5
        );

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAuraLayer(centerX, centerY, radius, color, opacity) {
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
            yellow: 'rgba(255, 255, 0, ',
            orange: 'rgba(255, 165, 0, '
        };

        const baseColor = colorMap[color] || 'rgba(255, 255, 255, ';

        gradient.addColorStop(0, baseColor + opacity + ')');
        gradient.addColorStop(0.5, baseColor + (opacity/2) + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
