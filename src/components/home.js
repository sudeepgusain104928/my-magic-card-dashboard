import React, { Profiler } from "react";
import Container from "@material-ui/core/Container";
import MainGrid from "./mainGrid//mainGrid";
import FilterDrawer from "./drawer";

function Home() {
  const logProfiler = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log("id: ", id);
    console.log("phase: ", phase);
    console.log("actual duration: ", actualDuration);
    console.log("base duration: ", baseDuration);
    console.log("start time: ", startTime);
    console.log("commit time: ", commitTime);
    console.log("interactions: ", interactions);
  };
  return (
    <div>
      <div className="gridPageLayoutContainer">
        <FilterDrawer />
        <Container maxWidth="xl">
          <MainGrid />
        </Container>
      </div>
      <Profiler id="homeComponentRendering" onRender={logProfiler} />
    </div>
  );
}

export default Home;
