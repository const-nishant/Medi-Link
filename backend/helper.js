function getEpochMilliSeconds(dateTimeString) {
  let milliseconds = Date.parse(dateTimeString);
  if (isNaN(milliseconds)) {
    throw new Error("Invalid Date");
  }
  return milliseconds;
}

function checkIsDateFuture(milliseconds) {
  let now = Date.now();
  if (now > milliseconds) {
    throw new Error("Date is in the past");
  }
  return milliseconds;
}

export { getEpochMilliSeconds, checkIsDateFuture };
