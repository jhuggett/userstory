import { useCMS } from "tinacms";

export default function Login() {
  const cms = useCMS();

  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
}