'use client'

import SearchPanel from "@/components/main/activityPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getDictionary } from "@/lang/dictionary";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export default function Home() {
    const dictionary = getDictionary();
    const [dataIn, setDataIn] = React.useState("")

    const { data, refetch } = useQuery({
        queryKey: [],
        queryFn: () =>
            fetch(`/api/utils/pinyin_num_to_tone?text=${encodeURIComponent(dataIn)}`).then((res) =>
                res.json(),
            ),
        refetchOnWindowFocus: false,
        enabled: false
    })

    return (
        <>
            <header className="mb-5">
                <div className="flex justify-center">
                    <SearchPanel />
                </div>
            </header>

            <main className="mb-5 justify-center flex">
                <Card className="grid w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>{dictionary.utils.pinyinNumToTone}</CardTitle>
                        <CardDescription>{dictionary.utils.pinyinNumToToneDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="gap-2 flex flex-col">
                        <Textarea placeholder={dictionary.yourText} onChange={e => setDataIn(e.target.value)} />
                        <Button onClick={() => {
                            refetch();
                        }}>{dictionary.transform}</Button>
                        <Textarea className="" placeholder={dictionary.yourResult} readOnly={true} value={data ? data.value : ''} />
                    </CardContent>
                </Card>
            </main >
        </>
    );
}
