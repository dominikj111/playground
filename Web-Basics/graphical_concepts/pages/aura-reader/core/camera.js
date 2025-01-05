// Core camera functionality using Media Capture API
export class CameraManager {
    constructor() {
        this.video = document.getElementById('camera-view');
        this.imageDisplay = document.createElement('img');
        this.imageDisplay.style.width = '100%';
        this.imageDisplay.style.height = '100%';
        this.imageDisplay.style.objectFit = 'cover';
        this.imageDisplay.style.display = 'none';
        this.video.parentNode.insertBefore(this.imageDisplay, this.video);
        
        this.stream = null;
        this.isActive = false;
        this.lastCapturedImage = null;
    }

    async startCamera() {
        if (this.isActive) {
            this.stopCamera();
            return false;
        }

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640,
                    height: 480 
                } 
            });
            this.video.srcObject = this.stream;
            this.isActive = true;
            this.video.style.display = 'block';
            this.imageDisplay.style.display = 'none';
            return true;
        } catch (err) {
            console.error('Error accessing camera:', err);
            throw err;
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
            this.isActive = false;
            
            // Show last captured image if available
            if (this.lastCapturedImage) {
                this.displayImage(this.lastCapturedImage);
            }
            return true;
        }
        return false;
    }

    captureFrame() {
        let canvas;
        if (this.isActive) {
            // Capture from camera
            canvas = document.createElement('canvas');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.video, 0, 0);
        } else if (this.lastCapturedImage) {
            // Use last captured image
            canvas = document.createElement('canvas');
            canvas.width = this.lastCapturedImage.width;
            canvas.height = this.lastCapturedImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.lastCapturedImage, 0, 0);
        } else {
            console.warn('No image available');
            return null;
        }

        // Store as last captured image
        this.lastCapturedImage = canvas;
        this.displayImage(canvas);
        return canvas;
    }

    displayImage(canvas) {
        this.video.style.display = 'none';
        this.imageDisplay.style.display = 'block';
        this.imageDisplay.src = canvas.toDataURL('image/png');
    }

    async handleFileUpload(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    this.lastCapturedImage = canvas;
                    this.displayImage(canvas);
                    resolve(canvas);
                };
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }

    isRunning() {
        return this.isActive;
    }

    hasImage() {
        return this.lastCapturedImage !== null;
    }
}
