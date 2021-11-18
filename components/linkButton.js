import Link from "next/link";

export default function LinkButton(props) {
  return (
    <Link href={props.href}>
      <a className="btn btn-primary">{props.children}</a>
    </Link>
  );
}
