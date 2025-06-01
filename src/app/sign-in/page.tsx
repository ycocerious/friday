"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Navbar } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { userAtom } from "~/lib/auth";
import { signIn } from "~/server/actions/sign-in";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && storedUser) {
      router.push("/");
    }
  }, [isClient, storedUser, router]);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValues) {
    try {
      const result = await signIn(data);

      if (result.error || !result.user) {
        toast.error(result.error);
      } else {
        toast.success("Successfully signed in!");
        setStoredUser({
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          id: result.user.id,
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center border-2">
        <div className="flex w-full max-w-[26rem] flex-col items-center justify-center border-2">
          <Navbar />
          <div className="flex h-[calc(100vh-4rem)] w-[90%] items-center justify-center">
            <Card className="w-full max-w-lg border">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
