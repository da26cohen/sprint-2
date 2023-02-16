'use strict'


// renderSavedMemes()

function renderSavedMemes(){
    const savedMemesUrl = loadFromStorage(KEY)
    document.querySelector('.saved-memes').style.display =  'block'

    var strHtmls = 
        `<div class="meme-unit" onclick="onMemeClick(${gMeme.selectedImgId})">
        style="background-image: ${savedMemesUrl}">`
        document.querySelector('.saved-memes').innerHTML = strHtmls


}
