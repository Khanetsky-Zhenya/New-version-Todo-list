'use strict'
const DB = getTodosInStorage()

$('#add-todo').addEventListener('click', function () {
    if (DB.length < 6) {
        createCard($('#input').value)
        setTodosInStorage($('#input').value)
        clearInput($('#input'))
        const lastIndex = DB.length - 1;
        $('#todo-list').childNodes[lastIndex].addEventListener('click', function (e) {
            if (e.target.className === 'btn-close') {
                removeTodosInStorage(lastIndex)
                renderList()
            } else if (e.target.type === 'checkbox') {
                e.target.parentNode.style.textDecoration = "line-through"
            }
        });
        badge()
    } else checkBadge()
})

function initCardListeners(list) {
    list.childNodes.forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            if (e.target.className === 'btn-close') {
                removeTodosInStorage(index)
                renderList()
            } else if (e.target.type === 'checkbox') {
                e.target.parentNode.style.textDecoration = "line-through"
            }
        })
    })
}

function clearInput(input) {
    input.value = ''
}

function setTodosInStorage(todoValue) {
    DB.push(todoValue)
    localStorage.setItem('key', JSON.stringify(DB))
}

function getTodosInStorage() {
    let data = JSON.parse(localStorage.getItem('key')) || []
    return data
}

function removeTodosInStorage(index) {
    DB.splice(index, 1)
    localStorage.setItem('key', JSON.stringify(DB))
}

function renderList() {
    $('#todo-list').innerHTML = ''
    DB.forEach(function (item) {
        createCard(item)
    })
    initCardListeners($('#todo-list'))
    badge()
    checkBadge()
}
renderList()

function badge() {
    document.querySelector('.badge').innerText = DB.length
}

function checkBadge() {
    if (DB.length >= 6) {
        let toastWindow = document.querySelector('.toast')
        toastWindow.style.display = "block"
    } else {
        let toastWindow = document.querySelector('.toast')
        toastWindow.style.display = "none"
    }
}

function $(selector) {
    return document.querySelector(selector)
}

function createElement(tag, classNames, text = '', type = '') {
    let element = document.createElement(tag)
    element.className = classNames
    element.innerText = text
    element.type = type
    return element
}
function createCard(text) {
    let card = createElement('div', 'card d-flex flex-row align-items-center')
    let checkBox = createElement('input', 'check-input d-flex justify-content-center ms-3', '', 'checkbox')
    let cardText = createElement('div', 'card-body d-flex justify-content-between', text)
    let btnClose = createElement('button', 'btn-close')
    cardText.append(btnClose)
    card.append(checkBox)
    card.append(cardText)
    $('#todo-list').append(card)
}