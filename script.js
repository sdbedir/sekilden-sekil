const shapes = document.querySelectorAll('.shape');
let draggedElement = null;
let offsetX = 0, offsetY = 0;

// Başlangıç konumlarını rastgele belirle
shapes.forEach(shape => {
    shape.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
    shape.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

    // Mouse ile sürükleme
    shape.addEventListener('mousedown', (e) => {
        startDrag(e.target, e.clientX, e.clientY);
    });

    // Dokunmatik ekranlar için sürükleme
    shape.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        startDrag(e.target, touch.clientX, touch.clientY, rect);
    }, { passive: false });
});

// Fare hareketlerini yakala
document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        dragElement(e.clientX, e.clientY);
    }
});

// Dokunmatik hareketleri yakala
document.addEventListener('touchmove', (e) => {
    if (draggedElement) {
        e.preventDefault();
        const touch = e.touches[0];
        dragElement(touch.clientX, touch.clientY);
    }
}, { passive: false });

// Sürüklemeyi bırakınca
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(element, x, y, rect = null) {
    draggedElement = element;
    const bounding = rect || element.getBoundingClientRect();
    offsetX = x - bounding.left;
    offsetY = y - bounding.top;
    draggedElement.style.cursor = 'grabbing';
    draggedElement.style.zIndex = '1000';
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
