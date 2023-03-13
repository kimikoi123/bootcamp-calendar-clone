import { addMonths } from "date-fns"
import renderMonth, { fixEventFlow } from "./renderMonth"


let selectedDate = Date.now()

document.querySelector('[data-next-btn]').addEventListener('click', () => {
    selectedDate = addMonths(selectedDate, 1)
    renderMonth(selectedDate)
})

document.querySelector('[data-prev-btn]').addEventListener('click', () => {
    selectedDate = addMonths(selectedDate, -1)
    renderMonth(selectedDate)
})

document.querySelector('[data-today-btn]').addEventListener('click', () => {
    selectedDate = Date.now()
    renderMonth(selectedDate)
})

let resetResize
window.addEventListener('resize', () => {
    if (resetResize) clearTimeout(resetResize)
    resetResize = setTimeout(() => {
        document.querySelectorAll('[day-container]').forEach(fixEventFlow)
    }, 100)
})



renderMonth(selectedDate)