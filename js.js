

function onePageScroll() {
    const menu__list = document.body.querySelector('.menu__list');
const menu__link = document.body.querySelectorAll('.menu__link')
const pagination__link = document.body.querySelectorAll('.pagination__link');
const sections = document.body.querySelectorAll('.section');
const main = document.body.querySelector('.main-content');
const pagination__list = document.body.querySelector('.pagination__list')
const pagination__item = document.body.querySelectorAll('.pagination__item')
inScroll = false;

window.addEventListener('load', e => {
    
})

function navigation() {
    pagination__list.addEventListener( 'click', e => {
        e.preventDefault()
        for (i = 0; i < pagination__link.length; i++ ) {
            if (e.target == pagination__link[i]) {
                let data = e.target.dataset.value
                doScroll(data)
            }
        }
        
    })

    menu__list.addEventListener( 'click', e => {
        e.preventDefault()
        for (i = 0; i < menu__link.length; i++ ) {
            if (e.target == menu__link[i]) {
                let data = e.target.dataset.value
                doScroll(data)
            }
        }
    })
}

function changeClass(arr, number) {
  for (i = 0; i < arr.length; i++) {
    arr[i].classList.remove('is-active')
  }
  arr[number].classList.add('is-active')
}


function doScroll(number) {
    const position = `${number * (-25)}%`
    if (inScroll) return
    inScroll = true
    main.style.transform = `translateY(${position})`;
    changeClass(sections, number)
    changeClass(pagination__item, number)
    setTimeout(() => {
        inScroll = false
        
    }, 600);

}

function name(direction) {
    const page = definePage()
    if(direction === "up" && page.nextPage) {
        doScroll(page.indexPage + 1)
    } else if (direction === 'down' && page.prevPage) {
        doScroll(page.indexPage - 1)
    }
}

function definePage() {
    for (i = 0; i < sections.length; i++) {
        if(sections[i].classList.contains('is-active')) {
            return  {   prevPage: sections[i].previousElementSibling,
                        nextPage: sections[i].nextElementSibling,
                        indexPage: i }
            }
    }
    
}

function wheel() {
    document.addEventListener('wheel', e => {
        switch(e.deltaY > 0) {
            case(true): name('up');
            break
            case(false): name('down');
            break
        }
    })
}

function keyDown() {
    document.addEventListener('keydown', e => {
        switch(e.keyCode) {
            case (40): name('up');
            break
            case (38): name('down');
            break
        }
    })
}

keyDown();

wheel();

navigation()
}

onePageScroll()