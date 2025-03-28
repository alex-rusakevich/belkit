'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDictionary } from "@/lang/dictionary";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ChartColumnIncreasing, CirclePlus, House, List, Info } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { cn } from "@/lib/utils"


interface ISearchPanel {
    initialValue?: string;
}

interface IActivityPanel {
    initialValue?: string;
}

const dictionary = getDictionary();

const components: { title: string; href: string; description: string }[] = [
    {
        title: dictionary.utils.pinyinNumToTone,
        href: "/utils/pinyinNumToTone/",
        description: dictionary.utils.pinyinNumToToneDesc
    }
]


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


const SearchPanelMenu = () => {
    return (<NavigationMenu className="
        rounded-xl border shadow w-full 
        max-w-2xl justify-start p-[4px]
        first:[&_svg]:pr-2 flex-initial bg-card">
        <ScrollArea className="overflow-x-auto mx-auto">
            <NavigationMenuList className="justify-start mx-auto">
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <House />
                            <span>{dictionary.mainPage}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <CirclePlus />
                        <span>{dictionary.addPage}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid overflow-y-auto w-[300px] max-h-[200px]">
                            <ListItem
                                title={dictionary.addArticle}
                                href="/admin/dictionary/article/add/"
                            >
                            </ListItem>
                            <ListItem
                                title={dictionary.addExample}
                                href="/admin/dictionary/example/add/"
                            >
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/stats/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <ChartColumnIncreasing />
                            <span>{dictionary.stats}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <List />
                        <span>{dictionary.additionalUtils}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid overflow-y-auto w-[300px] max-h-[200px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/info/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Info />
                            <span>{dictionary.aboutUs}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <ScrollBar orientation="horizontal" className="w-full" />
        </ScrollArea>
    </NavigationMenu>
    );
}

const SearchPanel = ({ initialValue = "" }: ISearchPanel) => {
    const router = useRouter()
    const dictionary = getDictionary();

    const [searchQuery, setSearchQuery] = React.useState(initialValue)

    return (<div className="p-3 w-full rounded-xl border shadow mb-3 bg-card">
        <h1 className="font-bold pb-2 text-center">{dictionary.fullName}</h1>

        <form className="flex items-center space-x-2" onSubmit={() => {
            const query = searchQuery.trim()

            if (query == '') {
                router.push('/')
                return
            }

            router.push(`/search/${query}/`)
        }}>
            <Input type="text" placeholder={dictionary.whatDoYouSearch}
                className="" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Button type="submit" className="">{dictionary.search}</Button>
        </form>
    </div>)
}

const ActivityPanel = ({ initialValue = '' }: IActivityPanel) => {
    return (
        <div className="flex flex-col space-y-2 w-full max-w-2xl">
            <SearchPanel initialValue={initialValue} />
            <SearchPanelMenu />
        </div>);
}

export default ActivityPanel;
