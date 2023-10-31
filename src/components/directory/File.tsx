import { DocumentIcon, FolderArrowDownIcon } from "@heroicons/react/20/solid";

type Prop = {
  item: any;
  prefix: string;
};

function File({ item, prefix }: Prop) {
  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Byte";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <li key={item.ETag} className="my-2">
      <div className="px-3 inline-flex justify-center items-center shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
        <DocumentIcon className="pr-1 h-5 w-auto" />
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

export default File;
