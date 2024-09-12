//размеры поля
var boardWidth = 1280;
var boardHeight = 800;

class Segm{
    constructor(left, top){
        this.left=Math.round(left);
        this.top=Math.round(top);
        //скорость змейки
        this.speed=125;
        this.showme = document.createElement('div');
    }
    move(right, up) {  // на сколько сдвинуться вправо и вверх 5, 8; -100, -70
        this.left += right;
        this.top -= up;
        this.showme.style.left=this.left + 'px';
        this.showme.style.top=this.top + 'px';
    }
    render(){
        console.log(this.left, this.top);
        
        this.showme.setAttribute('class', 'segm');
        this.showme.style.left=this.left + 'px';
        this.showme.style.top=this.top + 'px';
        //console.log(this.showme.style);
        return this.showme;
    }
}

class Snake extends Array {
    render(gameBoard) {
        for (let i = 0; i < this.length; i++) {
            gameBoard.appendChild(this[i].render());
        }
    }
    move(right, up) {
        console.log('Snake moved');
        for (let i = 0; i < this.length; i++) {
            this[i].move(right, up);
        }
    }
}

/* Заставить змейку двигаться
1. По кнопке
2. По таймеру, но "нормально"
3. По таймеру, а по кнопке "изгибатся" и ползти в нужном направлении */

class Apple{
    constructor(left, top){
        this.left=Math.round(left);
        this.top=Math.round(top);
    }
    render(){
        let result = document.createElement('div');
        result.setAttribute('class', 'apple');
        result.style.left=this.left + 'px';
        result.style.top=this.top + 'px';
        return result;
    }
}

function addobjects() {
    let snake = new Snake;
    
    for (let i = 0; i < 4; i++) { 
        snake.push(new Segm(
            (boardWidth - 20) / 2, 
            (boardHeight - 20) / 2 - (i * 20) 
        ));
    }

    let apple = new Apple(
        Math.random() * (boardWidth - 20), 
        Math.random() * (boardHeight - 20)
    );

    snake.render(gameBoard);
    setInterval(() => {
        snake.move(10, -20);
    }, 1000);

    // Рендерим яблоко
    gameBoard.appendChild(
        apple.render()
    );
}


function changeDirection(keyCode) {
    if (keyCode === 37 && direction !== "right") {
      direction = "left";
    } else if (keyCode === 38 && direction !== "down") {
      direction = "up";
    } else if (keyCode === 39 && direction !== "left") {
      direction = "right";
    } else if (keyCode === 40 && direction !== "up") {
      direction = "down";
    }
  }

  document.addEventListener(
    "keyup",
    (event) => {
      //const keyName = event.key;
  
      // As the user releases the Ctrl key, the key is no longer active,
      // so event.ctrlKey is false.
      //if (keyName === "Control") {
        console.log("Control key was released ", event.key);
      //}
    },
    false,
  );

  

/* Именно отсюда начинается вся программа */
window.addEventListener(
    'load',
    addobjects  // Это функция. Она будет вызвана при загрузке страницы
);