import { App } from "./App";

export default function () {
  console.log("base-layer loaded");
  return <>{currentLayer === "root" ? <App /> : <></>}</>;
}
