"use client";
import { updateEmail, updatePassword } from "@/app/actions/settings/action";
import SaveChangesButton from "@/components/ui/SaveChangesButton";
import {
  EditEmailData,
  EditPasswordData,
  editEmailSchema,
  editPasswordSchema,
} from "@/types/form-validation-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

export default function UpdateCredsForm({
  type = "email",
  standAlone = false,
}: {
  type: "email" | "password";
  standAlone: boolean;
}) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(formData: FormData) {
    const uppercaseType = type.at(0)?.toUpperCase() + type.slice(1);
    const data = {
      [type]: formData.get(type) as string,
      [`confirm${uppercaseType}`]: formData.get(`${type} confirm`),
    };

    if (type === "email") {
      const result = editEmailSchema.safeParse(data);
      if (!result.success) {
        const validationError = result.error.format()._errors[0];
        setError(validationError);
        return;
      }
      const success =
        (await updateEmail(data as EditEmailData))?.success || true;
      if (!success) toast.error("Could not edit email");
      else toast.success("Email updated successfully");
    } else if (type === "password") {
      const result = editPasswordSchema.safeParse(data);
      if (!result.success) {
        const validationError =
          result.error.format().password?._errors[0] ||
          result.error.format()._errors[0];
        setError(validationError);
        return;
      }
      const success =
        (await updatePassword(data as EditPasswordData))?.success || true;
      if (!success) toast.error("Could not edit password");
      else toast.success("Password updated successfully");
    }
    setIsLoading(false);
  }
  return (
    <form
      className="flex flex-col gap-8"
      action={handleSubmit}
      onSubmit={() => setIsLoading(true)}
    >
      <h2 className="text-2xl font-semibold">Change {type}</h2>
      {error && <p className="translate-y-8 text-red-700">* {error}</p>}
      <label htmlFor={type} aria-label={`Change ${type}`}></label>
      <input
        type={type}
        name={type}
        id={type}
        className={`px-4 py-2 rounded-md border-2 max-w-xl bg-gray-50 text-gray-500 outline-none focus:ring-2 focus:ring-indigo-600 ${
          error && "border-red-500 focus:ring-red-500"
        }`}
        placeholder={`New ${type}`}
      />

      {/* {type === "password" && (
        <p className="-translate-y-6 text-sm text-gray-400 ml-2 max-w-96">
          Password must contain at least one uppercase character including at
          least one number
        </p>
      )} */}

      <label
        htmlFor={`${type} confirm`}
        aria-label={`Confirm new ${type}`}
      ></label>

      <input
        type={type}
        name={`${type} confirm`}
        id={`${type} confirm`}
        className={`px-4 py-2 rounded-md border-2 max-w-xl bg-gray-50 text-gray-500 outline-none focus:ring-2 focus:ring-indigo-600 ${
          error && "border-red-500 focus:ring-red-500"
        }`}
        placeholder={`Confirm new ${type}`}
      />
      <div className="max-w-xl flex flex-row-reverse items-center gap-4">
        <SaveChangesButton />
        <button
          className="px-3 py-1 rounded-md text-indigo-600 border-2 border-indigo hover:border-indigo-600 transition-all duration-300"
          type="reset"
        >
          Reset
        </button>
        {isLoading && (
          <BiLoaderAlt className="text-indigo-600 w-6 h-6 animate-spin" />
        )}
      </div>
    </form>
  );
}
