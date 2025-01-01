import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDictionary } from "@/lang/dictionary";

const SearchPanel = () => {
    const dictionary = getDictionary();

    return (<div className="p-3 w-full max-w-2xl rounded-xl border shadow mb-3">
        <h1 className="font-bold pb-2 text-center">{dictionary.fullName}</h1>

        <div className="flex items-center space-x-2">
            <Input type="text" placeholder={dictionary.whatDoYouSearch} className="" />
            <Button type="submit" className="">{dictionary.search}</Button>
        </div>
    </div>);
}

export default SearchPanel;
