export const renderArea = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    if (context) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
    
    setTimeout(() => {
        requestAnimationFrame(() => {
            renderArea(canvas);
        });
    }, 100);
};