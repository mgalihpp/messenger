import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { LoginSchema } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Link, useForm } from "@inertiajs/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState, FormEventHandler } from "react";
import Navbar from "./partials/Navbar";

export default function Welcome({
  canResetPassword,
  appName,
}: {
  canResetPassword: boolean;
  appName: string;
}) {
  const { data, setData, post, processing, errors, reset } =
    useForm<LoginSchema>({
      email: "",
      password: "",
      remember: false,
    });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-12 p-8 font-['Inter'] text-foreground">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="space-y-6 sm:w-11/12 sm:space-y-12">
          <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
              Hang out
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
              anytime,
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
              &nbsp; anywhere
            </span>
          </h1>

          <p className="text-lg sm:text-xl">
            Messenger makes it easy and fun to stay close to your favorite
            people.
          </p>

          <form onSubmit={submit} className="flex flex-col gap-4 lg:w-3/4">
            <div>
              <Input
                variant="form_login"
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full bg-muted"
                autoComplete="username"
                autoFocus
                placeholder="Enter your email address"
                onChange={(e) => setData("email", e.target.value)}
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
              <div className="relative">
                <Input
                  variant="form_login"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full bg-muted"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3.5"
                >
                  {showPassword ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeClosed className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              {canResetPassword && (
                <Link href={route("password.request")} className="btn btn-link">
                  Forgot your password?
                </Link>
              )}
            </div>

            <div className="flex">
              <PrimaryButton className="w-full" disabled={processing}>
                Log in
              </PrimaryButton>
            </div>

            <div className="flex justify-center">
              <Link href={route("register")} className="btn btn-link">
                Don't have an account?
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-12 items-center justify-center sm:flex">
          <img src="/images/vector.png" alt="vector" />
        </div>
      </div>

      <div className="mt-auto flex gap-2 sm:justify-center">
        <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-sm font-medium text-transparent">
          &copy; {appName} {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}
