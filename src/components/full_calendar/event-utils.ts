import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const INITIAL_EVENTS: EventInput[] = [
  {
    resourceId: 'd',
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    resourceId: 'b',
    id: createEventId(),
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T15:00:00',
    title: '課程0', 
    user: '會員0', 
    manager: '管理員0' 
  },
  // { id: '1', resourceId: 'b', start: todayStr + 'T02:00:00', end: todayStr + 'T07:00:00', title: '課程1', user: '會員1', manager: '管理員1' },
  // { id: '2', resourceId: 'c', start: todayStr + 'T05:00:00', end: todayStr + 'T22:00:00', title: '課程2', user: '會員2', manager: '管理員2' },
  // { id: '3', resourceId: 'd', start: todayStr, end: '2024-01-18', title: '課程3', user: '會員3', manager: '管理員3' },
  // { id: '4', resourceId: 'a', start: todayStr + '03:00:00', end: todayStr + 'T08:00:00', title: '課程4', user: '會員4', manager: '管理員4' },
]

export function createEventId() {
  return String(eventGuid++)
}
