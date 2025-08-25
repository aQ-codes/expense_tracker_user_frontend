'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CalendarPrevIcon, CalendarNextIcon } from '@/themes/images/icon';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  onClose,
  isOpen,
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate || new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when calendar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    onClose();
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    handleDateSelect(today);
  };

  const handleClear = () => {
    onDateSelect(new Date());
    onClose();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month);

  if (!isOpen) return null;

  return (
    <div 
      ref={calendarRef}
      className={`absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 ${className}`}
      style={{ maxHeight: '400px', overflowY: 'auto' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">
          {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleMonthChange('prev')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <CalendarPrevIcon />
          </button>
          <button
            type="button"
            onClick={() => handleMonthChange('next')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <CalendarNextIcon />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isSelected = selectedDate && 
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDateSelect(date)}
              className={`p-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                isSelected
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : isToday
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  : isCurrentMonth
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleToday}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default Calendar;
