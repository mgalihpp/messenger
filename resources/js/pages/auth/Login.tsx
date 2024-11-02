import Checkbox from "@/components/Checkbox";
import FormAlertStatus from "@/components/FormAlertStatus";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { Input } from "@/components/ui/input";
import GuestLayout from "@/layouts/GuestLayout";
import { LoginSchema } from "@/types/user";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeClosed } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
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
    <GuestLayout>
      <Head title="Log in" />

      {status && <FormAlertStatus status={status} />}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <Input
            variant="form_login"
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Password" />

          <div className="relative">
            <Input
              variant="form_login"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="ms-2 text-sm text-foreground">Remember me</span>
          </label>

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
    </GuestLayout>
  );
}
