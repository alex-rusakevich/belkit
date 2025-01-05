
import { Card, CardContent } from '../ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


interface IExample {
    id: number;
    body_be: string;
    body_zh: string;
    query: string;
}

interface IHighlightWord {
    id: number;
    text: string;
    query: string;
}


function escapeForRe(str: string): string {
    return JSON.stringify(str).slice(1, -1)
}


const HighlightWord = function ({ id, text, query }: IHighlightWord) {
    let number = -1

    return (<>
        {text.split(new RegExp("(" + escapeForRe(query) + ")", "gi")).map((part: string) => {
            number++
            return (<React.Fragment key={`hl-part-${id}-${number}`}>{part.toLowerCase() == query.toLowerCase() ? (<span style={{ color: 'green' }}>{part}</span>) : (<>{part}</>)}</React.Fragment>)
        })}
    </>)
}


const Example = function ({ id, body_be, body_zh, query }: IExample) {
    return (<Card className='w-full max-w-2xl'>
        <Link className='float-right m-6' href={`/admin/dictionary/example/${id}/change/`}>
            <Pencil width={24} height={24} />
        </Link>

        <CardContent className='pt-6 pr-0 flex flex-col gap-2'>
            <p><HighlightWord id={id} text={body_be} query={query}></HighlightWord></p>
            <p><HighlightWord id={id} text={body_zh} query={query}></HighlightWord></p>
        </CardContent>
    </Card>)
}

export default Example;
export type { IExample };
