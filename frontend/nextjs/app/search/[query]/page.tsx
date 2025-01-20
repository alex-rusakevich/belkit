import SearchPage from "@/components/main/searchPage";


type Props = {
  params: { query: string }
}


export function generateMetadata({ params }: Props) {
  const { query } = params;
  const word = decodeURIComponent(query);

  return {
    title: `${word} | Белкіт — беларуска-кітайскі слоўнік`,
    description: `Слова "${word}", пераклад, значэнне. Пераклад з кітайскай на беларускую, з беларускай на кітайскую`,
  };
}


export default function Home() {
  return (<SearchPage />);
}
