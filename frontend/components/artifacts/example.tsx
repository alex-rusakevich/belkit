
import { Card, CardContent } from '../ui/card';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


interface IExample {
    id: number;
    body_be: string;
    body_zh: string;
}


const Example = function ({ id, body_be, body_zh }: IExample) {
    return (<Card className='w-full max-w-2xl'>
        <Link className='float-right m-6' href={`/admin/dictionary/example/${id}/change/`}>
            <Pencil width={24} height={24} />
        </Link>

        <CardContent className='pt-6 pr-0 flex flex-col gap-2 [&_span.query-found]:text-green-600'>
            <p dangerouslySetInnerHTML={{ __html: body_zh }}></p>
            <p dangerouslySetInnerHTML={{ __html: body_be }}></p>
        </CardContent>
    </Card>)
}

export default Example;
export type { IExample };
