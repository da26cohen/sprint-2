'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gFilter 
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'bad'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama', 'funny'] },
    { id: 11, url: 'img/11.jpg', keywords: ['kiss', 'funny'] },
];
var gCurrLine
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: 'red',
            font: 'impact',
            pos: { x: 3, y: 50 },
            isDrag: false

        }
    ]
}

function getMeme() {
    return gMeme
}

function updateTxt(text) {
    gCurrLine.txt = text

}

function updateFontSize(size) {
    gCurrLine.size += size
}

function updateFont(font) {
    gCurrLine.font = font
}

function updateColor(color) {

    gCurrLine.color = color
}

function switchLine() {
    (gMeme.lines.length - 1 === gMeme.selectedLineIdx) ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++
}

function addLine() {
    const line = {
        txt: '',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'impact',
        pos: { x: 5, y: 420 },
        isDrag: false
    }
    gMeme.selectedLineIdx++
    gMeme.lines.push(line)
}

function updatePos() {
    const { selectedLineIdx: lineIdx, lines } = gMeme
    const currLine = lines[lineIdx]
    if (lineIdx === 1) currLine.pos = { x: 3, y: 450 }
    else currLine.pos = { x: 3, y: 250 }
}

function updateImg(idx) {
    gMeme.selectedImgId = idx
}

function getImgs() {
    if (!gFilter) return gImgs
    var imgs = gImgs.filter(img => img.keywords[0] === gFilter || img.keywords[1] === gFilter)
    return imgs
}

function getLine() {
    return gCurrLine
}

function moveLine(dx, dy) {
    gCurrLine.pos.x += dx
    gCurrLine.pos.y += dy
}

function isLineClicked(clickedPos) {
    const { pos } = gCurrLine
    const distance = pos.y - clickedPos.y
    return distance < 50 && distance > -50
}

function setLineDrag(isDrag) {
    gCurrLine.isDrag = isDrag
}

function deleteLines() {
    gMeme.lines = [{
        txt: '',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'impact',
        pos: { x: 3, y: 50 },
        isDrag: false

    }]
    gMeme.selectedLineIdx = 0
}


function setDirection(direction) {
    const { selectedLineIdx: lineIdx, lines } = gMeme
    const currLine = lines[lineIdx]
    if (lineIdx === 0 && direction === 'right') {
        currLine.pos = { x: 495, y: 50 }
    } else if (lineIdx === 1 && direction === 'right') {
        currLine.pos = { x: 495, y: 450 }
    } else if (lineIdx === 2 && direction === 'right') {
        currLine.pos = { x: 495, y: 250 }
    }
    else if (lineIdx === 0 && direction === 'center') {
        currLine.pos = { x: 250, y: 50 }
    }
    else if (lineIdx === 1 && direction === 'center') {
        currLine.pos = { x: 250, y: 450 }
    }
    else if (lineIdx === 2 && direction === 'center') {
        currLine.pos = { x: 250, y: 250 }
    }
    currLine.align = direction
}


function setFilterBy(filter) {
    gFilter = filter
}
