import { parse, format } from 'date-fns'
import { updateEvent, deleteEvent } from "./event";
import { openEditEventButton } from './modal';
import renderMonth from './renderMonth';


const allDayEventTemplate = document.getElementById('all-day-event-template')
const timedEventTemplate = document.getElementById('timed-event-template')


export default function createEventElements(event, date) {
    const element = event.isAllDay ? createAllDayEvent(event) : createTimedEvent(event)
    
    element.addEventListener('click', () => {
        openEditEventButton(event, updatedEvent => {
            updateEvent(updatedEvent)
            renderMonth(date)
        }, selectedEvent => {
            deleteEvent(selectedEvent)
            renderMonth(date)
        })
    })

    return element
}



function createAllDayEvent(event) {
    const element = allDayEventTemplate.content.cloneNode(true).querySelector('[data-event]')

    element.querySelector('[data-event-name]').textContent = event.name
    element.classList.add(event.color)


    return element
}

function createTimedEvent(event) {
    const element = timedEventTemplate.content.cloneNode(true).querySelector('[data-event]')

    element.querySelector('[data-color-dot]').classList.add(event.color)
    element.querySelector('[data-event-time]').textContent = format(parse(event.startTime, 'HH:mm', event.date), 'hh:mmaaa')
    




    element.querySelector('[data-event-name]').textContent = event.name

    return element
}