const gameContainer = document.getElementById("game-container");
let size = 3;
let box = size ** 2;
let displayBox = box;
let shuffling = false;
let arr = [];
console.log(box,displayBox,arr);


// let winPopUp = document.getElementById("winPop")
// let closePopUp = document.querySelector(".close");
// let ok = document.getElementById("ok")


puzzle();
// console.log(size);

console.log(arr)
function puzzle() {
    createBox(size)
    setTimeout(() => {
        shuffle();
    }, 200)
}

// Create boxex with dom
function createBox(n) {
    for (let i = 1; i <= box; i++) {
        let newBox = document.createElement('div');
        newBox.id = `box${i}`;
        newBox.setAttribute('index', i);
        newBox.innerHTML = i;
        arr.push(i)

        newBox.classList.add('box');
        newBox.addEventListener('click', function () {
            swap(Number(this.getAttribute('index')));
        });
        gameContainer.append(newBox);

    }
    boxId = 'box' + displayBox;
    selectBox = document.getElementById(boxId);
    selectBox.classList.add('currentBox');

}

// Shuffle the number randomly
function shuffle() {
    let min = 100;
    let max = min + Math.floor(Math.random() * 200);
    console.log(max);

    for (let i = min; i <= max; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            // console.log(x)
            let pos = 0;

            if (x == 0) {
                pos = displayBox + 1;

            }
            else if (x == 1) {
                pos = displayBox - 1;
            }
            else if (x == 2) {
                pos = displayBox + size;
            }
            else if (x == 3) {
                pos = displayBox - size;
            }

            swap(pos);
            if (i >= max - 1) {
                shuffling = true;
            }


        }, i*10)
    }
}

// Swaping boxex on click add add remove class
function swap(clicked) {
    if (clicked < 1 || clicked > (box)) {
        return;
    }
    //check for right
    if (clicked == displayBox + 1) {
        if (clicked % size != 1) {
            setcurrentBox(clicked);
        }
    }
    //check for left
    else if (clicked == displayBox - 1) {
        if (clicked % size != 0) {
            setcurrentBox(clicked);
        }
    }
    //check for up
    else if (clicked == displayBox + size) {
        setcurrentBox(clicked);
    }
    //check for down
    else if (clicked == displayBox - size) {
        setcurrentBox(clicked);
    }

    // For winning message 
    // if (shuffling) {
    //     if (won()) {
    //         winPopUp.animate({
    //             'display': 'block',
                
    //         }, 500)
    //         if (winPopUp.style.display = "block") {
    //             closePopUp.addEventListener('click', function () {
    //                 winPopUp.style.display = "none"
    //             })
    //         }
    //         ok.addEventListener('click', function () {
    //             return shuffle()
    //         })

    //     }
    //     else {
    //         winPopUp.style.display = "none"
    //     }

        
    // }

}


// comparision between the box index and id's
function won(){
    for(let i = 1; i <= box; i++){
        currentBox = document.getElementById(`box${i}`);
        currentBoxIndex = currentBox.getAttribute('index');
        currentBoxValue = currentBox.innerHTML;
        if (Number(currentBoxIndex) != Number(currentBoxValue)) {
            return false;
        }
    }
    return true;
}

function setcurrentBox(index) {
    currentBox=document.getElementById(`box${displayBox}`);
    currentBoxText=currentBox.innerHTML;
    currentBox.classList.remove('currentBox');
    newBox=document.getElementById(`box${index}`);
    currentBox.innerHTML=newBox.innerHTML;
    newBox.innerHTML=currentBoxText;
    newBox.classList.add('currentBox');
    displayBox = index;
}