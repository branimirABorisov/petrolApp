import UsersRow from "./UsersRow";

export default function UsersTable({ users, setIsUserDeleted }) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-default">
        <ul role="list" className="divide-y divide-black">
          {users.length > 0 ? (
            users.map((user) => (
              <UsersRow key={user._id} user={user} setIsUserDeleted={setIsUserDeleted} />
            ))
          ) : (
            <div className="flex justify-center  bg-warning text-white items-center font-bold py-2 rounded-lg  shadow-default gap-2 text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              No users at the Moment!
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
