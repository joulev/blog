import dynamic from "next/dynamic";

const DynamicLoadLayout = dynamic(() => import("./test"), {
  loading: <p>loading</p>
});

export default function Main() {
  return <DynamicLoadLayout />;
}
