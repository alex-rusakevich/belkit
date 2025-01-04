import { detectLanguage } from "@/lang/detector";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";

interface ITranslators {
    className?: string;
    query: string;
}

const Translators = ({ className = '', query }: ITranslators) => {
    const router = useRouter()
    const lang = detectLanguage(query)
    let lang_from: string, lang_to: string

    if (lang == 'be' || lang == 'unknown') {
        lang_from = 'be'
        lang_to = 'zh'
    } else {
        lang_from = 'zh'
        lang_to = 'be'
    }

    return (<div className={'grid gap-3 md:grid-cols-3 w-full max-w-2xl [&_button]:shadow' + ' ' + className}>
        <Button variant="outline" onClick={() => {
            router.push(`https://translate.yandex.com/?source_lang=${lang_from}&target_lang=${lang_to}&text=${query}`)
            return
        }}>
            <Languages />
            <span>Yandex Translate</span>
        </Button>

        <Button variant="outline" onClick={() => {
            if (lang_from == 'zh') lang_from = 'zh-CN'
            if (lang_to == 'zh') lang_to = 'zh-CN'

            router.push(`https://translate.google.com/?sl=${lang_from}&tl=${lang_to}&text=${query}&op=translate`)
            return
        }}>
            <Languages />
            <span>Google Translate</span>
        </Button>

        <Button variant="outline" onClick={() => {
            if (lang_from == 'be') lang_from = 'bel'
            if (lang_to == 'be') lang_to = 'bel'

            router.push(`https://fanyi.baidu.com/mtpe-individual/multimodal#/${lang_from}/${lang_to}/${query}`)
            return
        }}>
            <Languages />
            <span>Baidu Fanyi</span>
        </Button>
    </div>)
}

export default Translators
