'use strict'

function onInit() {
    renderGallery()
}

renderGallery()
function renderGallery() {
    const imgs = getImgs()

    var strHtmls = imgs.map(img =>
        `<div class="meme-unit" onclick="onMemeClick(${img.id})">
        <img src="${img.url}" alt="">
        </div>`
    ).join('')
    document.querySelector('.gallery-container').innerHTML = strHtmls
}




