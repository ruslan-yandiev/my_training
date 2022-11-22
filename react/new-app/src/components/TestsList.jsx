import React from "react";
import Test from "./Test";

function TestsList({ tests }) {
  return (
    <div>
      {tests.map((test, index) => (
        <Test test={test} key={index + 999} />
      ))}
    </div>
  );
}

export default TestsList;
