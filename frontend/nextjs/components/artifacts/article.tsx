import { remark } from 'remark';
import html from 'remark-html';
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
    const processedContent = remark()
        .use(html)
        .processSync(body);

    const contentHtml = processedContent.toString()
        .replaceAll('[green]', '<span style="color: green">')
        .replaceAll(/\[gr[ae]y\]/g, '<span style="color: gray">')
        .replaceAll(/\[\/green\]|\[\/gr[ae]y\]/g, '</span>');

    return (<Card className='w-full max-w-2xl'>

        <Link className='float-right m-6' href={`/admin/dictionary/article/${id}/change/`}>
            <Pencil width={24} height={24} />
        </Link>

        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {pronunciation ? <CardDescription>{pronunciation}</CardDescription> : null}
        </CardHeader>
        <CardContent>
            <div className='[&_ol]:list-decimal [&_ol]:pl-5' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </CardContent>
    </Card>)
}

export default Article;
export type { IArticle };
