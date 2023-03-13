import { format } from "date-fns"
import { v4 as uuidV4 } from 'uuid';
import renderMonth from './renderMonth'

const modal = document.querySelector("[data-modal]")
const overlay = document.querySelector("[data-overlay]")
const modalBody = document.querySelector("[data-modal-body]")
const eventFormTemplate = document.getElementById("event-form-template")
const viewAllTemplate = document.getElementById('view-all-events-template')

overlay.addEventListener("click", closeModal)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal()
})

export function openAddEventButton(date, saveCallBack) {
  showModalContent({ date }, saveCallBack)
}

export function openEditEventButton(event, saveCallBack, deleteCallBack) {
  showModalContent(event, saveCallBack, deleteCallBack)
}

export function viewAllEvents(date, eventElements) {

  const element = viewAllTemplate.content.cloneNode(true)


  element.querySelector('[data-modal-title]').textContent = format(date, 'MM/dd/yyyy')

  eventElements.forEach(selectedElement => {
    selectedElement.classList.remove('hide')
    element.append(selectedElement)
  })

  

  openModal(element)
}

function showModalContent(event, saveCallBack, deleteCallBack) {
  const element = eventFormTemplate.content.cloneNode(true)

  const isNewElement = event.id == null
  element.querySelector("[data-event-title]").textContent = isNewElement
    ? "Add Event"
    : "Edit Event"

  element.querySelector("[data-event-date]").textContent = format(
    event.date,
    "M/d/yy"
  )

  const form = element.querySelector("[data-form]")

  const nameInput = form.querySelector('[data-name]')
  nameInput.value = event.name || ''

  const allDayButton = form.querySelector('[data-all-day]')
  allDayButton.checked = event.isAllDay

  let startTimeInput = form.querySelector('[data-start-time]')
  let endTimeInput = form.querySelector('[data-end-time]')

  startTimeInput.addEventListener('change', () => {
    endTimeInput.min = startTimeInput.value
  })

  startTimeInput.disabled = event.isAllDay
  endTimeInput.disabled = event.isAllDay

  allDayButton.addEventListener('change', () => {
    if (allDayButton.checked) {
        startTimeInput.disabled = true
        endTimeInput.disabled = true
    } else {
        startTimeInput.disabled = false
        endTimeInput.disabled = false
    }
  })

  startTimeInput.value = event.startTime
  endTimeInput.value = event.endTime

  if (event.color) {
    form.querySelector(`[data-color][value=${event.color}]`).checked = true
  }
    form.querySelector('[data-btn-success]').textContent = isNewElement ? "Add" : "Save"
    
  if (isNewElement) {
    form.querySelector('[data-btn-delete]').remove()
  } else {
    form.querySelector('[data-btn-delete]').addEventListener('click', () => {
      deleteCallBack(event)
      closeModal()
    })
  }

  

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    saveCallBack({
        id: event.id || uuidV4(),
        name: nameInput.value || '',
        isAllDay: allDayButton.checked,
        startTime: allDayButton.checked ? undefined : startTimeInput.value,
        endTime: allDayButton.checked ? undefined : endTimeInput.value,
        color: form.querySelector('[data-color]:checked').value,
        date: event.date,
    })
    closeModal()
  })

  openModal(element)
}

function openModal(bodyContent) {
  modalBody.innerHTML = ""
  modal.classList.add("show")
  modalBody.append(bodyContent)
}

function closeModal() {
  modal.classList.remove("show")
}
