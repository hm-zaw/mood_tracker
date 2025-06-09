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
      // value +1 -1
      // if we hit the bounds of the months, then we can just adjust the year that is displayed instead
      if (numericMonth + val < 0) {
          // set month value = 11 and decrement the year
          setSelectedYear(curr => curr - 1)
          setSelectedMonth(months[months.length - 1])
      } else if (numericMonth + val > 11) {
          // set month val = 0 and increment the year
          setSelectedYear(curr => curr + 1)
          setSelectedMonth(months[0])
      } else {
          setSelectedMonth(months[numericMonth + val])
      }
  }

  const monthIndex = Object.keys(months).indexOf(selectedMonth);
  const monthNow = new Date(selectedYear, monthIndex, 1);
  const firstDayofMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
  const totalCells = firstDayofMonth + daysInMonth;
  const numRows = Math.ceil(totalCells / 7);

  return (
    <div className='grid grid-cols-7 gap-2'>
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
          <div key={i} style={{ background: color }}
            className={'w-full h-full text-xs sm:text-sm border-2 border-solid p-2 py-4 font-semibold flex text-left items-start justify-start rounded-lg' +
              (isToday ? ' border-indigo-400' : ' border-indigo-100') +
              (color === 'white' ? ' text-indigo-400' : ' text-white')
            }
          >
            <p className="text-left">{isValidDay ? dayNumber : ''}</p>
          </div>

        );
      })}
    </div>
  );
}
