import QuizHeader from "@/components/shared/header/QuizHeader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-full min-h-screen flex flex-col bg-pink-bg  ">
      <QuizHeader />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
