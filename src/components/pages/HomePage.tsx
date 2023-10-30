import { Transition } from "@headlessui/react";
import useAuthStatus from "../hooks/useAuthStatus";
import Directory from "../Directory";

function HomePage() {
  useAuthStatus();
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
        </div>
        <Directory />
      </Transition>
    </>
  );
}

export default HomePage;
