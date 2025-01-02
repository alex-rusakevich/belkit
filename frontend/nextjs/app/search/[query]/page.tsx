'use client'

import Article from "@/components/main/article";
import SearchPanel from "@/components/main/searchPanel";
import { useParams } from 'next/navigation'


const articleTitle = '你好'
const articlePronun = 'nǐ hǎo'
const articleMd = `

1. *наз.* прывітанне

1. *дз.* вітаю

1. *праст.* прывет

`.trim();


export default function Home() {
  const { query } = useParams()

  return (
    <>
      <header className="mb-5">
        <div className="flex justify-center">
          <SearchPanel initialValue={decodeURIComponent(query as string)} />
        </div>
      </header>

      <main className="">
        <div className="flex flex-col justify-center space-y-5 items-center">
          <Article title={articleTitle} pronunciation={articlePronun} mdText={articleMd}></Article>
          <Article title={articleTitle} pronunciation={articlePronun} mdText={articleMd}></Article>
          <Article title={articleTitle} pronunciation={articlePronun} mdText={articleMd}></Article>
        </div>
      </main>
    </>
  );
}
