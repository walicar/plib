/**
 * @todo I don't think you've integrated me yet,
 *  make sure we get this thing working with
 *  challenges from "/login" endpoint
 */

import { Fragment, useState, useEffect } from "react";
import InputStyles from "../../styles/InputStyles";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";

type Prop = {
  challengeInfo: any;
};

function RecoveryForm({ challengeInfo }: Prop) {
  // could refactor this to be "respond to challenge form"
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  useEffect(() => {
    console.log(challengeInfo);
  }, []);

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setIsValidPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsValidPassword(true);
    if (!password.length || !confirmPassword.length) {
      setIsValidPassword(false);
      setErrorMessage("Please enter your password");
      return;
    }
    if (password != confirmPassword) {
      setIsValidPassword(false);
      setErrorMessage("Passwords do not match");
      return;
    }
    clearForm();
    setOpen(false);
    setShow(true);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setErrorMessage("Please update your pasword");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-slate-700 dark:bg-opacity-95" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-neutral-50"
                      >
                        Update your Password
                      </Dialog.Title>
                      <div className="mt-3 border-t-2 dark:border-slate-600">
                        <form
                          onSubmit={handleSubmit}
                          className="grid grid-rows-3 gap-y-5 pt-5 pb-3 px-7"
                        >
                          <div>
                            <label
                              htmlFor="newPassword"
                              className="text-sm font-semibold dark:text-neutral-50"
                            >
                              New Password
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={password}
                                autoComplete="new-password"
                                className={InputStyles.isValid}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setIsValidPassword(true);
                                }}
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                {!isValidPassword ? (
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="text-sm font-semibold dark:text-neutral-50"
                            >
                              Re-enter Password
                            </label>
                            <div className="sm:flex-none relative rounded-md shadow-sm">
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                autoComplete="new-password"
                                className={
                                  isValidPassword
                                    ? InputStyles.isValid
                                    : InputStyles.notValid
                                }
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                  setIsValidPassword(true);
                                }}
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                {!isValidPassword ? (
                                  <ExclamationCircleIcon
                                    className="h-5 w-5 text-red-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="justify-center">
                            {!isValidPassword ? (
                              <p
                                className="text-sm text-red-600"
                                id="email-error"
                              >
                                {errorMessage}
                              </p>
                            ) : (
                              <></>
                            )}
                          </div>
                          <button className="font-semibold dark:text-gray-50 dark:hover:text-gray-300">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-slate-900 dark:text-neutral-50 dark:ring-slate-600 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-898">
                      Password Updated
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                      You've successfully changed your password.
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white dark:bg-slate-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default RecoveryForm;
