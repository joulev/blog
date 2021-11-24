import Tag from "./tag";

export default function TagList({ tags }) {
  return <>
    <div className="flex gap-2">
      {tags.split(" ").map(tag => <Tag tag={tag} />)}
    </div>
  </>;
}
