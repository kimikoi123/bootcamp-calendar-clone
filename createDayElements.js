import { format } from "date-fns"
import createEventElements from "./createEventElements"
import { addEvent, getEvents } from "./event"
import { openAddEventButton, viewAllEvents } from "./modal"
import renderMonth from "./renderMonth"





export default function createDayElements(date, options = {}) {
    const {
        weekLabel = false,
        sameMonth = true,
        isCurrentDate = false
    } = options
    const dayTemplate = document.getElementById('day-template')
    const dayElement = dayTemplate.content.cloneNode(true).querySelector('[day-container]')


    dayElement.querySelector('[data-add-event-btn]').addEventListener('click', () => {
        openAddEventButton(date, event => {
            addEvent(event)
            renderMonth(date)
        })
    })

    dayElement.querySelector('[data-day-number]').textContent = date.getDate()
    if (weekLabel) {
        dayElement.querySelector('[data-week-name]').textContent = format(date, 'eee')
    }

    if (!sameMonth) {
        dayElement.classList.add('non-month-day')
    }

    if (isCurrentDate) {
        dayElement.querySelector('[data-day-number]').classList.add('active')
    }

    const eventsContainer = dayElement.querySelector('[data-events-container]')
    const eventElements = getEvents(date).map(element => {
        return createEventElements(element, date)
    })

    dayElement.querySelector('[data-events-view-more-btn]').addEventListener('click', () => {
        viewAllEvents(date, eventElements)
        renderMonth(date)
    })

    eventElements.forEach(element => {
        eventsContainer.append(element)
    })

    
    

    return dayElement
}