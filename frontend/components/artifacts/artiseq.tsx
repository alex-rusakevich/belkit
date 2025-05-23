import Article, { IArticle } from "./article";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getDictionary } from "@/lang/dictionary";
import Translators from "./translators";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import Example, { IExample } from "./example";
import { Badge } from "../ui/badge";
import { useRouter } from 'next/navigation'
import { Search } from "lucide-react";

interface IArtiseq {
    query: string;
}

interface ILemmaData {
    result: string[];
}

const Artiseq = ({ query }: IArtiseq) => {
    const dictionary = getDictionary();
    const router = useRouter();

    const { isPending: isExactArticlePending, data: articleData } = useQuery({
        queryKey: ['article', query],
        queryFn: () =>
            fetch(`/api/dictionary/articles/?query=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    const { isPending: arePossibleResultsPending, data: possibleResultsData } = useQuery({
        queryKey: ['possible', query],
        queryFn: () =>
            fetch(`/api/dictionary/fullTextSearch/?query=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    const { isPending: areLemmasPending, data: lemmaData } = useQuery({
        queryKey: ['word', query],
        queryFn: () =>
            fetch(`/api/utils/lemmatizer/lemmas/?word=${encodeURIComponent(query)}`).then((res) =>
                res.json(),
            ),
    })

    // function isNothingFound() {
    //     return !isArticlesPending && (articleData as IArticle[])?.length == 0
    //         && !isExamplesPending && (exampleData as IExample[])?.length == 0
    // }

    function isNoArticle() {
        return !isExactArticlePending && (articleData as IArticle[])?.length == 0
    }

    return (
        <div className="flex flex-col justify-center space-y-5 items-center [&_h2]:font-bold">
            {isNoArticle() && <Card className='w-full max-w-2xl'>
                <CardHeader>
                    <CardTitle className="flex align-middle">
                        <span>{dictionary.nothingFound} 😔</span>
                    </CardTitle>

                    <CardDescription className="flex flex-col gap-1">
                        {areLemmasPending ? (<Skeleton className="rounded-xl h-[28px] w-full max-w-2xl" />) : (<div className="py-1">
                            {lemmaData && (lemmaData as ILemmaData).result.map(lemma => lemma.toLowerCase() != query.trim().toLowerCase() && (
                                <Badge variant="secondary" key={"lemma-" + lemma} className="cursor-pointer" onClick={() => { router.push(`/search/${lemma}/`) }}>
                                    <Search className="h-[16px] w-[16px] pr-1" />
                                    <span>{lemma}</span>
                                </Badge>
                            ))}
                        </div>)}

                        <p>{dictionary.nothingFoundAdvice}</p>
                        <p>{dictionary.youAlsoCanAdd}</p>
                    </CardDescription>
                </CardHeader>
            </Card>}

            {isExactArticlePending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                articleData && (articleData as IArticle[])?.length > 0 && (
                    <>
                        {(articleData as IArticle[]).map(article => (
                            <React.Fragment key={"article-" + article.id}>
                                <Article id={article.id} title={article.title}
                                    pronunciation={article.pronunciation} body={article.body} />
                            </React.Fragment>
                        ))}
                    </>
                )
            )}

            {arePossibleResultsPending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                possibleResultsData && (possibleResultsData.articles as IArticle[])?.length > 0 && (
                    <>
                        <h2>{dictionary.inOtherArticles}</h2>

                        {(possibleResultsData.articles as IArticle[]).map(article => (
                            <React.Fragment key={"article-" + article.id}>
                                <Article id={article.id} title={article.title}
                                    pronunciation={article.pronunciation} body={article.body} />
                            </React.Fragment>
                        ))}
                    </>
                )
            )}

            {arePossibleResultsPending ? (<Skeleton className="rounded-xl h-[200px] w-full max-w-2xl" />) : (
                possibleResultsData && (possibleResultsData.examples as IExample[])?.length > 0 && (
                    <>
                        <h2>{dictionary.examples}</h2>

                        {(possibleResultsData.examples as IExample[]).map(example => (
                            <React.Fragment key={"example-" + example.id}>
                                <Example id={example.id} body_be={example.body_be} body_zh={example.body_zh} />
                            </React.Fragment>
                        ))}
                    </>
                )
            )}

            <Translators query={query} />
        </div>)
}

export default Artiseq
