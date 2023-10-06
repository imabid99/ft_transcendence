// let x = "imad abid";

// console.log(String(x));

// if(x.includes("z"))
// {
//     console.log("hello")
// }


// let bb = document.getElementById('btn');

// console.log(bb);
// bb.onclick = function() {
//     document.body.style.backgroundColor = 'red';
//     btn.style.backgroundColor = 'blue';
//     btn.style.color = 'white'; 
// };

// bb.addEventListener('click', function(){
//     console.log("hello world");
//     document.body.style.backgroundColor = 'beige';

// })

let dollar = document.getElementById("dl");
let dirham = document.getElementById("md");

// console.log("hello");
// console.log(dollar.value);

dollar.onkeyup = function(){
    dirham.value = dollar.value / 0.097;
}

dirham.onkeyup = function(){
    dollar.value = dirham.value * 0.097;
}