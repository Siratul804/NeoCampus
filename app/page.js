// import { useUser } from "@clerk/nextjs";
import { SidebarPage } from "@/components/Sidebar";
import Dashboard from "./(main)/Dashboard/page";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  // const { user: clerkUser, isLoaded } = useUser();

  // console.log(clerkUser?.id);
  // console.log(clerkUser?.imageUrl);

  return (
    <div>
      {/* <div className="flex h-screen bg-[#e5e7eb]">
        <SidebarPage />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
        </div>
      </div> */}
    </div>
  );
}
