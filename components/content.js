import { useEffect } from "react";
import Date from "./date";
import TagList from "./tagList";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";

export default function Content(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [props.content]);
  if (props.postPage) {
    return (
      <div>
        <h1>{props.data.title}</h1>
        <div className="mt-3 fs-4 text-muted"><Date time={props.data.time} /></div>
        <div className="mt-2"><TagList dark={props.dark} tags={props.data.tag} /></div>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    );
  }
  return <div>{props.content}</div>;
}
