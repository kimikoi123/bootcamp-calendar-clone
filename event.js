import { isSameDay, parse, parseISO } from "date-fns"

const localStoragePrefix = 'Calendar'

let events = (JSON.parse(localStorage.getItem(localStoragePrefix)) || []).map(event => {
    return { ...event, date: parseISO(event.date) }
})

export function addEvent(event) {
    events.push(event)
    save()
}

export function getEvents(date) {
    const dayEvents = events.filter(event => isSameDay(event.date, date))
    dayEvents.sort(compareEvents)

    return dayEvents
}

export function updateEvent(event) {
    events = events.map(e => {
        if (e.id === event.id) return event
        return  e
    })
    save()
}

export function deleteEvent(event) {
    events = events.filter(e => e.id !== event.id)
    save()
}



function compareEvents(eventA, eventB) {
    if (eventA.isAllDay === eventB.isAllDay) {
        return  0
    }

    if (eventA.isAllDay) {
        return -1
    }

    if (eventB.isAllDay) {
        return 1
    }

    return convertTime(eventA.startTime) - convertTime(eventB.startTime)
}


function convertTime(time) {
    return parseFloat(time.replace(':', '.'))
}

function save() {
    localStorage.setItem(localStoragePrefix, JSON.stringify(events))
}