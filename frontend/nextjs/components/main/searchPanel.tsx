import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getDictionary } from "@/lang/dictionary";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ChartColumnIncreasing, CirclePlus, House, List, Info } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { cn } from "@/lib/utils"


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
    const dictionary = getDictionary();

    return (<NavigationMenu className="
        rounded-xl border shadow w-full 
        max-w-2xl justify-start p-[4px]
        first:[&_svg]:pr-2">
        <ScrollArea className="overflow-x-auto">
            <NavigationMenuList className="justify-start mx-auto">
                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <House />
                            <span>{dictionary.mainPage}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <CirclePlus />
                            <span>{dictionary.addPage}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <ChartColumnIncreasing />
                            <span>{dictionary.stats}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <List />
                            <span>{dictionary.additionalUtils}</span>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="#" legacyBehavior passHref>
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

const SearchPanel = () => {
    const dictionary = getDictionary();

    return (
        <div className="flex flex-col space-y-2 w-full max-w-2xl">
            <div className="p-3 w-full rounded-xl border shadow mb-3">
                <h1 className="font-bold pb-2 text-center">{dictionary.fullName}</h1>

                <div className="flex items-center space-x-2">
                    <Input type="text" placeholder={dictionary.whatDoYouSearch} className="" />
                    <Button type="submit" className="">{dictionary.search}</Button>
                </div>
            </div>
            <SearchPanelMenu />
        </div>);
}

export default SearchPanel;
