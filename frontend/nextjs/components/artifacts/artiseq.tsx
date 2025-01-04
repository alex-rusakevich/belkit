
import Article, { IArticle } from "./article";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getDictionary } from "@/lang/dictionary";
import Translators from "./translators";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"

interface IArtiseq {
    query: string;
}

const Artiseq = ({ query }: IArtiseq) => {
    const dictionary = getDictionary();

    const { isPending, data } = useQuery({
        queryKey: [],
        queryFn: () =>
            fetch(`/api/dictionary/articles/?query=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    return (
        <div className="flex flex-col justify-center space-y-5 items-center">
            {isPending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                data && (data as IArticle[])?.length > 0 ? (data as IArticle[]).map(article => (
                    <React.Fragment key="">
                        <Article id={article.id} title={article.title}
                            pronunciation={article.pronunciation} body={article.body} />
                    </React.Fragment>
                )) : <Card className='w-full max-w-2xl'>
                    <CardHeader>
                        <CardTitle className="flex align-middle">
                            <span>{dictionary.nothingFound} 😔</span>
                        </CardTitle>

                        <CardDescription className="flex flex-col gap-1">
                            <p>{dictionary.nothingFoundAdvice}</p>
                            <p>{dictionary.youAlsoCanAdd}</p>
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}

            <Translators query={query} />
        </div>)
}

export default Artiseq
