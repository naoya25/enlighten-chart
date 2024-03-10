import React from "react";
import loading from "@/styles/loading.module.css";

const Loading = () => {
  return (
    <div className={`flex ${loading.loadingContainer}`}>
      {Array.from("loading...").map((s, index) => (
        <div key={index} className={loading.bounceAnimate}>
          {s}
        </div>
      ))}
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-sky-500 border-t-transparent m-1" />
    </div>
  );
};

export default Loading;
