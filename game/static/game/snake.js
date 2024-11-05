// Определение размеров игрового поля
var boardWidth = 400;           // Ширина игрового поля в пикселях
var boardHeight = 400;          // Высота игрового поля в пикселях

//переменная для хранения очков
let score =0; 

// Класс для сегмента (части змейки или яблока)
class Segm {
    constructor(left, top, itsclass) {  // Конструктор класса принимает координаты и класс для элемента
        this.__size = 20; // Размер сегмента в пикселях
        this.x = Math.round(left / this.__size); // Вычисляем координату x сегмента в "сегментах"
        this.y = Math.round(top / this.__size); // Вычисляем координату y сегмента в "сегментах"
        this.left = this.x * this.__size; // Вычисляем левую границу сегмента в пикселях
        this.top = this.y * this.__size; // Вычисляем верхнюю границу сегмента в пикселях
        this.showme = document.createElement('input'); // Создаем HTML элемент типа кнопки
        this.showme.setAttribute('type', 'button'); // Устанавливаем тип элемента как "button"
        this.showme.setAttribute('class', itsclass); // Устанавливаем класс для стилизации
        this.showme.style.width = this.__size + 'px'; // Устанавливаем ширину кнопки
        this.showme.style.height = this.__size + 'px'; // Устанавливаем высоту кнопки
    }

    setAttribute(n, v) { // Метод для установки атрибутов элемента
        this.showme.setAttribute(n, v); // Устанавливаем атрибут n со значением v
    }

    move(right, up) { // Метод для перемещения сегмента
        if (this.__size * right > boardWidth) { // Проверка, если сегмент выходит за правую границу
            console.log('Я застряла справа!'); // Логируем сообщение
            location.reload();
        } else if (this.__size * right < 0) { // Проверка, если сегмент выходит за левую границу
            console.log('Я застряла слева!'); // Логируем сообщение
            location.reload();
        } else if (this.__size * up < 0) { // Проверка, если сегмент выходит за верхнюю границу
            console.log('Я застряла сверху!'); // Логируем сообщение
            location.reload();
        } else if (this.__size * up > boardHeight) { // Проверка, если сегмент выходит за нижнюю границу
            console.log('Я застряла снизу!'); // Логируем сообщение
            location.reload();
        } else { // Если сегмент находится в пределах поля
            this.x = right; // Обновляем координату x
            this.y = up; // Обновляем координату y
            this.left = this.__size * this.x; // Пересчитываем левую границу
            this.top  = this.__size * this.y; // Пересчитываем верхнюю границу
            this.showme.style.left = this.left + 'px'; // Устанавливаем позицию элемента по оси X
            this.showme.style.top  = this.top + 'px'; // Устанавливаем позицию элемента по оси Y
        }
    }

    render() { // Метод для отображения сегмента
        this.showme.style.left = this.left + 'px'; // Устанавливаем позицию по оси X
        this.showme.style.top = this.top + 'px'; // Устанавливаем позицию по оси Y
        return this.showme; // Возвращаем элемент для добавления в DOM
    }
}

// Класс Змейка, который наследует от массива
class Snake extends Array {
    constructor() { // Конструктор класса
        super(...arguments);  // Распаковка аргументов для конструктора родительского класса (Array)
        this.__dy = 1; // Направление движения по оси Y (1 - вниз)
        this.__dx = 0; // Направление движения по оси X (0 - нет движения)
    }

    render(gameBoard) { // Метод для отображения змейки на игровом поле
        for (let i = 0; i < this.length; i++) { // Перебираем все сегменты змейки
            gameBoard.appendChild(this[i].render()); // Добавляем каждый сегмент на игровое поле
        }
    }

    eat(apple) { // Метод для проверки, съела ли змейка яблоко
        let sela = (apple.left == this[0].left) && (apple.top == this[0].top); // Проверяем совпадение координат головы змейки с яблоком
        if (sela) { // Если совпадение произошло
            // Перемещаем яблоко на новую координату
            apple.move(Math.floor(Math.random() * (boardWidth / 20)), // Новая координата X
                        Math.floor(Math.random() * (boardHeight / 20))); // Новая координата Y
            console.log('Съела!'); // Логируем сообщение о том, что яблоко съедено
            this.grow(); // Увеличиваем длину змейки
            score++; // увеличение очков на 1 еденицу
        } else {}
        return sela; // Возвращаем результат проверки
    }

    move() { // Метод для перемещения змейки
        if (this.length) { // Проверяем, есть ли сегменты в змейке
            for (let i = this.length - 1; i > 0; i--) {  // Перебираем змейку с хвоста
                this[i].move(this[i-1].x, this[i-1].y); // Перемещаем каждый сегмент на позицию предыдущего
            }
            this[0].move(this[0].x + this.__dx, this[0].y + this.__dy); // Перемещаем голову змейки
        }
    }

    grow() { // Метод для увеличения длины змейки
        // Увеличиваем змейку, добавляя новый сегмент в конец
        let lastSegment = this[this.length - 1]; // Получаем последний сегмент
        this.push(new Segm(lastSegment.left, lastSegment.top, 'segm')); // Добавляем новый сегмент на позицию последнего сегмента
    }
}

// Класс Яблоко, который наследует свойства класса Сегмент
class Apple extends Segm {
    // Яблоко будет иметь все свойства и методы класса Сегмент
}

// Функция для добавления объектов на игровое поле
function addobjects() {
    gameBoard.style.width = boardWidth + 'px'; // Устанавливаем ширину игрового поля
    gameBoard.style.height = boardHeight + 'px'; // Устанавливаем высоту игрового поля

    let snake = new Snake(); // Создаем новую змейку

    document.addEventListener('keydown', function(event) { // Добавляем обработчик события нажатия клавиш
        var key = event.key || event.key; // Получаем нажатую клавишу
        if (key === 'ArrowRight' || key === '39') { // Если нажата клавиша "вправо"
            if (snake.__dy != 0) { // Проверяем, что змейка не движется вертикально
                snake.__dx = 1; snake.__dy = 0; // Устанавливаем направление движения вправо
            }
        } else if (key === 'ArrowUp' || key === '38') { // Если нажата клавиша "вверх"
            if (snake.__dx != 0) { // Проверяем, что змейка не движется горизонтально
                snake.__dx = 0; snake.__dy = -1; // Устанавливаем направление движения вверх
            } 
        } else if (key === 'ArrowLeft' || key === '37') { // Если нажата клавиша "влево"
            if (snake.__dy != 0) { // Проверяем, что змейка не движется вертикально
                snake.__dx = -1; snake.__dy = 0; // Устанавливаем направление движения влево
            } 
        } else if (key === 'ArrowDown' || key === '40') { // Если нажата клавиша "вниз"
            if (snake.__dx != 0) { // Проверяем, что змейка не движется горизонтально
                snake.__dx = 0; snake.__dy = 1; // Устанавливаем направление движения вниз
            }
        }
    });

    // Инициализируем начальные сегменты змейки
    for (let i = 0; i < 4; i++) { // Создаем 4 сегмента для начальной змейки
        let ss = new Segm(
            (boardWidth - 20) / 2, // Устанавливаем начальную позицию по X
            (boardHeight - 20) / 2 - (i * 20), // Устанавливаем начальную позицию по Y
            'segm' // Устанавливаем класс для сегмента
        );
       // ss.setAttribute('value', i); // Устанавливаем значение атрибута
        snake.push(ss); // Добавляем сегмент в змейку
    }

    // Создаем яблоко с координатами, кратными размеру сегмента
    let apple = new Apple(
        Math.floor(Math.random() * (boardWidth / 20)) * 20, // Случайная координата X
        Math.floor(Math.random() * (boardHeight / 20)) * 20, // Случайная координата Y
        'apple' // Устанавливаем класс для яблока
    );

    snake.render(gameBoard); // Отображаем змейку на игровом поле
    gameBoard.appendChild(apple.render()); // Рендерим яблоко и добавляем его на игровое поле

    setInterval(() => { // Устанавливаем интервал для обновления игры
        snake.move();           // Вызываем метод перемещения змейки
        snake.eat(apple);      // Проверяем, съела ли змея яблоко
        gameBoard.innerHTML = ''; // Очищаем игровое поле перед рендерингом
        snake.render(gameBoard); // Рендерим змейку снова
        gameBoard.appendChild(apple.render()); // Рендерим яблоко снова
        document.getElementById('score').innerHTML = 'Очки: ' + score
    }, 250); // Интервал обновления 250 миллисекунд
}

// Запуск программы при загрузке страницы
window.addEventListener('load', addobjects);








