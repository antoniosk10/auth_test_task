import AuthForm from "../components/AuthForm";
import { useSession } from "next-auth/react";
import Welcome from "../components/Welcome";

export default function Home() {
  const { data, status } = useSession();

  return (
    <>
      {status == "authenticated" ? (
        <Welcome email={data?.user?.email} />
      ) : (
        <AuthForm />
      )}
    </>
  );
}
