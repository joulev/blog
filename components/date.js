import moment from "moment";

export default function Date(props) {
  return <time dateTime={props.time} title={moment(props.time).toISOString(false)}>
    {moment(props.time).format("D MMMM y, HH:mm:ss")}
  </time>;
}
