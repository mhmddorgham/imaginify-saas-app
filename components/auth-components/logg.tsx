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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  // .max(20, {
  //   message: "Password must be at most 20 characters",
  // })
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message:
  //     "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  // }),
});

type FormFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
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
          <div className="grid gap-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-pink-primary duration-100 outline-none placeholder:text-gray-400"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
            />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              className="border-gray-300 !rounded-[10px] !min-h-11 focus:border-pink-primary duration-100 outline-none placeholder:text-gray-400"
              id="password"
              type="password"
              required
              placeholder="********"
            />
          </div>
          <Button
            className="w-full my-0 bg-pink-primary rounded-2xl px-5 py-3 text-white  hover:bg-pink-secondary duration-200   "
            type="submit"
          >
            Login
          </Button>
          <Link
            href="#"
            className="ml-auto inline-block text-sm underline  text-pink-primary"
          >
            Forgot your password?
          </Link>
          <Button
            className="w-full my-0 border border-pink-primary text-black bg-gray-bg rounded-2xl px-5 py-3   mt-3 hover:bg-white duration-200"
            variant="outline"
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="sign-up" className="underline text-pink-primary">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
