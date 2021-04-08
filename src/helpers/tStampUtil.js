/**
 * convert timestamp to date
 * @param timeStamp //timestamp string
 * @return {string} //date string (format == YYYY.MM.DD)
 */

function getDateInTimestamp(timeStamp) {
  var stamp = new Date(timeStamp)

  var year = stamp.getFullYear().toString()
  var month = (stamp.getMonth() + 1).toString()
  var day = stamp.getDate().toString()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  var stamp_date = year + '.' + month + '.' + day

  return stamp_date
}

export { getDateInTimestamp }
