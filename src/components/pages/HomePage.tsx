import { Transition } from "@headlessui/react";
function HomePage() {
  return (
    <>
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex gap-x-10 items-center pb-5">
          <h1 className="font-bold text-5xl">Library</h1>
          <input className="mt-4 px-2 text-lg rounded-md bg-gray-200 dark:bg-slate-800" placeholder="🔍"/>
        </div>
      </Transition>
    </>
  );
}

export default HomePage;
