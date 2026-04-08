"use client";

import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { GithubIcon, GoogleIcon } from "../icons";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SocialProvider = "google" | "github";

export default function SignupForm() {
  const router = useRouter();
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: { username: "", email: "", password: "" },
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.username,
          email: value.email,
          password: value.password,
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {
            setIsLoading(true);
          },
          onSuccess: (ctx) => {
            setIsLoading(false);
            toast.success("Account created successfully!");
            router.push("/");
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Registration failed.");
          },
        },
      );
    },
  });

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="bg-[#121212] border-[#262626] w-full max-w-110 text-white">
        <CardHeader className="space-y-4 pt-4 text-center">
          <Image
            src={"/logo.png"}
            className="mx-auto w-10 h-10"
            height={40}
            width={40}
            alt="ConversionGPT"
          />
          <CardTitle className="font-semibold text-[#ececec] text-[32px] tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="mx-auto max-w-80 text-[#b4b4b4] text-[15px] leading-relaxed">
            Join ConversionGPT to get smarter responses and start building
            today.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 px-10">
          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            {/* Google Button */}
            <Button
              variant="outline"
              disabled={false}
              className="bg-transparent hover:bg-[#2f2f2f] disabled:opacity-70 border-[#424242] rounded-xl w-full h-13 font-normal text-[15px] hover:text-white transition-colors"
              onClick={() => {}}
            >
              {pendingProvider === "google" ? (
                <Loader2 className="mr-2 size-5 animate-spin" />
              ) : (
                <GoogleIcon className="mr-2 size-5" />
              )}
              Continue with Google
            </Button>

            {/* GitHub Button */}
            <Button
              variant="outline"
              disabled={false}
              className="bg-transparent hover:bg-[#2f2f2f] disabled:opacity-70 border-[#424242] rounded-xl w-full h-13 font-normal text-[15px] hover:text-white transition-colors"
              onClick={() => {}}
            >
              {pendingProvider === "github" ? (
                <Loader2 className="mr-2 size-5 animate-spin" />
              ) : (
                <GithubIcon className="mr-2 size-5" />
              )}
              Continue with GitHub
            </Button>
          </div>

          <div className="relative flex justify-center items-center my-4">
            <div className="absolute border-[#333] border-t w-full"></div>
            <span className="relative bg-[#121212] px-3 font-medium text-[#888] text-[11px] uppercase tracking-widest">
              OR
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="flex flex-col gap-1">
              {/* Username Field */}
              <form.Field
                name="username"
                children={(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="flex flex-col">
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Username"
                        className={cn(
                          "bg-transparent px-4 border-[#424242] rounded-xl focus:ring-0 h-13 text-base transition-colors",
                          hasError
                            ? "border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      <div className="px-1 py-0.5 min-h-5">
                        {hasError && (
                          <FieldError
                            className="slide-in-from-top-1 text-red-500 text-xs animate-in duration-200 fade-in"
                            errors={field.state.meta.errors}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
              />

              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="flex flex-col">
                      <Input
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Email address"
                        className={cn(
                          "bg-transparent px-4 border-[#424242] rounded-xl focus:ring-0 h-13 text-base transition-colors",
                          hasError
                            ? "border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      <div className="px-1 py-0.5 min-h-5">
                        {hasError && (
                          <FieldError
                            className="slide-in-from-top-1 text-red-500 text-xs animate-in duration-200 fade-in"
                            errors={field.state.meta.errors}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => {
                  const hasError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;
                  return (
                    <div className="flex flex-col">
                      <Input
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Password"
                        className={cn(
                          "bg-transparent px-4 border-[#424242] rounded-xl focus:ring-0 h-13 text-base transition-colors",
                          hasError
                            ? "border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      <div className="px-1 py-0.5 min-h-5">
                        {hasError && (
                          <FieldError
                            className="slide-in-from-top-1 text-red-500 text-xs animate-in duration-200 fade-in"
                            errors={field.state.meta.errors}
                          />
                        )}
                      </div>
                    </div>
                  );
                }}
              />

              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDirty,
                ]}
                children={([canSubmit, isSubmitting, isDirty]) => (
                  <Button
                    type="submit"
                    className="bg-[#ececec] hover:bg-white disabled:opacity-50 mt-2 rounded-full w-full h-13 font-semibold text-[16px] text-black"
                    disabled={!canSubmit || !isDirty}
                  >
                    {isSubmitting || isLoading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center pb-6">
          <div className="text-[#b4b4b4] text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-white hover:underline">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// Icons (GoogleIcon, etc.) should remain as they were in the login file...
