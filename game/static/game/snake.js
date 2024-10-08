//размеры поля
var boardWidth = 1280;
var boardHeight = 800;

class Segm{
    constructor(left, top, itsclass){
        this.__size = 20; //px
        this.x = Math.round(left / this.__size);
        this.y = Math.round(top / this.__size);
        this.left = this.x * this.__size;
        this.top = this.y * this.__size;
        this.showme = document.createElement('input');
        this.showme.setAttribute('type', 'button');
        this.showme.setAttribute('class', itsclass);
        this.showme.style.width = this.__size + 'px';
        this.showme.style.height = this.__size + 'px';
    }
    setAttribute(n, v) {
        this.showme.setAttribute(n, v);
    }
    move(right, up) {  // перемещение в ФИКСИРОВАННУЮ  точку в условных координатах!
        this.x = right;
        this.y = up;
        this.left = this.__size * this.x;
        this.top  = this.__size * this.y;
        this.showme.style.left = this.left + 'px';
        this.showme.style.top  = this.top + 'px';
    }
    render(){
        this.showme.style.left=this.left + 'px';
        this.showme.style.top=this.top + 'px';
        return this.showme;
    }
}

class Snake extends Array {
    constructor() {
        super(...arguments)  // распаковка аргументов по позициям
        this.__dy = 0; // +1 move down each step -1 move up
        this.__dx = 1; // +1 move right; -1 move left
    }
    render(gameBoard) {
        for (let i = 0; i < this.length; i++) {
            console.log(this[i].constructor);
            gameBoard.appendChild(this[i].render());
        }
    }
    move() {
        if (this.length) {
            console.log('Я ползу!');
            for (let i = this.length - 1; i > 0; i--) {  // Перебираем змейку с хвоста
              
                this[i].move(this[i-1].x, this[i-1].y);
            }
            console.log(0, this[0].x, this[0].y);
            this[0].move(this[0].x + this.__dx, this[0].y + this.__dy);
            console.log(0, this[0].x, this[0].y)
        } else {
            console.log('Меня нет!');
        }
    }
}

class Apple extends Segm{
}

function addobjects() {
    let snake = new Snake;
    
    document.addEventListener('keydown', function(event) {
        var key = event.key || event.key;
        if(key === 'ArrowRight' || key === '39') {
            snake.__dx = 1; snake.__dy = 0; // Двигаемся вправо
        } else if(key === 'ArrowUp' || key === '38') {
            snake.__dx = 0; snake.__dy = -1; // Двигаемся вверх
        } else if(key === 'ArrowLeft' || key === '37') {
            snake.__dx = -1; snake.__dy = 0; // Двигаемся влево
        } else if(key === 'ArrowDown' || key === '40') {
            snake.__dx = 0; snake.__dy = 1; // Двигаемся вниз
        }
    });
    
    for (let i = 0; i < 4; i++) { 
        let ss = new Segm(
            (boardWidth - 20) / 2, 
            (boardHeight - 20) / 2 - (i * 20),
            'segm'
        );
        ss.setAttribute('value', i);
        snake.push(ss);
        
    }

    let apple = new Apple(
        Math.random() * (boardWidth - 20), 
        Math.random() * (boardHeight - 20),
        'apple'
    );

    snake.render(gameBoard);
    setInterval(() => {
        snake.move(); // Просто вызов метода перемещения
    }, 250);
    
    // Рендерим яблоко
    gameBoard.appendChild(
        apple.render()
    );
}

  document.addEventListener(
    "keyup",
    (event) => {
        console.log("Control key was released ", event.key);
    },
    false,
  );

/* Именно отсюда начинается вся программа */
window.addEventListener(
    'load',
    addobjects  // Это функция. Она будет вызвана при загрузке страницы
);