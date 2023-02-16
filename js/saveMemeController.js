'use strict'

function renderSavedMemes(){
    const savedMemesUrl = loadFromStorage(KEY)
    document.querySelector('.gallery-container').style.display =  'none'
    document.querySelector('.saved-memes').style.display =  'block'

    var strHtmls = 
    `<div class="meme-unit" onclick="onMemeClick1()">
    <img src="${savedMemesUrl}" alt="">
    </div>`
        document.querySelector('.saved-memes').innerHTML = strHtmls
}
