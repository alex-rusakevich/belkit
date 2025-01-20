
import Article, { IArticle } from "./article";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getDictionary } from "@/lang/dictionary";
import Translators from "./translators";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import Example, { IExample } from "./example";

interface IArtiseq {
    query: string;
}

const Artiseq = ({ query }: IArtiseq) => {
    const dictionary = getDictionary();

    const { isPending: isArticlesPending, data: articleData } = useQuery({
        queryKey: ['articles', query],
        queryFn: () =>
            fetch(`/api/dictionary/articles/?query=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    const { isPending: isExamplesPending, data: exampleData } = useQuery({
        queryKey: ['examples', query],
        queryFn: () =>
            fetch(`/api/dictionary/examples/?query=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    function isNothingFound() {
        return !isArticlesPending && (articleData as IArticle[])?.length == 0
            && !isExamplesPending && (exampleData as IExample[])?.length == 0
    }

    return (
        <div className="flex flex-col justify-center space-y-5 items-center [&_h2]:font-bold">
            {isArticlesPending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                articleData && (articleData as IArticle[])?.length > 0 && (
                    <>
                        <h2>Артыкулы</h2>

                        {(articleData as IArticle[]).map(article => (
                            <React.Fragment key={"article-" + article.id}>
                                <Article id={article.id} title={article.title}
                                    pronunciation={article.pronunciation} body={article.body} />
                            </React.Fragment>
                        ))}
                    </>
                )
            )}

            {isExamplesPending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                exampleData && (exampleData as IExample[])?.length > 0 && (
                    <>
                        <h2>Прыклады</h2>

                        {(exampleData as IExample[]).map(example => (
                            <React.Fragment key="">
                                <Example id={example.id} body_be={example.body_be} body_zh={example.body_zh} query={decodeURIComponent(query)} />
                            </React.Fragment>
                        ))}
                    </>
                )
            )}

            {isNothingFound() && <Card className='w-full max-w-2xl'>
                <CardHeader>
                    <CardTitle className="flex align-middle">
                        <span>{dictionary.nothingFound} 😔</span>
                    </CardTitle>

                    <CardDescription className="flex flex-col gap-1">
                        <p>{dictionary.nothingFoundAdvice}</p>
                        <p>{dictionary.youAlsoCanAdd}</p>
                    </CardDescription>
                </CardHeader>
            </Card>}

            <Translators query={query} />
        </div>)
}

export default Artiseq
