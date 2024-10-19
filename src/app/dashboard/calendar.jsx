
import { useState } from 'react';
import DashboardLayout from '../dashboard/layout'; // Imported for navbar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const [events, setEvents] = useState([ // Hard coded values for tesing purposed
    { id: 1, title: 'Slot 1', start: '2024-10-19T11:30:00', end: '2024-10-19T12:00:00' },
    { id: 2, title: 'Slot 2', start: '2024-10-22T10:00:00', end: '2024-10-22T10:30:00' },
    { id: 3, title: 'Slot 3', start: '2024-10-22T11:00:00', end: '2024-10-22T11:30:00' },
    { id: 4, title: 'Slot 4', start: '2024-10-23T12:00:00', end: '2024-10-23T12:30:00' },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [rescheduleDate, setRescheduleDate] = useState(''); // Store reschedule date

  // Handle clicking on an event
  const handleDateClick = (info) => {
    const event = events.find(e => e.id === parseInt(info.event.id)); // Find the clicked event by ID
    setSelectedEvent(event);
  };

  // Handle meeting removal
  const handleRemoveMeeting = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id)); // Remove the selected event
    setSelectedEvent(null);
    alert('Meeting removed successfully.');
  };

  // Handle rescheduling the meeting
  const handleRescheduleMeeting = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, start: rescheduleDate, end: rescheduleDate } // Reschedule the selected event
        : event
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
    alert('Meeting rescheduled successfully.');
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

      {selectedEvent && (
        <div className="modal">
          <h2>Manage Meeting: {selectedEvent.title}</h2>
          <button onClick={handleRemoveMeeting}>Remove Meeting</button>
          <div>
            <h3>Reschedule Meeting</h3>
            <label htmlFor="reschedule-date">Select new date: </label>
            <input
              type="datetime-local"
              id="reschedule-date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
            <button onClick={handleRescheduleMeeting} disabled={!rescheduleDate}>
              Confirm Reschedule
            </button>
          </div>
        </div>
      )}

      {/* <style jsx>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border: 1px solid black;
          z-index: 1000;
        }
      `}</style> */}
    </DashboardLayout>
  );
}
