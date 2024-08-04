"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { loginFormSchema } from "@/validations";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { useState } from "react";

type FormFields = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const { data: session } = useSession();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<FormFields>({
    resolver: zodResolver(loginFormSchema),
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormFields> = async (
    data: z.infer<typeof loginFormSchema>
  ) => {
    try {
      const { email, password } = data;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("resres: ", res);
      if (res?.error) {
        toast({
          className: "bg-red-500 border border-red-500 text-white !rounded-md",
          variant: "destructive",
          title: "Invalid credentials",
          description:
            res?.error ?? "Please check your credentials and try again.",
        });
        return;
      }
      if (res?.ok) {
        toast({
          className: "bg-green-500 text-white border-green-500",
          title: "Login successful",
          description: "You have successfully logged in.",
        });
        router.push("/user-preferences");
      }
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-[420px] max-h-[600px] min-h-[500px] rounded-[20px] shadow-sm bg-white z-10  ">
      <CardHeader>
        <CardTitle className="text-2xl text-pink-primary font-[600]">
          Login
        </CardTitle>
        <CardDescription className="text-gray-primary py-2">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2 py-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-pink-primary duration-100 outline-none placeholder:text-gray-400"
                        placeholder="jack@gmail.com"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2 py-2">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={viewPassword ? "text" : "password"}
                          className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-pink-primary duration-100 outline-none placeholder:text-gray-400"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      {viewPassword ? (
                        <EyeIcon
                          onClick={() => setViewPassword(false)}
                          className="w-5 h-5 text-pink-primary absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      ) : (
                        <EyeSlashIcon
                          onClick={() => setViewPassword(true)}
                          className="w-5 h-5 text-pink-primary absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      )}
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full my-0 bg-pink-primary rounded-2xl px-5 py-3 text-white  hover:bg-pink-secondary duration-200   "
                type="submit"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Login"}
              </Button>
              {form.formState.errors.root && (
                <FormMessage className="text-red-500 py-2">
                  {form.formState.errors.root.message}
                </FormMessage>
              )}
            </form>
          </Form>
          <Link
            href="#"
            className="ml-auto inline-block text-sm underline  text-pink-primary"
          >
            Forgot your password?
          </Link>

          <div className="relative">
            <Button
              onClick={() => signIn("google")}
              className="w-full my-0 border border-pink-primary text-black bg-gray-bg rounded-2xl px-5 py-3   mt-3 hover:bg-white duration-200"
              variant="outline"
            >
              Sign up with Google
            </Button>
            <Image
              src="/assets/images/google-logo.png"
              width={30}
              height={30}
              className="w-[25px] h-[25px] absolute left-5 top-[50%] translate-y-[-30%]"
              alt="google-logo"
            />
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="sign-up" className="underline text-pink-primary">
            Sign up
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
