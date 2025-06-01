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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { userAtom } from "~/lib/auth";
import { signUp } from "~/server/actions/create-user";
import { USER_ROLES, userRoleSchema } from "~/server/db/schema";

const CREATOR_INVITE_CODE = "FRIDAY2024";

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    role: userRoleSchema,
    inviteCode: z.string().optional(),
    bio: z.string().optional(),
    socialLinks: z
      .object({
        instagram: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showCreatorFields, setShowCreatorFields] = useState(false);
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

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "TRAVELER",
      bio: "",
      socialLinks: {
        instagram: "",
        youtube: "",
      },
    },
  });

  async function onSubmit(data: SignUpValues) {
    try {
      if (data.role === "CREATOR" && data.inviteCode !== CREATOR_INVITE_CODE) {
        toast.error("Invalid creator invite code");
        return;
      }

      const result = await signUp(data);

      if (result.error || !result.user) {
        toast.error(result.error);
      } else {
        toast.success("Account created successfully!");
        setStoredUser({
          email: data.email,
          name: data.name,
          role: data.role,
          id: result.user.id,
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center border-2">
        <div className="flex w-full max-w-[450px] flex-col items-center justify-center border-2">
          <Navbar />
          <div className="flex h-[calc(100vh-4rem)] w-[90%] items-center justify-center">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Create an account
                </CardTitle>
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>I am a</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setShowCreatorFields(value === "CREATOR");
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {USER_ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role.charAt(0) + role.slice(1).toLowerCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showCreatorFields && (
                      <>
                        <FormField
                          control={form.control}
                          name="inviteCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Creator Invite Code</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter invite code"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Tell us about yourself"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="socialLinks.instagram"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instagram Handle</FormLabel>
                              <FormControl>
                                <Input placeholder="@username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="socialLinks.youtube"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>YouTube Handle</FormLabel>
                              <FormControl>
                                <Input placeholder="@username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <Button type="submit" className="w-full">
                      Sign Up
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
