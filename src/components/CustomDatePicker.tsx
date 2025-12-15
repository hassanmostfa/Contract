import React, { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './CustomDatePicker.css';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  displayValue: string;
  onDisplayClick: () => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  displayValue,
  onDisplayClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = new Date(value);
  const today = new Date();

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const dayNames = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Adjust for Arabic week (Saturday = 0)
    const adjustedStartingDay = (startingDayOfWeek + 1) % 7;

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedStartingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const todayString = today.toISOString().split('T')[0];
    onChange(todayString);
    setIsOpen(false);
  };

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const days = getDaysInMonth(currentMonth);
  const isSelected = (day: number) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0] === value;
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, day);
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  return (
    <div className="custom-date-picker-wrapper" ref={calendarRef}>
      <div 
        className="custom-date-display"
        onClick={() => {
          setIsOpen(!isOpen);
          onDisplayClick();
        }}
      >
        {displayValue}
      </div>
      
      {isOpen && (
        <div className="custom-calendar-popup">
          <div className="calendar-header">
            <IconButton 
              onClick={handlePrevMonth}
              className="calendar-nav-btn"
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
            <div className="calendar-month-year">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <IconButton 
              onClick={handleNextMonth}
              className="calendar-nav-btn"
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <div className="calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days">
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${
                  !day ? 'empty' : ''
                } ${
                  isSelected(day!) ? 'selected' : ''
                } ${
                  isToday(day!) ? 'today' : ''
                }`}
                onClick={() => day && handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-footer">
            <button className="calendar-today-btn" onClick={handleToday}>
              اليوم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;

