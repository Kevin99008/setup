const fs = require('fs');

class TreeNode {
    constructor(name,capacity, parent) {
        this.name = name;
        this.capacity =capacity;
        this.parent = parent;
        this.children = [];
    }
    addChild(childNode) {
        this.children.push(childNode);
    }
}

class Tree {
    constructor() {
        this.root = null;
        this.countNode = 0;
    }

    constructTree(treeStr,holeCapacity) {
        if (!treeStr) return "Invalid input";

        const nodes = {};
        let temp = this.root;
        for (let i = 0; i < treeStr.length; i++) {
            const char = treeStr[i];
            if (i === 0 && char.match(/[A-Za-z]/)) {
                this.root = new TreeNode(char, 0, null);
                temp = this.root;
            }
            else if(i === 0 && !char.match(/[A-Za-z]/)){
                return null
            }
            else if (char.match(/[A-Za-z]/)){
                this.countNode += 1;
                const node = new TreeNode(char, holeCapacity, temp);
                if(this.root == null){
                    return null
                }
                temp.addChild(node);
                temp = node;
            }
            else if (char == ')') {
                if(temp.parent === null){
                    return null
                }
                temp = temp.parent;
            }
        }

        return this.root;
    }

    dfs(node, callback, depth, depthList) {
        depthList.push({ node: node.name, depth: depth });
    
        const foundNode = callback(node);
        if (foundNode) {
            return true;
        }
    
        for (const child of node.children) {
            if (this.dfs(child, callback, depth + 1, depthList)) {
                return true;
            }
        }
    
        return false;
    }
    
    closestHoles(numWalnuts, holeCapacity) {
        if ((this.countNode * holeCapacity) < numWalnuts) {
            console.log("INVALID HOLE CAPACITY");
            return;
        }
    
        let currentWalnut = 1;
        while (currentWalnut <= numWalnuts) {
            const nodeAndPath = this.findClosestNodeWithCapacityAndPath(this.root);
            const closestNode = nodeAndPath.node;
            const path = nodeAndPath.path;
    
            if (!closestNode) {
                console.log("No node found with capacity >= 1");
                return;
            }
    
            const output = `${currentWalnut}${path.join('')} `;
            process.stdout.write(output);
    
            // ลด capacity ของโหนดที่ใกล้ที่สุดลงทีละหนึ่ง
            closestNode.capacity -= 1;
            currentWalnut++;
        }
        console.log("");
    }
    
    findClosestNodeWithCapacityAndPath(node, path = []) {
        if (!node) {
            return { node: null, path: [] };
        }
    
        // เพิ่มโหนดปัจจุบันลงในเส้นทาง
        path.push(node.name);
    
        // ถ้าโหนดปัจจุบันมี capacity >= 1 ให้คืนค่าโหนดนี้พร้อมกับเส้นทาง
        if (node.capacity >= 1) {
            return { node: node, path: path };
        }
    
        // ถ้าโหนดปัจจุบันไม่มี capacity >= 1 ให้ค้นหาในโหนดลูก
        let closestNodeAndPath = { node: null, path: [] };
        for (const child of node.children) {
            const result = this.findClosestNodeWithCapacityAndPath(child, [...path]);
            if (result.node && (!closestNodeAndPath.node || result.path.length < closestNodeAndPath.path.length)) {
                closestNodeAndPath = result;
            }
        }
    
        return closestNodeAndPath;
    }
    
    
    
    

}


function processInput(inputStr) {
    try {
        const [numWalnuts, holeCapacity, treeStr] = inputStr.trim().split(',');
        return [parseInt(numWalnuts), parseInt(holeCapacity), treeStr];
    } catch (error) {
        return [null, null, null];
    }
}

function main(inputStr) {
    const [numWalnuts, holeCapacity, treeStr] = processInput(inputStr);

    if (numWalnuts === null || holeCapacity === null || treeStr === null) {
        console.log("Invalid input format");
        return ;
    }
    
    if (isNaN(numWalnuts) || isNaN(holeCapacity)) {
        console.log("numWalnuts and holeCapacity must be integers");
        return ;
    }
    

    const tree = new Tree();
    const temp = tree.constructTree(treeStr,holeCapacity);

    if (temp === null) {
        console.log("IMPOSSIBLE TREE");
        return ;
    }
    else {
        tree.closestHoles(numWalnuts,holeCapacity);
    }



}


fs.readFile('inputQuestion2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // เรียกใช้ main function เมื่อได้ข้อมูลจากไฟล์
    main(data);
});