import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { IClientSession } from "@/components/shared/Sidebar";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const transformation = transformationTypes[type];
  const clientSession = session as IClientSession | null;
  const user = clientSession?.user;

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user!.id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user!.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
