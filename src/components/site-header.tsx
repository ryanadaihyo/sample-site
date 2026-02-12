"use client"

import * as React from "react"
import Link from "next/link"
import { Database, Film, Disc, Search as SearchIcon, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 md:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0 mr-6">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                        <Database className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        Culture DB
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 flex-1">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="h-9 bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50">
                                    探す
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[420px] gap-3 p-4 md:w-[520px] md:grid-cols-[240px_1fr] lg:w-[600px] lg:grid-cols-[260px_1fr]">
                                        <li className="row-span-2">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    className="flex h-full min-h-[180px] w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-muted p-6 no-underline outline-none ring-offset-background transition-all duration-200 hover:bg-accent/50 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                    href="/"
                                                >
                                                    <div className="mb-2 mt-4 flex items-center gap-2 text-lg font-semibold">
                                                        <Database className="h-5 w-5 text-primary" />
                                                        Culture DB
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        最高の映画や音楽を見つけよう。
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/movies" title="映画" icon={<Film className="h-4 w-4" />}>
                                            人気の映画や隠れた名作を探索。
                                        </ListItem>
                                        <ListItem href="/music" title="音楽" icon={<Disc className="h-4 w-4" />}>
                                            アルバム、アーティスト、楽曲。
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/about"
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "h-9 bg-transparent hover:bg-accent/50"
                                        )}
                                    >
                                        About
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Search Button - Desktop */}
                <div className="hidden md:flex items-center ml-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50"
                        asChild
                    >
                        <Link href="/" aria-label="検索">
                            <SearchIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden items-center gap-2 ml-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50"
                        asChild
                    >
                        <Link href="/" aria-label="検索">
                            <SearchIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="h-9 bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50">
                                    <Menu className="h-4 w-4" />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="right-0">
                                    <ul className="grid w-[300px] gap-2 p-4">
                                        <ListItem href="/movies" title="映画" icon={<Film className="h-4 w-4" />}>
                                            人気の映画や隠れた名作
                                        </ListItem>
                                        <ListItem href="/music" title="音楽" icon={<Disc className="h-4 w-4" />}>
                                            アルバム、アーティスト、楽曲
                                        </ListItem>
                                        <ListItem href="/about" title="About" icon={<Database className="h-4 w-4" />}>
                                            サイトについて
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none mb-1">
                        {icon && <span className="text-primary">{icon}</span>}
                        <span>{title}</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
