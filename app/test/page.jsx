import MindAr from "@/app/components/MindAr";

function page() {
  return (
    <>
      <MindAr />
      <div>
        <h2>Embedded AR Page</h2>
        <a href="/ar.html" target="_blank" rel="noopener noreferrer">
          Open AR Page
        </a>
      </div>
    </>
  );
}

export default page;
