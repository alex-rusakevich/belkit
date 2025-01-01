import SearchPanel from "@/components/main/search";



export default function Home() {
  return (
    <>
      <main className="h-full px-10 py-10">
        <div className="flex justify-center items-center h-full">
          <SearchPanel />
        </div>
      </main>
    </>
  );
}
