const keys = [
    [
        ["º", "ª"],
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
    ],
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["{", "}"],
        ["ç", "Ç"],
    ],
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
    ],
    [
        ["SPACE", "SPACE"]
    ]
];


let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

function renderKeyboard(){
    const keyboardContenido = document.querySelector("#teclado-contenido");
    let empty = `<div class="ley-empty"></div>`;

    const layers = keys.map((layer) =>{
        return layer.map(key => {
            if(key[0] === 'SHIFT'){
                return `<button class="key key-shift">${key[0]}</button>`;
            }
            if(key[0] === 'MAYUS'){
                return `<button class="key key-mayus">${key[0]}</button>`;
            }
            if(key[0] === 'SPACE'){
                return `<button class="key key-space"></button>`;
            }

            return `
            <button class="key key-normal">${
                shift 
                ? key[1] 
                : mayus && 
                key[0].toLowerCase().charCodeAt(0) >= 97 &&
                key[0].toLowerCase().charCodeAt(0) <= 122
                ? key[1]
                : key[0]
            }
            </button>
            `;
        });
    })

    layers[0].push(empty);
    layers[1].unshift(empty);

    const htmlLayer = layers.map(layer =>{
        return layer.join("")
    });

    keyboardContenido.innerHTML = "";

    htmlLayer.forEach(element => {
        keyboardContenido.innerHTML += `<div class="layer">${element}</div>`;
    });

    document.querySelectorAll(".key").forEach(key =>{
        key.addEventListener("click", e =>{
            if(current){
                if(key.textContent == 'SHIFT'){
                    shift = !shift;
                }else if(key.textContent == 'MAYUS'){
                    mayus = !mayus;
                }else if(key.textContent == ''){
                    current.value += " ";
                }else{
                    current.value += key.textContent.trim();
                    if(shift){
                        shift = false;
                        
                    }
                }
            }
            renderKeyboard();
            current.focus();
        })
    })
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focusin", e =>{
        current = e.target;
    })
})