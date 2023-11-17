module.exports = {
    // handle mysql datetime to javascript date
    format_time: (datetime) => {
        const date = convert_datetime_str_to_date(datetime)
        console.log(date)
        return date.toLocaleString();
    },
}

function convert_datetime_str_to_date(str) {
    const dt = str.split(/[-T .:]/);
    console.log(str, dt)
    return new Date(dt[0], dt[1]-1, dt[2], dt[3], dt[4], dt[5])
}