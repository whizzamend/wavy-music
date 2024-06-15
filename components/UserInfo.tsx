import { twMerge } from "tailwind-merge";

interface UserInfoProps {
  classNames?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    created_at?: string;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ classNames, user }) => {
  return (
    <div className={twMerge("w-full gap-y-3 flex-col flex", classNames)}>
      {user?.email ? (
        <div className="bg-neutral-800 rounded-md gap-y-6 py-3 px-6 flex flex-col sm:flex-row items-center justify-between w-full">
          <div className="w-50">
            <p className="text-neutral-400 font-semibold text-md">User UID:</p>
          </div>
          <div className="w-50">
            <p>{user?.id}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {user?.email ? (
        <div className="bg-neutral-800 rounded-md gap-y-6 py-3 px-6 flex flex-col sm:flex-row items-center justify-between w-full">
          <div className="w-50">
            <p className="text-neutral-400 font-semibold text-md">
              User Email:
            </p>
          </div>
          <div className="w-50">
            <p>{user?.email}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInfo;
