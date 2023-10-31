import { useState } from "react";
import { useQuery } from "react-query";
import LoadingDirectory from "./LoadingDirectory";
import ShowError from "../ShowError";
import Folder from "./Folder";
import File from "./File";
import Breadcrumbs from "./Breadcrumbs";

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
    },
  );

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
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          handle={(item) => {
            selectPrefix(item);
            handleBreadcrumb(item);
          }}
        />
      </div>
      <div className="overflow-y-scroll">
        <ul className="list-none">
          {data.map((item: any) => {
            if (item.Prefix) {
              return (
                <Folder
                  item={item}
                  onClick={() => {
                    handleBreadcrumb(item.Prefix);
                    selectPrefix(item.Prefix);
                  }}
                />
              );
            } else {
              return <File item={item} prefix={prefix} />;
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default Directory;
