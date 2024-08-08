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
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/validations";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { createUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { signIn } from "next-auth/react";

type FormFields = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof signupFormSchema>
  ) => {
    try {
      console.log(values);
      const { confirmPassword, ...user } = values;
      const res = await createUser(user);
      if (res) {
        // TODO: Direct to verify email for later:
        router.push("/sign-in");
      } else {
        toast({
          variant: "destructive",
          title: "",
          description: "Something went wrong, try again later",
        });
      }
    } catch (err: any) {
      console.log("err in in ", err);
      form.setError("root", {
        type: "manual",
        message: err?.message ?? "Something went wrong, try again later",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-[420px] min-h-[500px] rounded-[20px] shadow-sm bg-white z-10  ">
      <CardHeader>
        <CardTitle className="text-2xl text-primary-purple font-[600]">
          Sign Up
        </CardTitle>
        <CardDescription className="text-gray-primary py-2">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4  py-2">
                {/* first name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 ">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Max"
                          className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-primary-purple duration-100 outline-none placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/* last name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 ">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Mustermann"
                          className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-primary-purple duration-100 outline-none placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

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
                        className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-primary-purple duration-100 outline-none placeholder:text-gray-400"
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
                    <div className=" relative">
                      <FormControl>
                        <Input
                          type={viewPassword ? "text" : "password"}
                          className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-primary-purple duration-100 outline-none placeholder:text-gray-400"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      {viewPassword ? (
                        <EyeIcon
                          onClick={() => setViewPassword(false)}
                          className="w-5 h-5 text-primary-purple absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      ) : (
                        <EyeSlashIcon
                          onClick={() => setViewPassword(true)}
                          className="w-5 h-5 text-primary-purple absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      )}
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2 py-2">
                    <FormLabel>Confirm password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={viewPassword ? "text" : "password"}
                          className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-primary-purple duration-100 outline-none placeholder:text-gray-400"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      {viewPassword ? (
                        <EyeIcon
                          onClick={() => setViewPassword(false)}
                          className="w-5 h-5 text-primary-purple absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      ) : (
                        <EyeSlashIcon
                          onClick={() => setViewPassword(true)}
                          className="w-5 h-5 text-primary-purple absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                        />
                      )}
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full my-0 bg-primary-purple rounded-2xl px-5 py-3 text-white  hover:bg-pink-secondary duration-200 mt-3   "
                type="submit"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>

              {form.formState.errors.root && (
                <FormMessage className="text-red-500 py-2">
                  {form.formState.errors.root.message}
                </FormMessage>
              )}
            </form>
          </Form>

          <div className="relative">
            <Button
              onClick={() => signIn("google")}
              className="w-full my-0 border border-primary-purple text-black bg-gray-bg rounded-2xl px-5 py-3   mt-3 hover:bg-white duration-200"
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
          Already have an account?{" "}
          <Link href="sign-in" className="underline text-primary-purple">
            Sign in
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
