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

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SocialProvider = "google" | "github";

export default function LoginForm() {
  const router = useRouter();
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
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
            // todo: be careful -> server side errors should not exposed here.
            toast.error(ctx.error.message || "Registration failed.");
          },
        },
      );
    },
  });

  const handleSocialLogin = async (provider: SocialProvider) => {
    setPendingProvider(provider);

    try {
      await authClient.signIn.social({
        provider: provider,
      });
    } catch (err) {
      setPendingProvider(null);
      console.error(err);
      toast.error("An unexpected error");
    }
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="bg-[#121212] border-[#262626] w-full max-w-110 text-white">
        <CardHeader className="space-y-4 pt-4 text-center">
          <Image
            src={"/logo.png"}
            className="mx-auto w-10 h-10"
            height={40}
            width={40}
            alt="CodersGPT"
          />
          <CardTitle className="font-semibold text-[#ececec] text-[32px] tracking-tight">
            Log in CodersGPT
          </CardTitle>
          <CardDescription className="mx-auto max-w-80 text-[#b4b4b4] text-[15px] leading-relaxed">
            You&apos;ll get smarter responses and can upload files, images, and
            more.
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
              onClick={() => {
                handleSocialLogin("google");
              }}
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
              onClick={() => {
                handleSocialLogin("github");
              }}
            >
              {pendingProvider === "github" ? (
                <Loader2 className="mr-2 size-5 animate-spin" />
              ) : (
                <GithubIcon className="mr-2 size-5" />
              )}
              Continue with GitHub
            </Button>
          </div>

          <div className="relative flex justify-center items-center my-6">
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
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        placeholder="Email address"
                        className={cn(
                          "bg-transparent px-4 border-[#424242] rounded-xl focus:ring-0 h-13 placeholder:text-[#676767] text-base transition-colors",
                          hasError
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      {/* Reserved space for error to prevent layout shift */}
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
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className={cn(
                          "bg-transparent px-4 border-[#424242] rounded-xl focus:ring-0 h-13 placeholder:text-[#676767] text-base transition-colors",
                          hasError
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#676767]",
                        )}
                      />
                      {/* Reserved space for error to prevent layout shift */}
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

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDirty,
                ]}
                children={([canSubmit, isSubmitting, isDirty]) => (
                  <Button
                    type="submit"
                    className="bg-[#ececec] hover:bg-white disabled:hover:bg-[#ececec] disabled:opacity-50 mt-2 rounded-full w-full h-13 font-semibold text-[16px] text-black active:scale-[0.98] disabled:cursor-not-allowed"
                    disabled={!canSubmit || !isDirty}
                  >
                    {isSubmitting || isLoading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center pb-4">
          <div className="text-[#b4b4b4] text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
