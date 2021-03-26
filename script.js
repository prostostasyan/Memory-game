Array.prototype.shuffle = function () {
    let i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

let numberCells;
let NG = false;
let idData = null;
let row = null;
let col = null;
let record = null;
let moveCount = 0;

let table = () => {
    let countArr = 0;
    let amountPic = 33;
    let lengthArr = (numberCells) / 2;
    let arrMatrix0 = Array(amountPic).fill(0).map(e => countArr++).shuffle().slice(0, lengthArr);
    let arrMatrix = arrMatrix0.concat(arrMatrix0).shuffle();
    console.log(arrMatrix)
    arrMatrix = arrMatrix.shuffle();
    let newMatrix = [];
    let count = 0;
    for (let i = 0, idRow = 0; i < Math.sqrt(numberCells); i++) {
        let tr = document.createElement('tr');
        newMatrix.push([]);
        for (let j = 0; j < Math.sqrt(numberCells); j++) {
            newMatrix[i][j] = arrMatrix[count];
            let td = document.createElement('td');
            let div = document.createElement('div');
            div.setAttribute('data-row', i);
            div.setAttribute('data-col', j);
            div.setAttribute('data-id', newMatrix[i][j]);
            let layer = document.createElement('div');
            layer.classList.add('layer');
            div.innerHTML = '';
            div.style.backgroundImage = `url('img/ico/${arrMatrix[count++]}.png')`;
            div.classList.add(`cell`);
            div.append(layer);
            td.append(div);
            tr.append(td);
        }
        idRow++;
        field.append(tr);
    }
    return newMatrix;
}

let testOnWin = () => {
    let tryElments = document.querySelectorAll('.hidden');
    if (tryElments.length === numberCells) {
        setTimeout(() => {
            alert(`You won. Your moves: ${moveCount}`);
            let result = moveCount;
            if (record === null || result < record) {
                record = moveCount;
                records.innerHTML = `Ваш рекорд составляет: ${record}`;
                alert(`Поздравляем!!! Ваш рекорд составляет: ${record}`)
            }
            let newField = confirm("Создать новое поле?");
            if (newField) {
                window.location.reload();
            } else {
                moveCount = 0;
                field.innerHTML = '';
                table();
            }
        }, 300);
    }
}

choice.addEventListener('click', function (event) {
    let selected = difficult.querySelector('input[ type="radio"]:checked').value;
    console.log(selected);
    if (selected == 'easy') {
        field.innerHTML = '';
        idData = null;
        row = null;
        col = null;
        idData = null;
        NG = true;
        numberCells = 16;
        table();
        container.scrollTop = container.scrollHeight;
        choice.value = 'Начать заново';
    } else {
        field.innerHTML = '';
        idData === null;
        row = null;
        col = null;
        idData = null;
        NG = true;
        numberCells = 36;
        table();
        choice.value = 'Начать заново';
        setTimeout(() => {
            window.scrollTo(0, window.outerHeight);
        }, 10);
    }
})

field.addEventListener('click', function (event) {
    if (event.target.className === 'layer') {
        if (idData === null) {
            event.target.parentNode.classList.add('yellow');
            idData = event.target.parentNode.getAttribute('data-id');
            row = event.target.parentNode.getAttribute('data-row');
            col = event.target.parentNode.getAttribute('data-col');
            event.target.classList.toggle('hidden');
        } else if (idData === event.target.parentNode.getAttribute('data-id')) {
            const prevCell = field.querySelector(`[data-row="${+row}"][data-col="${+col}"]`);
            prevCell.classList.toggle('yellow');
            idData = null;
            event.target.classList.toggle('hidden');
        } else {
            const prevCell = field.querySelector(`[data-row="${+row}"][data-col="${+col}"]`);
            event.target.parentNode.classList.add('yellow');
            prevCell.classList.toggle('yellow');
            prevCell.querySelector('.hidden').classList.toggle('hidden');
            event.target.classList.toggle('hidden');
            game.classList.toggle('busy');
            setTimeout(() => {
                event.target.parentNode.classList.toggle('yellow');
                event.target.classList.toggle('hidden');
                game.classList.toggle('busy');
            }, 400);
            row = null;
            col = null;
            idData = null;
        }
        moveCount++;
        testOnWin();
    }
})
