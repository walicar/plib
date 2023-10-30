/**
 * @todo should only send query when we have cookies
 *  when we sign in and move into "/" we get 400 err
 *  caught by middleware
 */

import { useState } from "react";
import { useQuery } from "react-query";
import { FolderArrowDownIcon, DocumentIcon, FolderIcon } from "@heroicons/react/20/solid";
import LoadingDirectory from "./LoadingDirectory";
import ShowError from "./ShowError";
function Directory() {
  const [prefix, setPrefix] = useState<string>("/");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["/"]);

  const { data, isLoading, error, refetch } = useQuery(
    prefix,
    async () => {
      try {
        var url = "s3/list";
        if (prefix != "/") {
          url += "?prefix=" + prefix;
        }
        const data = await (await fetch(url)).json();
        return data;
      } catch (e: any) {
        throw new Error(e || e?.message);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Byte";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const selectPrefix = (newPrefix: string) => {
    if (newPrefix == prefix) return;
    setPrefix(newPrefix);
    refetch();
  };

  const handleBreadcrumb = (newPrefix: string) => {
    if (newPrefix == prefix) return;
    const target = breadcrumbs.indexOf(newPrefix);
    if (target >= 0) {
      // we are ascending from folder
      const newBreadcrumbs = breadcrumbs.slice(0, target + 1);
      setBreadcrumbs(newBreadcrumbs);
    } else {
      // we are descending into folder
      const newBreadcrumbs = [...breadcrumbs, newPrefix];
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  if (isLoading) {
    return <LoadingDirectory />;
  }

  if (error) {
    return <ShowError>Failed To Retrieve Files</ShowError>;
  }
  return (
    <>
      <div className="mb-2 rounded-md p-2 shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900">
        {breadcrumbs.map((item: string, index: number, arr) => {
          return (
            <>
              <button
                key={item}
                onClick={() => {
                  selectPrefix(item);
                  handleBreadcrumb(item);
                }}
                className="px-3 font-semibold text-md shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-100 dark:bg-slate-800 rounded-md p-1 mx-2"
              >
                {item == "/" ? "Home" : item.substring(0, item.length - 1)}
              </button>
              {index != arr.length - 1 ? <span>{"/"}</span> : <></>}
            </>
          );
        })}
      </div>
      <div className="overflow-y-scroll">
        <ul className="list-none">
          {data.map((item: any) => {
            if (item.Prefix) {
              return (
                <li key={item.Prefix} className="my-2 flex">
                  <div className="px-3 inline-flex justify-center items-center shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
                    <FolderIcon className="px-1 h-5 w-auto"/>
                    <button
                      onClick={() => {
                        handleBreadcrumb(item.Prefix);
                        selectPrefix(item.Prefix);
                      }}
                      className="font-semibold"
                    >
                      {item.Prefix}
                    </button>
                  </div>
                </li>
              );
            } else {
              return (
                <li
                  key={item.ETag}
                  className="my-2"
                >
                  <div className="px-3 inline-flex justify-center items-center shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
                    <DocumentIcon className="px-1 h-5 w-auto"/>
                    <span className="w-[100px] sm:w-[300px] xl:w-[525px] truncate">
                      {prefix == "/" ? item.Key : item.Key.replace(prefix, "")}
                    </span>
                    <div className="inline-flex justify-center items-center">
                      <a
                        href={`/s3/file?path=${item.Key}`}
                        className="mx-3 p-1 px-2 inline-flex bg-gray-100 dark:bg-slate-800 underline text-blue-900 dark:text-blue-300 rounded-md"
                      >
                        <FolderArrowDownIcon className="h-5 w-auto" />
                      </a>
                      <span className="mx-1 texbt-sm p-1 px-2 bg-gray-100 dark:bg-slate-800 rounded-md">
                        {formatBytes(item.Size)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default Directory;
