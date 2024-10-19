"use client";

import DashboardLayout from '../dashboard/layout'; 
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const events = [
    { title: 'Slot 1' , start: '2024-10-19T11:30:00', end: '2024-10-19T12:00:00'},
    { title: 'Slot 2', start: '2024-10-22T10:00:00', end: '2024-10-22T10:30:00' },
    { title: 'Slot 3', start: '2024-10-22T11:00:00', end: '2024-10-22T11:30:00' },
    { title: 'Slot 4', start: '2024-10-23T12:00:00', end: '2024-10-23T12:30:00' }
  ];

  const handleDateClick = (info) => {
    alert(`You selected the time slot: ${info.event.title}`);
  };

  return (
    <DashboardLayout>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        events={events}
        eventClick={handleDateClick}
        height="auto"
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        allDaySlot={false}
      />
    </DashboardLayout>
  );
}
