"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wine, Heart, MessageCircle, Share2, Smile, Meh, Frown, Filter, Users, UserPlus, Search } from "lucide-react"
import { Link } from "react-router-dom"
import logo from '@/images/logo.png'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


export default function TimelinePage() {
    const [likedPosts, setLikedPosts] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [friendList, setFriendList] = useState<any[]>([])
    const [timeline, setTimeline] = useState<any[]>([])
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [addUserId, setAddUserId] = useState("")
    const [addLoading, setAddLoading] = useState(false)

    useEffect(() => {
        const fetchTimeline = async () => {
            const token = localStorage.getItem("access_token")
            if (!token) return
            try {
                const res = await fetch("https://yoiyoi-api-dev.onrender.com/timeline", {
                    headers: {
                        "Authorization": `${token}`
                    }
                })
                if (!res.ok) throw new Error("データ取得に失敗しました")
                const data = await res.json()
                setFriendList(Array.isArray(data.friend_list) ? data.friend_list : [])
                setTimeline(Array.isArray(data.timeline) ? data.timeline : [])
            } catch (e) {
                alert("データ取得に失敗しました")
            }
        }
        fetchTimeline()
    }, [])

    const toggleLike = (postId: string) => {
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

    // 検索フィルタ
    const filteredTimeline = timeline.filter((item) => {
        const comment = item.drink_log?.comment || ""
        return (
            searchQuery === "" ||
            comment.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    // フォロー中・申請中ユーザーを両方表示
    const displayFriends = friendList.filter(
        (user) => user.status === "accepted" || user.status === "pending"
    )

    const handleAccept = async (friendId: string) => {
        const token = localStorage.getItem("access_token")
        if (!token) return
        try {
            const res = await fetch(`https://yoiyoi-api-dev.onrender.com/friends/accept/${friendId}`, {
                method: "PATCH",
                headers: { "Authorization": `${token}` }
            })
            if (!res.ok) throw new Error("承認に失敗しました")
            // 承認後リストを再取得
            const data = await fetch("https://yoiyoi-api-dev.onrender.com/timeline", {
                headers: { "Authorization": `${token}` }
            }).then(r => r.json())
            setFriendList(data.friend_list)
        } catch {
            alert("承認に失敗しました")
        }
    }

    const handleReject = async (friendId: string) => {
        const token = localStorage.getItem("access_token")
        if (!token) return
        try {
            const res = await fetch(`https://yoiyoi-api-dev.onrender.com/friends/${friendId}`, {
                method: "DELETE",
                headers: { "Authorization": `${token}` }
            })
            if (!res.ok) throw new Error("拒否に失敗しました")
            // 拒否後リストを再取得
            const data = await fetch("https://yoiyoi-api-dev.onrender.com/timeline", {
                headers: { "Authorization": `${token}` }
            }).then(r => r.json())
            setFriendList(data.friend_list)
        } catch {
            alert("拒否に失敗しました")
        }
    }

    const handleAddFriend = async () => {
        if (!addUserId) return
        setAddLoading(true)
        const token = localStorage.getItem("access_token")
        try {
            const res = await fetch(`https://yoiyoi-api-dev.onrender.com/friends/request/${addUserId}`, {
                method: "POST",
                headers: { "Authorization": `${token}` }
            })
            if (!res.ok) throw new Error("申請に失敗しました")
            // 送信後にリスト再取得
            const data = await fetch("https://yoiyoi-api-dev.onrender.com/timeline", {
                headers: { "Authorization": `${token}` }
            }).then(r => r.json())
            setFriendList(Array.isArray(data.friend_list) ? data.friend_list : [])
            setTimeline(Array.isArray(data.timeline) ? data.timeline : [])
            setShowAddDialog(false)
            setAddUserId("")
        } catch {
            alert("申請に失敗しました")
        } finally {
            setAddLoading(false)
        }
    }

    // フォロー中ユーザーのみ
    const following = friendList.filter((user) => user.status === "accepted")

    return (
        <div className="min-h-screen dark bg-background text-foreground pb-20">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wine className="h-6 w-6 text-primary" />
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
                                {displayFriends.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`flex flex-col items-center gap-2 min-w-[60px] group relative
                                            ${user.status === "pending" ? "opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition" : ""}
                                        `}
                                    >
                                        <Avatar className={`h-12 w-12 border-2 ${user.status === "pending" ? "border-yellow-400" : "border-primary"}`}>
                                            {user.avatar_img ? (
                                                <img src={user.avatar_img} alt={user.username} className="h-12 w-12 rounded-full object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-muted">{user.username?.[0] || "?"}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <span className="text-sm text-center">{user.username}</span>
                                        {user.status === "pending" && (
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 top-[60px] z-20 hidden group-hover:flex flex-row gap-2
                                                           bg-card rounded-lg shadow-lg p-2"
                                                style={{ minWidth: 80 }}
                                            >
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="bg-green-500 hover:bg-green-600 text-white border-none"
                                                    style={{ boxShadow: "none" }}
                                                    onClick={() => handleAccept(user.friend_id)}
                                                >
                                                    <span className="text-xl">✔</span>
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="bg-red-500 hover:bg-red-600 text-white border-none"
                                                    style={{ boxShadow: "none" }}
                                                    onClick={() => handleReject(user.friend_id)}
                                                >
                                                    <span className="text-xl">✖</span>
                                                </Button>
                                            </div>
                                        )}
                                        {user.status === "pending" && (
                                            <span className="text-xs text-yellow-500">申請中</span>
                                        )}
                                    </div>
                                ))}
                                <div className="flex flex-col items-center gap-2 min-w-[60px]">
                                    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                                        <DialogTrigger asChild>
                                            <div className="h-12 w-12 border-2 border-dashed border-muted rounded-full flex items-center justify-center cursor-pointer">
                                                <UserPlus className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-muted">
                                            <DialogHeader>
                                                <DialogTitle>ユーザーIDで友達追加</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <Input
                                                    placeholder="ユーザーIDを入力"
                                                    value={addUserId}
                                                    onChange={e => setAddUserId(e.target.value)}
                                                    className="bg-muted border-muted"
                                                />
                                                <Button
                                                    className="w-full"
                                                    onClick={handleAddFriend}
                                                    disabled={addLoading || !addUserId}
                                                >
                                                    {addLoading ? "送信中..." : "申請する"}
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <span className="text-sm text-muted-foreground">追加</span>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Search */}
                <div className="relative">
                    <Input
                        placeholder="投稿を検索..."
                        className="bg-muted border-muted pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Posts */}
                <div className="space-y-4">
                    {filteredTimeline.map((item) => (
                        <Card key={item.drink_log.id} className="bg-card border-muted">
                            {/* Post Header */}
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                        <Avatar>
                                            {item.user.avatar_img ? (
                                                <img src={item.user.avatar_img} alt={item.user.username} className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <AvatarFallback className="bg-muted">{item.user.username?.[0] || "?"}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{item.user.username}</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.drink_log.drink_date ? item.drink_log.drink_date.slice(0, 10) : ""}
                                            </div>
                                            {/* User Profile Info */}
                                            <div className="mt-2 text-sm space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">好きなお酒:</span>
                                                    <span className="text-secondary font-medium">{item.user.favorite_drinks}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">座右の銘:</span>
                                                    <span className="italic">"{item.user.motto}"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-sm">
                                        {item.drink_log.drinks.reduce((sum: number, d: any) => sum + d.amount_ml, 0)}ml
                                    </Badge>
                                </div>
                            </CardHeader>

                            {/* Post Content */}
                            <CardContent className="space-y-3">
                                {/* Drinks */}
                                <div className="space-y-1">
                                    {item.drink_log.drinks.map((drink: any, index: number) => (
                                        <div key={index} className="text-base">
                                            {drink.name} {drink.amount_ml}ml（{drink.abv}%）
                                        </div>
                                    ))}
                                </div>

                                {/* Comment */}
                                <div className="text-sm">
                                    {item.drink_log.comment}
                                </div>
                            </CardContent>

                            {/* Post Footer */}
                            <CardFooter className="pt-0">
                                <div className="flex items-center justify-between w-full border-t border-muted pt-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => toggleLike(item.drink_log.id)}
                                    >
                                        <Heart className={`h-4 w-4 ${likedPosts.includes(item.drink_log.id) ? "fill-primary text-primary" : ""}`} />
                                        <span className="text-sm">{likedPosts.includes(item.drink_log.id) ? 1 : 0}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-sm">0</span>
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
                {searchQuery && filteredTimeline.length === 0 && (
                    <Card className="bg-card border-muted">
                        <CardContent className="p-8 text-center">
                            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">検索結果が見つかりません</h3>
                            <p className="text-base text-muted-foreground">「{searchQuery}」に関する投稿はありませんでした</p>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted">
                <div className="flex">
                    <Link to="/home" className="flex-1 p-4 text-center">
                        <div className="text-base text-muted-foreground">ホーム</div>
                    </Link>
                    <Link to="/timeline" className="flex-1 p-4 text-center">
                        <div className="text-base text-primary">タイムライン</div>
                    </Link>
                    <Link to="/stats" className="flex-1 p-4 text-center">
                        <div className="text-base text-muted-foreground">統計</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
