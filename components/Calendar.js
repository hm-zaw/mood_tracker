'use client'
import React, {useState} from 'react';
import { Fugaz_One } from 'next/font/google'
import { baseRating, gradients } from '@/utils';
const months = {
  'January': 'Jan',
  'February': 'Feb',
  'March': 'Mar',
  'April': 'Apr',
  'May': 'May',
  'June': 'Jun',
  'July': 'Jul',
  'August': 'Aug',
  'September': 'Sep',
  'October': 'Oct',
  'November': 'Nov',
  'December': 'Dec'
};
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props
  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  
  const numericMonth = Object.keys(months).indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  
  function handleIncrementMonth(val) {
    const monthKeys = Object.keys(months);
    const totalMonths = monthKeys.length;

    let newNumericMonth = numericMonth + val;

    if (newNumericMonth < 0) {
        // Wrap to December of the previous year
        newNumericMonth = totalMonths - 1;
        setSelectedYear(curr => curr - 1);
    } else if (newNumericMonth >= totalMonths) {
        // Wrap to January of the next year
        newNumericMonth = 0;
        setSelectedYear(curr => curr + 1);
    }

    setSelectedMonth(monthKeys[newNumericMonth]);
}

  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firstDayofMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()
  
  const totalCells = firstDayofMonth + daysInMonth;
  const numRows = Math.ceil(totalCells / 7);

  return (
  <div className="flex flex-col gap-4">
    {/* Navigation Bar */}
    <div className="grid grid-cols-5 gap-4 items-center">
      <button
        onClick={() => handleIncrementMonth(-1)}
        className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
      >
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>
      <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + fugaz.className}>
        {selectedMonth}, {selectedYear}
      </p>
      <button
        onClick={() => handleIncrementMonth(+1)}
        className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
      >
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
    </div>

    {/* Weekday Headers */}
    <div className="grid grid-cols-7 gap-2 text-center font-semibold text-indigo-500">
      {weekdays.map((day, i) => (
        <div key={i} className="py-2 bg-indigo-400 rounded-lg">
          <p className='text-white'> {day} </p>
        </div>
      ))}
    </div>

    {/* Calendar Grid */}
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: totalCells }).map((_, i) => {
        const dayNumber = i - firstDayofMonth + 1;
        const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
        const isToday =
          isValidDay &&
          dayNumber === now.getDate() &&
          selectedMonth === now.toLocaleString('default', { month: 'long' }) &&
          selectedYear === now.getFullYear();

        const color = demo
          ? gradients.indigo[baseRating[dayNumber]] || 'white'
          : dayNumber in data
          ? gradients.indigo[data[dayNumber] - 1]
          : 'white';

        return (
          <div
            key={i}
            style={{ background: color }}
            className={
              'w-full h-full text-xs sm:text-sm border-2 border-solid p-2 py-4 font-semibold flex text-left items-start justify-start rounded-lg' +
              (isToday ? ' border-indigo-400' : ' border-indigo-100') +
              (color === 'white' ? ' text-indigo-400' : ' text-white')
            }
          >
            <p className="text-left">{isValidDay ? dayNumber : ''}</p>
          </div>
        );
      })}
    </div>
  </div>
);
}
