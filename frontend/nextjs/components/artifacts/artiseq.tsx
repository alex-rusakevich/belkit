import { useEffect, useState } from "react";
import Article, { IArticle } from "./article";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getDictionary } from "@/lang/dictionary";
import Translators from "./translators";

interface IArtiseq {
    query: string;
}

const Artiseq = ({ query }: IArtiseq) => {
    const [articleData, setArticleData] = useState(null);
    const dictionary = getDictionary();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/dictionary/articles/?query=${query}`);
            const result = await res.json();
            setArticleData(result);
        };

        fetchData();
    }, [query]);

    return (
        <div className="flex flex-col justify-center space-y-5 items-center">
            {articleData && (articleData as IArticle[])?.length > 0 ? (articleData as IArticle[]).map(article => (
                <React.Fragment key="">
                    <Article title={article.title} pronunciation={article.pronunciation} body={article.body} />
                </React.Fragment>
            )) : <Card className='w-full max-w-2xl'>
                <CardHeader>
                    <CardTitle className="flex align-middle">
                        <span>{dictionary.nothingFound} 😔</span>
                    </CardTitle>
                    <CardDescription>{dictionary.nothingFoundAdvice}</CardDescription>
                </CardHeader>
            </Card>}

            <Translators query={query} />
        </div>)
}

export default Artiseq
