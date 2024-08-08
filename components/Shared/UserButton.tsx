import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { IClientSession } from "./Sidebar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
function UserButton({
  showName,
  afterSignOutUrl,
  clientSession,
}: {
  clientSession?: IClientSession | null;
  showName?: boolean;
  afterSignOutUrl?: string;
}) {
  const userImage = clientSession?.user?.image ?? "/assets/icons/user_icon.svg";
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="w-full flex items-center gap-4 bg-white rounded-[6px] cursor-pointer">
          <img src={userImage} width={36} height={36} alt="user_icon" />
          {showName && (
            <p className="text-sm font-semibold py-1 text-black">
              {clientSession!.user.name}
            </p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full md:min-w-[400px] rounded-lg bg-white flex flex-col py-3  ">
        <div className="w-full flex justify-start items-center gap-4 mb-6 px-4">
          <div>
            <img src={userImage} width={36} height={36} alt="user_icon" />
          </div>
          <div>
            <p className="text-sm font-semibold  text-black">
              {clientSession!.user.name}
            </p>
            <p className="text-xs font-normal py-1 text-gray-500">
              {clientSession!.user.email}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-start items-center gap-3 py-2 px-4 my-2 cursor-pointer hover:bg-gray-100 duration-150 rounded-md">
          <Settings className="mr-2 h-4 w-4 text-gray-600 " />
          <p className="font-medium text-gray-600">Manage account</p>
        </div>

        <div
          onClick={() => signOut()}
          className="w-full flex justify-start items-center gap-3 py-2 px-4 my-2 cursor-pointer hover:bg-gray-100 duration-150 rounded-md"
        >
          <LogOut className="mr-2 h-4 w-4 text-gray-600 " />
          <p className="font-medium text-gray-600">Log out</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserButton;
