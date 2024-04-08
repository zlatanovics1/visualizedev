import UpdateCredsForm from "./UpdateCredForm";

export default function SettingsAuthForm() {
  return (
    <div className="md:ml-8 space-y-12">
      <UpdateCredsForm type="email" standAlone={false} />
      <UpdateCredsForm type="password" standAlone={false} />
    </div>
  );
}
