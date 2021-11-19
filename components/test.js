import { useState } from "react";

export default function MyTest() {
  var x = 0;
  for (let i = 0; i < 1000000000; i++) {
    if (i % 100000000 == 0) console.log(i);
    x += i;
    if (x > 1000000000) x = -x;
  }
  return <p>Hello world, a = {x}</p>;
}
