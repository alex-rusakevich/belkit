'use client'

import Artiseq from "@/components/artifacts/artiseq";
import SearchPanel from "@/components/main/activityPanel";
import { useParams, useRouter } from 'next/navigation'


export default function Home() {
  const { query } = useParams()
  const router = useRouter()

  if (!query) {
    router.push("/")
    return
  }

  if ((query as string).trim() == '') {
    router.push("/")
    return
  }

  return (
    <>
      <header className="mb-5">
        <div className="flex justify-center">
          <SearchPanel initialValue={decodeURIComponent(query as string)} />
        </div>
      </header>

      <main className="mb-5">
        <Artiseq query={query as string} />
      </main >
    </>
  );
}
