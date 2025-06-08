"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wine, Heart, MessageCircle, Share2, Smile, Meh, Frown, Filter, Users, UserPlus, Search } from "lucide-react"
import { Link } from "react-router-dom"
import logo from '@/images/logo.png'


export default function TimelinePage() {
    const [likedPosts, setLikedPosts] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId))
        } else {
            setLikedPosts([...likedPosts, postId])
        }
    }

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case "楽しい":
                return <Smile className="h-4 w-4 text-secondary" />
            case "リラックス":
                return <Meh className="h-4 w-4 text-blue-400" />
            case "だるい":
                return <Frown className="h-4 w-4 text-muted-foreground" />
            default:
                return <Meh className="h-4 w-4 text-muted-foreground" />
        }
    }

    const followers = [
        { name: "田中さん", avatar: "T", isFollowing: true },
        { name: "佐藤さん", avatar: "S", isFollowing: true },
        { name: "山田さん", avatar: "Y", isFollowing: false },
        { name: "鈴木さん", avatar: "鈴", isFollowing: true },
        { name: "高橋さん", avatar: "高", isFollowing: false },
    ]

    const following = followers.filter((user) => user.isFollowing)

    const allPosts = [
        {
            id: 1,
            user: {
                name: "田中さん",
                avatar: "T",
                favoriteDrink: "ビール",
                motto: "毎日が乾杯日和",
            },
            date: "2024-01-15 20:30",
            drinks: ["ビール ロング缶 2本", "ハイボール 2杯"],
            mood: "楽しい",
            alcohol: 24.5,
            comment: "今日は仕事終わりに同僚と一杯！久しぶりに話せて楽しかった😊 #仕事終わり #ビール #同僚",
            hashtags: ["仕事終わり", "ビール", "同僚"],
            likes: 12,
            comments: 3,
            image: true,
            safetyChecks: ["一気飲みしていない", "食事と一緒に飲んだ"],
            type: "friend",
        },
        {
            id: 2,
            user: {
                name: "佐藤さん",
                avatar: "S",
                favoriteDrink: "日本酒",
                motto: "和の心を大切に",
            },
            date: "2024-01-15 19:15",
            drinks: ["日本酒 2杯", "ビール ショート缶 1本"],
            mood: "リラックス",
            alcohol: 22.0,
            comment: "家で晩酌。今日買った日本酒が美味しかった！ #日本酒 #晩酌 #家飲み",
            hashtags: ["日本酒", "晩酌", "家飲み"],
            likes: 8,
            comments: 1,
            image: false,
            safetyChecks: ["一気飲みしていない"],
            type: "friend",
        },
        {
            id: 3,
            user: {
                name: "山田さん",
                avatar: "Y",
                favoriteDrink: "ワイン",
                motto: "人生は一度きり",
            },
            group: { name: "大学の友達", color: "bg-blue-500" },
            date: "2024-01-15 18:45",
            drinks: ["ワイン 3杯"],
            mood: "リラックス",
            alcohol: 20.0,
            comment: "久しぶりの同窓会！みんなと会えて嬉しかった🍷 #同窓会 #ワイン #大学",
            hashtags: ["同窓会", "ワイン", "大学"],
            likes: 15,
            comments: 5,
            image: true,
            safetyChecks: ["一気飲みしていない", "食事と一緒に飲んだ"],
            type: "group",
        },
    ]

    const filteredPosts = allPosts.filter(
        (post) =>
            searchQuery === "" ||
            post.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.hashtags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    return (
        <div className="min-h-screen dark bg-background text-foreground pb-20">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="YoiYoi Logo" className="h-6 w-6" />
                        <h1 className="text-xl font-bold">YoiYoi</h1>
                    </div>
                    <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            <main className="px-4 py-4 space-y-4">
                {/* Followers/Following Section */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">フォロー中</h3>
                            <div className="text-sm text-muted-foreground">{following.length}人</div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="w-full">
                            <div className="flex gap-3 pb-2">
                                {following.map((user, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
                                        <Avatar className="h-12 w-12 border-2 border-primary">
                                            <AvatarFallback className="bg-muted">{user.avatar}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-center">{user.name}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                    <div className="h-12 w-12 border-2 border-dashed border-muted rounded-full flex items-center justify-center">
                                        <UserPlus className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">追加</span>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Search with Hashtag Support */}
                <div className="relative">
                    <Input
                        placeholder="投稿やハッシュタグを検索... (#ビール #晩酌)"
                        className="bg-muted border-muted pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Popular Hashtags */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">人気:</span>
                            {["ビール", "晩酌", "仕事終わり", "日本酒", "ワイン", "同僚"].map((tag) => (
                                <Button
                                    key={tag}
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs border-muted hover:bg-muted"
                                    onClick={() => setSearchQuery(tag)}
                                >
                                    #{tag}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Posts */}
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} className="bg-card border-muted">
                            {/* Post Header */}
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-muted">{post.user.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{post.user.name}</span>
                                                {post.type === "group" && "group" in post && (
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{post.group.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{post.date}</div>

                                            {/* User Profile Info */}
                                            <div className="mt-2 text-xs space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">好きなお酒:</span>
                                                    <span className="text-secondary font-medium">{post.user.favoriteDrink}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">座右の銘:</span>
                                                    <span className="italic">"{post.user.motto}"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {post.alcohol}g
                                    </Badge>
                                </div>
                            </CardHeader>

                            {/* Post Content */}
                            <CardContent className="space-y-3">
                                {/* Drinks */}
                                <div className="space-y-1">
                                    {post.drinks.map((drink, index) => (
                                        <div key={index} className="text-sm">
                                            {drink}
                                        </div>
                                    ))}
                                </div>

                                {/* Safety Checks */}
                                {post.safetyChecks.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.safetyChecks.map((check, index) => (
                                            <Badge key={index} variant="outline" className="text-xs bg-muted/50 border-muted">
                                                ✓ {check}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Comment with Hashtags */}
                                <div className="text-sm">
                                    {post.comment.split(" ").map((word, index) => (
                                        <span key={index}>
                                            {word.startsWith("#") ? (
                                                <span className="text-primary font-medium cursor-pointer hover:underline">{word}</span>
                                            ) : (
                                                word
                                            )}
                                            {index < post.comment.split(" ").length - 1 ? " " : ""}
                                        </span>
                                    ))}
                                </div>

                                {/* Image */}
                                {post.image && (
                                    <div className="mt-2 rounded-xl overflow-hidden bg-muted/50">
                                        <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center">
                                            <div className="text-center space-y-2">
                                                <img src={logo} alt="YoiYoi Logo" className="h-8 w-8 opacity-50" />
                                                <p className="text-xs text-muted-foreground">投稿画像</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Mood */}
                                <div className="flex items-center gap-2">
                                    {getMoodIcon(post.mood)}
                                    <span className="text-sm text-muted-foreground">{post.mood}</span>
                                </div>
                            </CardContent>

                            {/* Post Footer */}
                            <CardFooter className="pt-0">
                                <div className="flex items-center justify-between w-full border-t border-muted pt-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => toggleLike(post.id)}
                                    >
                                        <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-primary text-primary" : ""}`} />
                                        <span className="text-xs">{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-xs">{post.comments}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {searchQuery && filteredPosts.length === 0 && (
                    <Card className="bg-card border-muted">
                        <CardContent className="p-8 text-center">
                            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-medium mb-2">検索結果が見つかりません</h3>
                            <p className="text-sm text-muted-foreground">「{searchQuery}」に関する投稿はありませんでした</p>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted">
                <div className="flex">
                    <Link to ="/home" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">ホーム</div>
                    </Link>
                    <Link to ="/timeline" className="flex-1 p-4 text-center">
                        <div className="text-primary">タイムライン</div>
                    </Link>
                    <Link to ="/stats" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">統計</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
