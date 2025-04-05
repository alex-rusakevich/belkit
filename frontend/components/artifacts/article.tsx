import dsl_to_html from '@/utils/dsl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import "./dsl.css"


interface IArticle {
    id: number;
    title: string;
    pronunciation?: string;
    body: string
}


const Article = function ({ id, title, pronunciation = '', body }: IArticle) {
    body = dsl_to_html(body)

    return (<Card className='w-full max-w-2xl'>

        <Link className='float-right m-6' href={`/admin/dictionary/article/${id}/change/`}>
            <Pencil width={24} height={24} />
        </Link>

        <CardHeader>
            <CardTitle dangerouslySetInnerHTML={{ __html: title }}></CardTitle>
            {pronunciation && pronunciation != "None" ? <CardDescription dangerouslySetInnerHTML={{ __html: pronunciation }}></CardDescription> : ""}
        </CardHeader>
        <CardContent>
            <div className={`
                [&_ol]:list-decimal
                [&_ol]:pl-5
                [&_span.article-example]:text-gray-600
                [&_span.article-label]:text-green-600
                [&_span.article-label]:italic
                [&_span.query-found]:text-green-600
                [&_a]:text-blue-400
                [&_a]:underline
                [&_a:hover]:text-blue-600
                `} dangerouslySetInnerHTML={{ __html: body }} />
        </CardContent>
    </Card>)
}

export default Article;
export type { IArticle };
