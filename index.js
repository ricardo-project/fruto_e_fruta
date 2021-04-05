/*CRIAR FUNDO DO TÍTULO DA PÁGINA*/
const pi = Math.PI
let k
let cnvBck = document.querySelector("canvas")
let ctxBck = cnvBck.getContext("2d")
let range = document.querySelectorAll("input[type=range]")
let corTitle = document.querySelector(".corTitle")
let corNum = corTitle.querySelectorAll("strong")
let Title = document.querySelector(".title")
let condTitle = false
newColor()
forEachNotArray(range, (elem, index) => {
    elem.oninput = function() {
        corNum[index].textContent = this.value
        newColor()
    }
}); function newColor() {
    const color = "rgb(" + range[0].value + "," + range[1].value + "," + range[2].value
    ctxBck.clearRect(0, 0, 300, 160)
    ctxBck.fillStyle = color + ")"
    ctxBck.beginPath()
    for(k = 0; k <= 300; k++) {
        ctxBck.lineTo(k, 60 + 15*Math.cos(2*pi*k/300))
    } ctxBck.lineTo(1920, 160)
    ctxBck.lineTo(0, 160)
    ctxBck.fill()
    Title.style.background = color + ",0.5) url(" + cnvBck.toDataURL("image/png", 1) + ")"
    Title.style.webkitBackgroundClip = "text"
    Title.style.color = "transparent"
}

/*FUNÇÕES DE CLIQUE PARA O ÍCONE DE MENU/FECHAR*/
let iconMenu = document.querySelector(".iconMenu")
let segmIcon = iconMenu.querySelectorAll(".iconMenu__segm")
let allDivsMR = document.querySelectorAll(".divsMenuRct__div")
let divsInMR = document.querySelectorAll(".menuRct")
let condMR = true
let functOpen = (indice) => {
    if(condMR) {
        divsInMR[indice].style.display = "block"
        divsInMR[1 - indice].style.display = "none"
        condMR = false
        iconMenu.style.background = "rgb(59,7,23)"
        segmIcon[0].style.top = "33px"
        segmIcon[2].style.top = "33px"
        allDivsMR[0].style.height = "100vh"
        setTimeout(() => {
            segmIcon[0].style.transform = "rotate(45deg)"
            segmIcon[1].style.transform = "rotate(45deg)"
            segmIcon[2].style.transform = "rotate(-45deg)"
            allDivsMR[1].style.height = "100vh"
            setTimeout(() => {
                allDivsMR[2].style.height = "100vh"
                setTimeout(() => {
                    allDivsMR[3].style.height = "100vh"
                    setTimeout(() => {
                        removeClass("transit1")
                        iconMenu.onclick = function() {
                            functClose(indice)
                        }; condMR = true
                    }, 500)
                }, 300)
            }, 300)
        }, 300)
    }
}; let functClose = (indice) => {
    if(condMR) {
        addClass("transit2")
        condMR = false
        iconMenu.style.background = "#c93763"
        segmIcon[0].style.transform = "rotate(0deg)"
        segmIcon[1].style.transform = "rotate(0deg)"
        segmIcon[2].style.transform = "rotate(0deg)"
        allDivsMR[3].style.height = "0vh"
        setTimeout(() => {
            segmIcon[0].style.top = "19px"
            segmIcon[2].style.top = "47px"
            allDivsMR[2].style.height = "0vh"
            setTimeout(() => {
                allDivsMR[1].style.height = "0vh"
                setTimeout(() => {
                    allDivsMR[0].style.height = "0vh"
                    setTimeout(() => {
                        removeClass("transit2")
                        addClass("transit1")
                        divsInMR[indice].style.display = "none"
                        iconMenu.onclick = function() {
                            functOpen(0)
                        }; condMR = true
                    }, 500)
                }, 300)
            }, 300)
        }, 300)
    }
}; iconMenu.onclick = function() {
    functOpen(0)
}; forEachNotArray(document.querySelectorAll(".menuRct__link"), (elem) => {
    elem.onclick = function() {
        functClose(0)
    }
}); iconMenu.addEventListener("mouseenter", function() {
    changeColorSegm("#f993b2")
}); iconMenu.addEventListener("mouseleave", function() {
    changeColorSegm("#fab5ca")
}); function changeColorSegm(color) {
    for(k = 0; k < segmIcon.length; k++) {
        segmIcon[k].style.background = color
    }
} function addClass(newclass) {
    forEachNotArray(allDivsMR, (elem) => {
        elem.classList.add(newclass)
    })
} function removeClass(oldclass) {
    forEachNotArray(allDivsMR, (elem) => {
        elem.classList.remove(oldclass)
    })
}

/*MUDANÇA DE IMAGEM DA INTRODUÇÃO*/
let introd = document.querySelector(".introd > article")
let divConj = document.querySelectorAll(".divsBck__div")
let setFundo
let indice
alterarFundo(0, 0, false)
for(let a = 0; a < divConj.length; a++) {
    divConj[a].onclick = () => {
        if(a !== indice) {
            clearTimeout(setFundo)
            alterarFundo(a, indice, true)
        }
    }
} function alterarFundo(numero, numeroAnt, time) {
    setFundo = setTimeout(function() {
        indice = numero
        introd.style.background = "url('img/introd/banner" + numero + ".jpg') no-repeat center"
        introd.style.backgroundSize = "cover"
        divConj[numeroAnt].style.background = "rgb(205,205,205,0.1)"
        divConj[numero].style.background = "rgb(205,205,205,0.4)"
        alterarFundo((numero + 1) % 6, numero, 3000)
    }, time)
}

/*ADICIONAR AS RECEITAS NA PARTE DE RECEITAS*/
let alimentos = ["Beterrabas assadas", "Mix de Vegetais", "Pimentões a Juliana", "Prato oriental", "Salada de Kiwi", "Tigela de Abacate"]
let receitas = document.querySelector(".receitas")
let conjReceitas = new Array()
alimentos.forEach((elem, index) => {
    let newDivPrinc = document.createElement("div")
    let newDiv = document.createElement("div")
    let newDiv2 = document.createElement("div")
    let newImg = document.createElement("img")
    newDivPrinc.className = "receitas__receita"
    newDiv.className = "receitas__receita__div flex"
    newDiv2.innerHTML = "<strong>" + elem + "</strong><p>Clique para visualizar a receita</p>"
    newImg.src = "img/receitas/receita" + index + ".jpg"
    newDiv.onclick = function() {
        functOpen(1)
    }; newDiv.appendChild(newImg)
    newDiv.appendChild(newDiv2)
    newDivPrinc.appendChild(newDiv)
    receitas.appendChild(newDivPrinc)
    conjReceitas.push(newDiv)
    newDiv.onmouseenter = () => {
        newDiv2.style.opacity = 1
        newImg.style.height = "120%"
        newImg.style.filter = "brightness(0.5) contrast(1.1)"
    }; newDiv.onmouseleave = () => {
        newDiv2.style.opacity = 0
        newImg.style.height = "100%"
        newImg.style.filter = "brightness(1) contrast(1)"
    }
});

/*MUDANÇA NO CSS CONFORME ROLAGEM OU REDIMENSIONAMENTO NA PÁGINA*/
let condMenu = false
let menu = document.querySelector(".menu")
let iconImg = document.querySelector(".iconMenuImg")
console.log(iconImg)
let titles = document.getElementsByClassName("titleEtapa")
let bolas = document.querySelectorAll(".menuPagina__bola__bola")
let pBolas = document.querySelectorAll(".menuPagina__bola__p")
let reta = document.querySelector(".menuPagina__reta > div")
let actIndT = 0
let condReceitas = new Array(conjReceitas.length).fill(false)
let conjComunit = document.querySelectorAll(".comunit")
let descritCom = document.querySelectorAll(".comunit__descrit")
let condComunit = new Array(conjComunit.length).fill(false)
let Y
let H
document.addEventListener("DOMContentLoaded", verifItens())
window.addEventListener("scroll", verifItens);
window.addEventListener("resize", verifItens)
forEachNotArray(bolas, (elem, index) => {
    elem.onmouseenter = () => {
        pBolas[index].style.opacity = 1
    }; elem.onmouseleave = () => {
        pBolas[index].style.opacity = 0
    }
}); forEachNotArray(descritCom, (elem) => {
    elem.onmouseenter = function() {
        if(this.scrollHeight > this.clientHeight) {
            this.style.cursor = "ns-resize"
        } else {
            this.style.cursor = "default"
        }
    };
});
function verifItens() {
    Y = window.scrollY
    H = window.innerHeight
    if(Y <= 200) {
        menu.style.background = "#6b1225"
        menu.style.boxShadow = "rgb(0,0,0,0.5) 0px 6px 1px"
        iconImg.height = 100
    } else {
        menu.style.background = "#3d0511"
        menu.style.boxShadow = "rgb(0,0,0,0.15) 0px 5px 2px"
        iconImg.height = 80
    } let infTtl = Title.getBoundingClientRect()
    let dataTtl = infTtl.top + infTtl.height - 100
    if(dataTtl > 0 && !condTitle) {
        condTitle = true
        corTitle.style.right = "20px"
    } else if(dataTtl <= 0 && condTitle) {
        condTitle = false
        corTitle.style.right = "-250px"
    } condReceitas.forEach((elem, index) => {
        elemAppears.bind([conjReceitas, condReceitas])(index, "-100px")
    }); condComunit.forEach((elem, index) => {
        elemAppears.bind([conjComunit, condComunit])(index, "calc(95% - 350px)")
    }); let newIndT = 0
    forEachNotArray(titles, (elem) => {
        let data = elem.getBoundingClientRect()
        if(data.top < 0) {
            newIndT++
        }
    }); if(newIndT !== actIndT) {
        if(newIndT > actIndT) {
            for(let t = actIndT + 1; t <= newIndT; t++) {
                bolas[t].style.background = "#ff96ad"
            }
        } if(newIndT < actIndT) {
            for(let t = newIndT + 1; t <= actIndT; t++) {
                bolas[t].style.background = "#e05c79"
            }
        } actIndT = newIndT
        reta.style.height = (newIndT*100/3) + "%"
    }
} function elemAppears(index, valor) {
    let elem = this[0][index]
    let data = elem.getBoundingClientRect()
    let condTop = ((data.top + data.height - 80) <= H)
    if(condTop && !this[1][index]) {
        elem.style.left = "0px"
        elem.style.opacity = 1
        this[1][index] = true
    } else if(!condTop && this[1][index]) {
        elem.style.left = valor
        elem.style.opacity = 0.15
        this[1][index] = false
    }
} function forEachNotArray(lista, functNotArray) {
    for(let j = 0; j < lista.length; j++) {
        if(functNotArray(lista[j], j)) {
            return
        }
    }
}