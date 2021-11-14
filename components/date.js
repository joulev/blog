import { parseISO, format, parse } from "date-fns";

export default function Date(props) {
  const dateArr = props.time.split("/");
  const dateISO = dateArr[2] + dateArr[1] + dateArr[0];
  return <time dateTime={dateISO}>{format(parseISO(dateISO), "LLLL d, yyyy")}</time>;
}
