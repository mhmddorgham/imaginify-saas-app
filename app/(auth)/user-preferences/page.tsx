import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MainView from "@/components/user-preferences/MainView";
import { IClientSession } from "@/types";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// interface IClientSession extends Session {
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     isPreferencesDone: boolean;
//   };
// }

export default async function page() {
  const session = (await getServerSession(authOptions)) as IClientSession;

  console.log("session in userPEREFERENCES:: ", session?.user);

  if (session && session.user.isPreferencesDone) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full container">
      <MainView />
    </div>
  );
}
