const nodeTextInput = document.getElementById('node-text-input');
const addNodeBtn = document.getElementById('add-node-btn');
const mindmapArea = document.getElementById('mindmap-area');

let nodes = JSON.parse(localStorage.getItem('mindMapNodes')) || [];

function renderNodes() {
    mindmapArea.innerHTML = '';
    nodes.forEach(nodeData => {
        createNodeElement(nodeData);
    });
}

function createNodeElement(nodeData) {
    const node = document.createElement('div');
    node.classList.add('node');
    node.textContent = nodeData.text;
    node.style.left = `${nodeData.x}px`;
    node.style.top = `${nodeData.y}px`;
    node.dataset.id = nodeData.id;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent drag from triggering
        deleteNode(nodeData.id);
    });
    node.appendChild(deleteBtn);

    mindmapArea.appendChild(node);

    // Make node draggable
    let isDragging = false;
    let offsetX, offsetY;

    node.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - node.getBoundingClientRect().left;
        offsetY = e.clientY - node.getBoundingClientRect().top;
        node.style.cursor = 'grabbing';
    });

    mindmapArea.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - offsetX - mindmapArea.getBoundingClientRect().left;
        let newY = e.clientY - offsetY - mindmapArea.getBoundingClientRect().top;

        // Boundary checks
        newX = Math.max(0, Math.min(newX, mindmapArea.offsetWidth - node.offsetWidth));
        newY = Math.max(0, Math.min(newY, mindmapArea.offsetHeight - node.offsetHeight));

        node.style.left = `${newX}px`;
        node.style.top = `${newY}px`;

        // Update node data
        const index = nodes.findIndex(n => n.id === nodeData.id);
        if (index !== -1) {
            nodes[index].x = newX;
            nodes[index].y = newY;
        }
    });

    mindmapArea.addEventListener('mouseup', () => {
        isDragging = false;
        node.style.cursor = 'grab';
        saveNodes();
    });
}

function addNode() {
    const text = nodeTextInput.value.trim();
    if (!text) return;

    const newNode = {
        id: Date.now(), // Simple unique ID
        text: text,
        x: 50, // Default position
        y: 50
    };
    nodes.push(newNode);
    saveNodes();
    renderNodes();
    nodeTextInput.value = '';
}

function deleteNode(id) {
    nodes = nodes.filter(node => node.id !== id);
    saveNodes();
    renderNodes();
}

function saveNodes() {
    localStorage.setItem('mindMapNodes', JSON.stringify(nodes));
}

addNodeBtn.addEventListener('click', addNode);

// Initial render
renderNodes();