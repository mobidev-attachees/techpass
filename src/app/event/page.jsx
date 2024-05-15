"use client";
import React from "react";

const CreateEvent = () => {
  return (
    <div>
      <h1>Event Details</h1>
      <form>
        <div>
          <label>
            Event Name:
            <input type="text" name="eventName" />
          </label>
        </div>
        <div>
          <label>
            Event Description:
            <textarea name="eventDescription"></textarea>
          </label>
        </div>
        <div>
          <label>
            Upload Banner Image:
            <input type="file" name="bannerImage" />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input type="text" name="location" />
          </label>
        </div>
        <div>
          <label>
            Country:
            <input type="text" name="country" />
          </label>
        </div>
        <div>
          <label>
            City:
            <input type="text" name="city" />
          </label>
        </div>
        <div>
          <label>
            Start Date:
            <input type="date" name="startDate" />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input type="date" name="endDate" />
          </label>
        </div>
        <div>
          <label>
            Start Time:
            <input type="time" name="startTime" />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input type="time" name="endTime" />
          </label>
        </div>
        <div>
          <label>
            Venue Name:
            <input type="text" name="venueName" />
          </label>
        </div>
        <div>
          <label>
            Meeting Link:
            <input type="url" name="meetingLink" />
          </label>
        </div>
        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
