"use client"

import Artiseq from "@/components/artifacts/artiseq";
import SearchPanel from "@/components/main/activityPanel";
import { useParams, useRouter } from 'next/navigation'


export default function SearchPage() {
    let { query } = useParams()
    const router = useRouter()

    if (!query) {
        router.push("/")
        return
    }

    if ((query as string).trim() == '') {
        router.push("/")
        return
    }

    query = decodeURIComponent(query as string)

    return (
        <>
            <header className="mb-5">
                <div className="flex justify-center">
                    <SearchPanel initialValue={query} />
                </div>
            </header>

            <main className="mb-5">
                <Artiseq query={query} />
            </main >
        </>
    );
}