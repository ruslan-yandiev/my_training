import React from "react";
import Test from "./Test";

function TestsList({ tests }) {
  return (
    <div>
      {tests.map((test) => (
        <Test test={test} />
      ))}
    </div>
  );
}

export default TestsList;
