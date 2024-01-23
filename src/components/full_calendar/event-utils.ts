
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const INITIAL_EVENTS: any[] = [
  {
    resourceId: 'd',
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    color: '#6ffff3'
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
  {
    resourceId: 'b',
    id: createEventId(),
    start: todayStr + 'T15:00:00',
    end: todayStr + 'T16:00:00',
    title: '課程00',
    user: '會員00',
    manager: '管理員00'
  },
  //{ id: '1', resourceId: 'b', start: '2024-01-18T02:00:00', end: '2024-01-18T07:00:00', title: '課程1', user: '會員1', manager: '管理員1', color: '#6ffff3' }
  { id: '1', resourceId: 'b', start: todayStr + 'T02:00:00', end: todayStr + 'T07:00:00', title: '課程1', user: '會員1', manager: '管理員1', color: '#6ffff3' },
  { id: '2', resourceId: 'c', start: todayStr + 'T05:00:00', end: todayStr + 'T10:00:00', title: '課程2', user: '會員2', manager: '管理員2' },
]
export const INITIAL_RESOURCES: any[] = [
  { id: 'a', title: 'User A' },
  { id: 'b', title: 'User B' },
  { id: 'c', title: 'User C' },
  { id: 'd', title: 'User D' }
]

export function createEventId() {
  return String(eventGuid++)
}
