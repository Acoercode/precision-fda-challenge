"use client";
import Counts from "@/app/components/ui/audit/charts/counts";
import Markdown from "@/app/components/ui/audit/charts/markdown";
import Table from "@/app/components/ui/audit/charts/table";
import TreeDiagramGraphviz from "@/app/components/ui/audit/charts/timeline";
import { isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import "../../../globals.css";

const AuditWrapper: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        // @ts-ignore
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to get the count of events matching today's date
  const getTodayEventCount = (events: any[]) => {
    const today = new Date(); // Get today's date

    return events.filter((event) => {
      const eventDate = new Date(event.stamp.date);
      return isSameDay(eventDate, today);
    }).length;
  };

  const handleEventClick = (event: any) => {
    fetchEventDetails(event._id);
    setSelectedRow(event);
  };

  const fetchEventDetails = async (id: string) => {
    try {
      setDetailsLoading(true);
      const response = await fetch(`${process.env.APP_API_ROOT}/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setSelectedEvent(data);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="loader-container flex items-center justify-center h-screen ml-20">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="col-span-12 xl:col-span-8">
        <Counts
          totalCount={events.length}
          todayCount={getTodayEventCount(events)}
        />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <Table
          data={events}
          handleEventClick={handleEventClick}
          setSelectedRow={setSelectedRow}
          selectedRow={selectedRow}
        />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <TreeDiagramGraphviz
          data={selectedEvent}
          selectedRow={selectedRow}
          handleEventClick={handleEventClick}
          allData={events}
        />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <Markdown data={selectedEvent} />
      </div>
    </>
  );
};

export default AuditWrapper;
