// import { remark } from 'remark';
// import html from 'remark-html';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';


interface IArticle {
    id: number;
    title: string;
    pronunciation?: string;
    body: string
}


const Article = function ({ id, title, pronunciation = '', body }: IArticle) {
    // const processedContent = remark()
    //     .use(html)
    //     .processSync(body);

    // const contentHtml = processedContent.toString()
    //     .replaceAll(/\[label\]/g, '<span class="article-label">')
    //     .replaceAll(/\[example\]/g, '<span class="article-example">')
    //     .replaceAll(/\[\/label\]|\[\/example\]/g, '</span>');

    return (<Card className='w-full max-w-2xl'>

        <Link className='float-right m-6' href={`/admin/dictionary/article/${id}/change/`}>
            <Pencil width={24} height={24} />
        </Link>

        <CardHeader>
            <CardTitle dangerouslySetInnerHTML={{ __html: title }}></CardTitle>
            {pronunciation ? <CardDescription dangerouslySetInnerHTML={{ __html: pronunciation }}></CardDescription> : null}
        </CardHeader>
        <CardContent>
            <div className={`
                [&_ol]:list-decimal
                [&_ol]:pl-5
                [&_span.article-example]:text-gray-600
                [&_span.article-label]:text-green-600
                [&_span.article-label]:italic
                [&_span.query-found]:text-green-600
                `} dangerouslySetInnerHTML={{ __html: body }} />
        </CardContent>
    </Card>)
}

export default Article;
export type { IArticle };
