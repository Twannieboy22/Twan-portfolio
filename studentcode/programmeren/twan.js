let canvas;
let gridSize = 20;
let snakeSize = 1;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function setup() {
    canvas = createCanvas(750, 750);
    canvas.position(windowWidth / 2 - width / 2, 50);

    frameRate(10); // Adjust the frame rate as needed
}

function draw() {
    background(220);
    drawSnake();
    drawFood();
    move();
    checkCollision();
}

function drawSnake() {
    fill(0, 0, 255); // Blue color for snake
    snake.forEach(segment => {
        rect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw snake eyes
    const head = snake[0];
    const eyeSize = gridSize / 5;

    fill(255); // White color for eyes
    switch (direction) {
        case "up":
            rect(head.x * gridSize + eyeSize, head.y * gridSize, eyeSize, eyeSize);
            rect(head.x * gridSize + 3 * eyeSize, head.y * gridSize, eyeSize, eyeSize);
            break;
        case "down":
            rect(head.x * gridSize + eyeSize, head.y * gridSize + 4 * eyeSize, eyeSize, eyeSize);
            rect(head.x * gridSize + 3 * eyeSize, head.y * gridSize + 4 * eyeSize, eyeSize, eyeSize);
            break;
        case "left":
            rect(head.x * gridSize, head.y * gridSize + eyeSize, eyeSize, eyeSize);
            rect(head.x * gridSize, head.y * gridSize + 3 * eyeSize, eyeSize, eyeSize);
            break;
        case "right":
            rect(head.x * gridSize + 4 * eyeSize, head.y * gridSize + eyeSize, eyeSize, eyeSize);
            rect(head.x * gridSize + 4 * eyeSize, head.y * gridSize + 3 * eyeSize, eyeSize, eyeSize);
            break;
    }
}

function drawFood() {
    fill(255, 0, 0); // Red color for food
    rect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: floor(random(width / gridSize)),
        y: floor(random(height / gridSize))
    };

    // Ensure food doesn't appear on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

function checkCollision() {
    const head = snake[0];

    // Check if snake hits the walls
    if (head.x < 0 || head.x >= width / gridSize || head.y < 0 || head.y >= height / gridSize) {
        resetGame();
    }

    // Check if snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    alert("Game Over!");
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    generateFood();
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            if (direction !== "down") direction = "up";
            break;
        case DOWN_ARROW:
            if (direction !== "up") direction = "down";
            break;
        case LEFT_ARROW:
            if (direction !== "right") direction = "left";
            break;
        case RIGHT_ARROW:
            if (direction !== "left") direction = "right";
            break;
    }
}
