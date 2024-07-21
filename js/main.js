const links = document.querySelector(".links");
const menu = document.querySelector(".menu");
const exit = document.querySelector(".links img");
menu.addEventListener("click",function(){
    links.classList.toggle("show");
})

exit.onclick = function(){
    links.classList.remove("show");
}

document.addEventListener("click",function(e){
    if(e.target != menu && e.target != links){
        links.classList.remove("show");
    }
})
const coords = {x:0,y:0};
const circles = document.querySelectorAll(".circle");
circles.forEach(circle =>{
    circle.x = 0;
    circle.y = 0;
})


window.addEventListener("mousemove",function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
})



function animateCircle(){
    let x = coords.x;
    let y = coords.y;
    circles.forEach(function(circle,index){
        circle.style.left = `${x-12}px`;
        circle.style.top = `${y-12}px`;

        circle.style.scale = (circles.length-index) / circles.length;
        circle.x = x;
        circle.y = y;
        const nextCircle = circles[index+1] || circles[0];
        x+= (nextCircle.x - x) * 0.3;
        y+= (nextCircle.y - y) * 0.3;
    })
    requestAnimationFrame(animateCircle)
}


animateCircle();

function changePlanet(dest){
    const lis = document.querySelectorAll(".information li");
    lis.forEach(li => {
        li.onclick = function(){
            lis.forEach(el => {
                el.classList.remove("selected");
            })
            li.classList.add("selected");
            for(let i = 0;i < dest.length;i++){
                if(li.textContent == dest[i].title){
                    const plImg = document.querySelector(".planetImg");
                    plImg.innerHTML = `<img src="${dest[i].background}">`;
                    const h3 = document.querySelector("h3");
                    h3.innerHTML = `${dest[i].title}`;
                    const p = document.querySelector(".information p");
                    p.innerHTML = `${dest[i].description}`;
                    const span = document.querySelectorAll(".time span");
                    span[0].innerHTML = `${dest[i].distance}`;
                    span[1].innerHTML = `${dest[i].time}`;
                }
            }
        }
    })
}

function changeCrew(crew){
    const lis = document.querySelectorAll(".info li");
    lis.forEach(li => {
        li.onclick = function(){
            lis.forEach(el => {
                el.classList.remove("select");
            })
            li.classList.add("select");
                const nbr = li.getAttribute("data-number");
                const crImg = document.querySelector(".imgCrew");
                crImg.innerHTML = `<img src="${crew[nbr].background}">`;
                const h3 = document.querySelector(".info h3");
                h3.innerHTML = `${crew[nbr].name}`;
                const h4 = document.querySelector(".info h4");
                h4.innerHTML = `${crew[nbr].title}`;
                const p = document.querySelector(".info p");
                p.innerHTML = `${crew[nbr].description}`;
        }
    })
}


function changeTech(tech){
    const lis = document.querySelectorAll(".infTech li");
    lis.forEach(li => {
        li.onclick = function(){
            lis.forEach(el => {
                el.classList.remove("enable");
            })
            li.classList.add("enable");
                const nbr = li.textContent;
                const tcImg = document.querySelector(".techImg");
                tcImg.innerHTML = ` <img src="${tech[nbr-1].background}" class="desk">
                                    <img src="${tech[nbr-1].background2}" class="tab">`;
                const h3 = document.querySelector(".infTech h3");
                h3.innerHTML = `${tech[nbr-1].title}`;
                const p = document.querySelector(".infTech p");
                p.innerHTML = `${tech[nbr-1].description}`;
        }
    })
}


fetch("js/data.json").then(response => response.json()).then(data =>{
    changePlanet(data.Destination);
    changeCrew(data.Crew);
    changeTech(data.Tech);
})