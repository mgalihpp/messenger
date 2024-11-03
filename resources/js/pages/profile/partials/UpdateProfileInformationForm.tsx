import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppContext } from "@/contexts/AppContext";
import { UpdateProfileSchema } from "@/types/user";
import { Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import { Camera } from "lucide-react";
import { ChangeEvent, FormEventHandler, useRef } from "react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = useAppContext().auth;

  const avatarRef = useRef<HTMLImageElement>(null);

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm<UpdateProfileSchema>({
      _method: "PATCH",
      name: user.name,
      email: user.email,
      avatar: null,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("profile.update"));
  };

  const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setData("avatar", files[0]);

      const imageUrl = window.URL.createObjectURL(files[0]);
      if (avatarRef.current) {
        avatarRef.current.setAttribute("src", imageUrl);
      }

      return () => {
        window.URL.revokeObjectURL(imageUrl);
      };
    }
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-foreground">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="group relative w-fit">
          <Avatar className="size-16">
            <AvatarImage ref={avatarRef} src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <label
                  htmlFor="avatar"
                  className="btn btn-primary absolute top-2 translate-x-12 rounded-full px-1 py-1"
                  tabIndex={0}
                >
                  <Camera className="size-4" />
                  <input
                    type="file"
                    onChange={changeAvatar}
                    id="avatar"
                    className="hidden"
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent className="bg-neutral-800">
                <p>Change Avatar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-foreground">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="btn px-1 underline"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-success">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-foreground">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
