import React from 'react';
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

const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const data = {
  "15": 2, "16": 4, "17": 1, "18": 3, "19": 5, "20": 2, "21": 4, "22": 1, "23": 3, "24": 5
}

export default function Calendar(props) {
  const { demo } = props
  const year = 2025;
  const month = 'June';

  const monthIndex = Object.keys(months).indexOf(month);
  const monthNow = new Date(year, monthIndex, 1);
  const firstDayofMonth = monthNow.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
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
          month === now.toLocaleString('default', { month: 'long' }) &&
          year === now.getFullYear();

        const color = demo
          ? gradients.indigo[baseRating[dayNumber]] || 'white'
          : dayNumber in data
          ? gradients.indigo[data[dayNumber]]
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
