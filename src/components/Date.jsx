function DateToLocal({ date }) {
  const d = new Date(date);
  const timestring = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  return timestring;
}

export default DateToLocal;
