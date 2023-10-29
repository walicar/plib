/**
 * @todo should only send query when we have cookies
 *  when we sign in and move into "/" we get 400 err
 *  caught by middleware
 */

import { useQuery } from "react-query";
import LoadingHome from "./LoadingHome";
import ShowError from "./ShowError";
function Directory() {
  const { data, isLoading, error } = useQuery(
    "files",
    async () => {
      try {
        const data = await (await fetch("/s3/list")).json();
        console.log(data);
        return data;
      } catch (e: any) {
        throw new Error(e || e?.message);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <LoadingHome />;
  }

  if (error) {
    return <ShowError>Failed To Retrieve Files</ShowError>;
  }
  return (
    <div className="text-md overflow-y-scroll">
      <ul className="list-none">
        {data.map((item: any) => {
          if (item.Prefix) {
            return (
              <li key={item.Prefix} className="my-2 flex">
                <div className="px-3 shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
                  <span className="font-semibold">{item.Prefix}</span>
                </div>
              </li>
            );
          } else {
            return (
              <li key={item.ETag} className="my-2 flex">
                <div className="px-3 shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
                  <span className="font-semibold">{item.Key}</span>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Directory;
