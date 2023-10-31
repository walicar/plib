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
          <button
            className="px-3 font-semibold text-md shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-100 dark:bg-slate-800 rounded-md p-1 mx-2"
            onClick={() => handle(item)}
          >
            {item === "/" ? "Home" : item.substring(0, item.length - 1)}
          </button>
          {index !== arr.length - 1 && <span>{"/"}</span>}
        </React.Fragment>
      ))}
    </>
  );
}

export default Breadcrumbs;
