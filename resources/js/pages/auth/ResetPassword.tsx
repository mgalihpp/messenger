import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Input } from "@/components/ui/input";
import GuestLayout from "@/layouts/GuestLayout";
import { ResetPasswordSchema } from "@/types/user";
import { Head, useForm } from "@inertiajs/react";
import { Eye, EyeClosed } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const { data, setData, post, processing, errors, reset } =
    useForm<ResetPasswordSchema>({
      token: token,
      email: email,
      password: "",
      password_confirmation: "",
    });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit} className="space-y-4">
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

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

        <div>
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex">
          <PrimaryButton className="w-full" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
