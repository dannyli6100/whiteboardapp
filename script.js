const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const utilityBtns = document.querySelectorAll('.toolbar .options .option')
const sizeSelect = document.querySelector('#size-slider')
const colorSelect = document.querySelector('#colorwheel')

let isDrawing = false, tool = 'brush', brushWidth = 5, selectedColor = ctx.strokeStyle;

window.addEventListener('load', () => {
    // canvas width and height, offsetweidth and offsetheight returns vieable width and height of an element
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const startDraw = (e) => {
    isDrawing = true
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.stroke()
}

const drawing = (e) => {
    if(!isDrawing) return

    switch(tool) {
        case 'brush':
            ctx.strokeStyle = selectedColor
            ctx.lineWidth = brushWidth
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
        case 'erase':
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = brushWidth
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
    }
}

utilityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector(".options .option.active").classList.remove("active") // target only active option
        btn.classList.add("active")
        tool = btn.id
    })
})

sizeSelect.addEventListener("change", () => brushWidth = sizeSelect.value)

colorSelect.addEventListener("change", () => {
    selectedColor = colorSelect.value
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false)
canvas.addEventListener("click", (event) => {
    event.stopPropagation() // to prevent clicks outside canvas from affecting buttons
})