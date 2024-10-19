/**
 * @file calendar.jsx
 * @description This component renders a calendar interface that allows users to view and manage scheduled meetings.
 * The component uses FullCalendar for displaying the calendar in a weekly view and allows for interaction with events 
 * (view, remove, or reschedule meetings). Hard-coded events are used for testing purposes, and users can select and 
 * reschedule meetings through an input field or remove them with a button.
 * 
 * @dependencies 
 * - FullCalendar and its plugins (dayGridPlugin, timeGridPlugin, interactionPlugin) for rendering and interacting with the calendar.
 * - React hooks (useState) to manage the state of events, selected event, and reschedule input.
 * - Custom dashboard layout (DashboardLayout) for the navigation and page structure.
 * 
 * @function handleDateClick
 * Handles the event click interaction, selecting the clicked event to be displayed in a modal for further management.
 * 
 * @function handleRemoveMeeting
 * Removes the selected meeting from the calendar and updates the event state accordingly.
 * 
 * @function handleRescheduleMeeting
 * Reschedules the selected meeting to a new date and time based on user input.
 * 
 * @component Calendar
 * Renders the calendar with events, provides functionality for viewing, removing, and rescheduling events. 
 * Selected events are managed through a modal for interaction.
 * 
 * @state events
 * Holds the array of meeting events, with each event containing properties like id, title, start, and end times.
 * 
 * @state selectedEvent
 * Stores the currently selected event for editing or removal.
 * 
 * @state rescheduleDate
 * Stores the new date/time value for rescheduling a meeting.
 */


import { useState } from 'react';
import DashboardLayout from '../dashboard/layout'; // Custom layout that includes the navbar.
import FullCalendar from '@fullcalendar/react'; // FullCalendar component for rendering the calendar.
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin for displaying the calendar in a day grid view.
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin for time grid view (hourly slots).
import interactionPlugin from '@fullcalendar/interaction'; // Plugin for handling interactions like clicks.

export default function Calendar() {
  // State to manage events, initially set with hardcoded values for testing.
  const [events, setEvents] = useState([
    { id: 1, title: 'Slot 1', start: '2024-10-19T11:30:00', end: '2024-10-19T12:00:00' },
    { id: 2, title: 'Slot 2', start: '2024-10-22T10:00:00', end: '2024-10-22T10:30:00' },
    { id: 3, title: 'Slot 3', start: '2024-10-22T11:00:00', end: '2024-10-22T11:30:00' },
    { id: 4, title: 'Slot 4', start: '2024-10-23T12:00:00', end: '2024-10-23T12:30:00' },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the currently selected event for editing or removal.
  const [rescheduleDate, setRescheduleDate] = useState(''); // State to store the new date and time for rescheduling.

  // Function to handle clicking on an event in the calendar.
  const handleDateClick = (info) => {
    const event = events.find(e => e.id === parseInt(info.event.id)); // Find the event by ID.
    setSelectedEvent(event); // Set the selected event in state.
  };

  // Function to handle removing the selected meeting.
  const handleRemoveMeeting = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id)); // Remove the selected event from the events state.
    setSelectedEvent(null); // Reset the selected event.
    alert('Meeting removed successfully.'); // Show confirmation alert.
  };

  // Function to handle rescheduling the selected meeting.
  const handleRescheduleMeeting = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? { ...event, start: rescheduleDate, end: rescheduleDate } // Update the start and end time of the selected event.
        : event
    );
    setEvents(updatedEvents); // Update the events state with the rescheduled event.
    setSelectedEvent(null); // Reset the selected event.
    alert('Meeting rescheduled successfully.'); // Show confirmation alert.
  };

  return (
    <DashboardLayout> {/* Custom layout that includes the navbar */}
      {/* FullCalendar component rendering the calendar with time slots */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Plugins to enable different views and interactions.
        initialView="timeGridWeek" // Sets the initial view to a weekly time grid.
        selectable={true} // Enables selecting events.
        events={events} // Passes the events array to the calendar.
        eventClick={handleDateClick} // Handles event clicks to open the modal for event management.
        height="auto" // Sets the height of the calendar to adjust based on content.
        slotMinTime="09:00:00" // Minimum time displayed in the calendar (start at 9 AM).
        slotMaxTime="17:00:00" // Maximum time displayed in the calendar (end at 5 PM).
        allDaySlot={false} // Hides the all-day slot.
      />

      {/* Modal for managing the selected meeting (reschedule or remove) */}
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
              value={rescheduleDate} // Controlled input for reschedule date.
              onChange={(e) => setRescheduleDate(e.target.value)} // Update the reschedule date state.
            />
            <button onClick={handleRescheduleMeeting} disabled={!rescheduleDate}> {/* Disable the button if no date is selected */}
              Confirm Reschedule
            </button>
          </div>
        </div>
      )}

      {/* Inline CSS for the modal (optional) */}
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
