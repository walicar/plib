import { FolderIcon } from "@heroicons/react/20/solid";

type Prop = {
  item: any;
  onClick: () => void;
};

function Folder({ item, onClick }: Prop) {
  return (
    <li key={item.Prefix} className="my-2 flex">
      <div className="px-3 inline-flex justify-center items-center shadow-sm dark:bg-opacity-80 bg-opacity-50 bg-gray-200 dark:bg-slate-900 rounded-md p-1 ">
        <FolderIcon className="pr-1 h-5 w-auto" />
        <button onClick={onClick} className="font-semibold">
          {item.Prefix}
        </button>
      </div>
    </li>
  );
}

export default Folder;
