'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    addListeners()
}


function renderMeme() {
    const { selectedImgId: imgIdx, selectedLineIdx: lineIdx, lines } = getMeme()
    const img = new Image()
    gCurrLine = lines[lineIdx]
    img.src = `img/${imgIdx}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            const { txt, align, size, color, font, pos, isDrag } = line
            drawText(txt, align, size, color, font, pos.x, pos.y)
            if (idx === lineIdx) {
                drawRect(pos.x, pos.y, size)
            }
        })
    }

}

function drawText(txt, align, size, color, font, x = 200, y = 50) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'top'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawRect(x, y, size) {
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(0, y, 500, size)
}

function onFontSize(size) {
    updateFontSize(size)
    renderMeme()
}

function onTextInput(txt) {
    updateTxt(txt)
    renderMeme()
}


function onSetFont(font) {
    updateFont(font)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onSetColor(color) {
    updateColor(color)
    renderMeme()
}

function onAddLine() {
    document.querySelector('.text-input').value = ''
    addLine()
    updatePos()
    renderMeme()
}

function onAlignText(direction) {
    setDirection(direction)
    renderMeme()
}

function onUpdatePos(pos) {
    updatePos(pos)
    renderMeme()
}

function onMemeClick(idx) {
    const elSearch = document.querySelector('.search')
    const elGallery = document.querySelector('.gallery-container')
    const elMemeEdit = document.querySelector('.meme-edit')
    const elSavedMeme =  document.querySelector('.saved-memes')
    elSearch.style.display = 'none'
    elSavedMeme.style.display = 'none'
    elGallery.style.display = 'none'
    elMemeEdit.style.display = 'grid'
    updateImg(idx)
    renderMeme()
}

function onSave() {
    let url = gElCanvas.toDataURL('image/jpeg')
    saveMeme(url)
}

function onDelete() {
    let res = confirm('are you sure?')
    if (!res) return
    deleteLines()
    renderMeme()
}

function showGallery() {
    deleteLines()
    document.querySelector('.saved-memes').style.display = 'none'
    const elSearch = document.querySelector('.search')
    const elGallery = document.querySelector('.gallery-container')
    const elMemeEdit = document.querySelector('.meme-edit')
    elSearch.style.display = 'block'
    elGallery.style.display = 'grid'
    elMemeEdit.style.display = 'none'
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img'
}

function onSticker(sticker) {
    onAddLine()
    updateTxt(sticker)
    renderMeme()
}



function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getLine()
    if (!line.isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

//you git it!
function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function showSavedMeme() {
    document.querySelector('.meme-edit').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'block'
renderSavedMemes()
}

function onSetFilterBy(filter) {
    setFilterBy(filter)
    renderGallery()
}

function onShowSideBar() {
    document.querySelector('.side-bar').classList.toggle('show')

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth

}
