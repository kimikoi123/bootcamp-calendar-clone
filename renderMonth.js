import {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format
} from "date-fns"
import createDayElements from "./createDayElements"

const daysWrapper = document.querySelector("[data-days-wrapper]")
const monthTitle = document.querySelector("[data-month-title]")

export default function renderMonth(date) {


    monthTitle.textContent = format(date, 'MMMM yyyy')

  const dayElements = getCalendarDates(date).map((element, index) => {
    return createDayElements(element, {
      weekLabel: index < 7,
      sameMonth: isSameMonth(date, element),
      isCurrentDate: isSameDay(element, Date.now()),
    })
  })

  daysWrapper.innerHTML = ""
  dayElements.forEach((element) => daysWrapper.append(element))

  document.querySelectorAll('[day-container]').forEach(fixEventFlow)
}

export function fixEventFlow(dayContainer) {
  const eventsContainers = dayContainer.querySelector('[data-events-container]')
  const eventsViewMoreBtn = dayContainer.querySelector('[data-events-view-more-btn]')
  const events = eventsContainers.querySelectorAll('[data-event]')
  eventsViewMoreBtn.classList.add('hide')

  events.forEach(event => event.classList.remove('hide'))
  for (let i = events.length - 1; i >= 0; i--) {
    if (dayContainer.scrollHeight <= dayContainer.clientHeight) break
    events[i].classList.add('hide')
    eventsViewMoreBtn.classList.remove('hide')
    eventsViewMoreBtn.textContent = `+ ${events.length - i} more`
  }
}

function getCalendarDates(date) {
  const firstWeekStart = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const endWeekStart = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  return eachDayOfInterval({
    start: firstWeekStart,
    end: endWeekStart,
  })
}
