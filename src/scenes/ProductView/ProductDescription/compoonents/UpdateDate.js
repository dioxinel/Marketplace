
import React from 'react';


export function UpdateDate({updated, ...props}) {
    const currentDate = new Date();
    const updateDate = new Date(updated);
    let date = `${addZeroToDate(updateDate.getDate())}.${addZeroToDate(updateDate.getMonth())}.${updateDate.getFullYear()}`
    if(currentDate.getDate() === updateDate.getDate() && currentDate.getMonth() === updateDate.getMonth() && currentDate.getFullYear() === updateDate.getFullYear()) {
        date = "Today"
    } else if(currentDate.getDate() - 1 === updateDate.getDate() && currentDate.getMonth() === updateDate.getMonth() && currentDate.getFullYear() === updateDate.getFullYear()) {
        date = "Yesterday"
    }
    const updateDateView = `${date} ${addZeroToDate(updateDate.getHours())}:${addZeroToDate(updateDate.getMinutes())}` 
    return (
    <div {...props}>{updateDateView}</div>
        );
}
    
function addZeroToDate(time) {
    if(time <= 9) {
        return '0' + time;
    }
    return time
}
