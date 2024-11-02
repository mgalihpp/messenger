import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import { Input } from "@/components/ui/input";
import GuestLayout from "@/layouts/GuestLayout";
import { RegisterUserSchema } from "@/types/user";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeClosed } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } =
    useForm<RegisterUserSchema>({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit} className="space-y-4">
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <Input
            variant="form_login"
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            autoFocus
            onChange={(e) => setData("name", e.target.value)}
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

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
              autoComplete="new-password"
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

        <div>
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <Input
            variant="form_login"
            id="password_confirmation"
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
            Register
          </PrimaryButton>
        </div>

        <div className="flex justify-center">
          <Link href={route("login")} className="btn btn-link">
            Already registered?
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
