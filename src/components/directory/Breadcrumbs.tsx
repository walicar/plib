import React from "react";
type Prop = {
  breadcrumbs: string[];
  handle: (item: string) => void;
};

function Breadcrumbs({ breadcrumbs, handle }: Prop) {
  return (
    <>
      {breadcrumbs.map((item: string, index: number, arr) => (
        <React.Fragment key={index}>
          <button onClick={() => handle(item)}>
            {item === "/" ? "Home" : item.substring(0, item.length - 1)}
          </button>
          {index !== arr.length - 1 && <span>{"/"}</span>}
        </React.Fragment>
      ))}
    </>
  );
}

export default Breadcrumbs;
