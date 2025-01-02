import { remark } from 'remark';
import html from 'remark-html';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';


interface IArticle {
    title: string;
    pronunciation?: string;
    mdText: string
}


const Article = function ({ title, pronunciation = '', mdText }: IArticle) {
    const processedContent = remark()
        .use(html)
        .processSync(mdText);

    const contentHtml = processedContent.toString();

    return (<Card className='w-full max-w-2xl'>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {pronunciation ? <CardDescription>{pronunciation}</CardDescription> : null}
        </CardHeader>
        <CardContent>
            <div className='' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </CardContent>
    </Card>)
}

export default Article;
