// import { useUser } from "@clerk/nextjs";
import Dashboard from "./(main)/Dashboard/page";

export default function Home() {
  // const { user: clerkUser, isLoaded } = useUser();

  // console.log(clerkUser?.id);
  // console.log(clerkUser?.imageUrl);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
