import moment from "moment";

export default function Date({ time }) {
  return <time dateTime={time} title={moment(time).toISOString(false)}>
    {moment(time).format("D MMMM y, HH:mm:ss")}
  </time>;
}
