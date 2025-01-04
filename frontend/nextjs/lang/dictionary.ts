import be from './dictionaries/be.json';

interface IDictionary {
    title: string;
    description: string;
    whatDoYouSearch: string;
    search: string;
    fullName: string;
    mainPage: string;
    addPage: string;
    stats: string;
    download: string;
    additionalUtils: string;
    signIn: string;
    aboutUs: string;
    nothingFound: string;
    nothingFoundAdvice: string;
    utils: {
        pinyinNumToTone: string;
        pinyinNumToToneDesc: string;
    }
}

const dictionaries: { [key: string]: IDictionary } = {
    "be": be
}

const defaultLanguage = 'be';

function getDictionary(lang: string = defaultLanguage): IDictionary {
    if (lang in dictionaries) {
        return dictionaries[lang];
    } else {
        return dictionaries[defaultLanguage];
    }
}

export { getDictionary };
