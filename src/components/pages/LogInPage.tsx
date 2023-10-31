import { useState, useRef } from "react";
import RecoveryForm from "../forms/RecoveryForm";
function LogInPage() {
  const challengeInfo = useRef<any>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();

    if (data.ChallengeName == "NEW_PASSWORD_REQUIRED") {
      challengeInfo.current = data;
      setShowForm(true);
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-5xl font-bold">Login</h1>
        <form
          className="mx-auto items-center justify-center flex flex-col ring-1 p-2 rounded-md dark:ring-slate-800 shadow-lg ring-gray-100 gap-y-3"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className="rounded-md px-2 bg-gray-200 dark:bg-slate-700"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
            />
          </div>
          <div className="flex gap-x-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md px-2 bg-gray-200 dark:bg-slate-700"
              value={password}
              type="password"
            />
          </div>
          <button>Submit</button>
        </form>
        {showForm ? (
          <RecoveryForm challengeInfo={challengeInfo.current} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default LogInPage;
