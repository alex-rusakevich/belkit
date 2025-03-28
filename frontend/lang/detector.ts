const zhCharRegex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]+/
const beCharRegex = /[абвгдеёжзіклмнопрстуўфхцчшыьэюяАБВГДЕЁЖЗІКЛМНОПРСТУЎФХЦЧШЫЬЭЮЯ]+/

function detectLanguage(text: string): 'be' | 'zh' | 'unknown' {
    if (zhCharRegex.test(text)) return 'zh'
    if (beCharRegex.test(text)) return 'be'
    return 'unknown'
}

export { detectLanguage };
