import moment from "moment";

export default function Date(props) {
  return <time dateTime={props.time}>{moment(props.time).format("D MMMM y, HH:mm:ss")}</time>;
}
