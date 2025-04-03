const shapes = document.querySelectorAll('.shape');
let draggedElement = null;
let offsetX = 0, offsetY = 0;

shapes.forEach(shape => {
    shape.style.left = '20px'; // Start positions on the left side
    shape.style.top = `${Math.random() * (window.innerHeight - 200)}px`; // Random Y position within viewport

    // Mouse Events
    shape.addEventListener('mousedown', (e) => {
        startDrag(e.target, e.offsetX, e.offsetY);
    });

    // Touch Events
    shape.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        startDrag(e.target, touch.clientX - rect.left, touch.clientY - rect.top);
    });
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        dragElement(e.pageX, e.pageY);
    }
});

document.addEventListener('touchmove', (e) => {
    if (draggedElement) {
        const touch = e.touches[0];
        dragElement(touch.pageX, touch.pageY);
    }
});

document.addEventListener('mouseup', () => {
    endDrag();
});

document.addEventListener('touchend', () => {
    endDrag();
});

function startDrag(element, x, y) {
    draggedElement = element;
    offsetX = x;
    offsetY = y;
    draggedElement.style.cursor = 'grabbing';
    draggedElement.style.zIndex = parseInt(getComputedStyle(draggedElement).zIndex || 0) + 1;
}

function dragElement(x, y) {
    if (draggedElement) {
        draggedElement.style.left = `${x - offsetX}px`;
        draggedElement.style.top = `${y - offsetY}px`;
    }
}

function endDrag() {
    if (draggedElement) {
        draggedElement.style.cursor = 'grab';
        draggedElement = null;
    }
}
