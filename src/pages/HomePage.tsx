"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wine, Plus, BarChart3, Calendar, Smile, Meh, Share2, Copy, Check, Edit } from "lucide-react"
import { Link } from 'react-router-dom'
import logo from '@/images/logo.png'

export default function HomePage() {
    const [inviteLink, setInviteLink] = useState("")
    const [linkCopied, setLinkCopied] = useState(false)
    const [showInviteDialog, setShowInviteDialog] = useState(false)
    const [showProfileDialog, setShowProfileDialog] = useState(false)

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        avatar_img: "",
        bio: "",
        favorite_drinks: "",
        motto: "",
        drinkingHistory: "",
        favoriteStyle: "",
    })

    // ここでlocalStorage参照
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setProfile(prev => ({
          ...prev,
          ...JSON.parse(storedUser)
        }));
      }
    }, []);

    // プロフィール編集後
    const handleProfileSave = () => {
      localStorage.setItem("user", JSON.stringify(profile));
      setShowProfileDialog(false);
      // ここでAPI連携も可能
    }

    const generateInviteLink = () => {
        const link = `https://yoiyoi.app/invite/${Math.random().toString(36).substring(7)}`
        setInviteLink(link)
        setShowInviteDialog(true)
    }

    const copyInviteLink = () => {
        navigator.clipboard.writeText(inviteLink)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
    }

    const recentLogs = [
        {
            id: 1,
            date: "2024-01-15",
            drinks: ["ビール 500ml", "ハイボール 300ml"],
            mood: "楽しい",
            alcohol: 24.5,
        },
        {
            id: 2,
            date: "2024-01-14",
            drinks: ["日本酒 180ml"],
            mood: "リラックス",
            alcohol: 18.0,
        },
        {
            id: 3,
            date: "2024-01-12",
            drinks: ["ワイン 250ml"],
            mood: "楽しい",
            alcohol: 20.0,
        },
    ]

    const getMoodIcon = (mood: string) => {
        switch (mood) {
            case "楽しい":
                return <Smile className="h-4 w-4 text-secondary" />
            case "リラックス":
                return <Meh className="h-4 w-4 text-blue-400" />
            default:
                return <Meh className="h-4 w-4 text-muted-foreground" />
        }
    }

    return (
        <html lang="ja" className="dark">
            <div className="min-h-screen bg-background text-foreground ">
                {/* Header */}
                <header className="px-4 py-6 border-b border-muted">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="YoiYoi Logo" className="h-6 w-6" />
                            <h1 className="text-xl font-bold">YoiYoi</h1>
                        </div>
                        <Link to="/stats">
                            <Button variant="ghost" size="sm">
                                <BarChart3 className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </header>

<<<<<<< HEAD
                <main className="px-4 py-6 space-y-6">
                    {/* Enhanced User Profile Section */}
                    <Card className="bg-card border-muted">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">あ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-lg">{profile.name}</div>
                                        <div className="text-sm text-muted-foreground">@{profile.username}</div>
                                        <div className="text-sm mt-1">{profile.bio}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="border-muted hover:bg-muted">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-muted max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>プロフィール編集</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                                <div>
                                                    <Label htmlFor="name">名前</Label>
                                                    <Input
                                                        id="name"
                                                        value={profile.name}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, name: e.target.value })}
                                                        className="mt-2 bg-muted border-muted"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="bio">自己紹介</Label>
                                                    <Textarea
                                                        id="bio"
                                                        value={profile.bio}
                                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile({ ...profile, bio: e.target.value })}
                                                        className="mt-2 bg-muted border-muted resize-none"
                                                        rows={2}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="favorite-drink">好きなお酒</Label>
                                                    <Input
                                                        id="favorite-drink"
                                                        value={profile.favoriteDrink}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, favoriteDrink: e.target.value })}
                                                        className="mt-2 bg-muted border-muted"
                                                        placeholder="例：クラフトビール、日本酒"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="motto">座右の銘</Label>
                                                    <Input
                                                        id="motto"
                                                        value={profile.motto}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, motto: e.target.value })}
                                                        className="mt-2 bg-muted border-muted"
                                                        placeholder="例：適度に楽しく、安全第一"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="drinking-history">飲酒歴</Label>
                                                    <Input
                                                        id="drinking-history"
                                                        value={profile.drinkingHistory}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, drinkingHistory: e.target.value })}
                                                        className="mt-2 bg-muted border-muted"
                                                        placeholder="例：3年、10年"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="favorite-style">好きな飲み方</Label>
                                                    <Input
                                                        id="favorite-style"
                                                        value={profile.favoriteStyle}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, favoriteStyle: e.target.value })}
                                                        className="mt-2 bg-muted border-muted"
                                                        placeholder="例：友達とワイワイ、一人でゆっくり"
                                                    />
                                                </div>
                                                <Button className="w-full bg-primary hover:bg-accent" onClick={() => setShowProfileDialog(false)}>
                                                    保存
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={generateInviteLink}
                                        className="border-muted hover:bg-muted"
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-muted-foreground">好きなお酒:</span>
                                        <div className="font-medium">{profile.favoriteDrink}</div>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">飲酒歴:</span>
                                        <div className="font-medium">{profile.drinkingHistory}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-muted-foreground">好きな飲み方:</span>
                                        <div className="font-medium">{profile.favoriteStyle}</div>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">座右の銘:</span>
                                        <div className="font-medium text-secondary">"{profile.motto}"</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Action - Timeline Link */}
                    <Link to="/timeline">
                        <Card className="bg-card border-muted cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4 text-center">
                                <img src={logo} alt="YoiYoi Logo" className="h-8 w-8 text-secondary mx-auto mb-2" />
                                <div className="text-sm font-medium">タイムラインを見る</div>
                                <div className="text-xs text-muted-foreground mt-1">友達の投稿をチェック</div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-card border-muted">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">62.5g</div>
                                <div className="text-sm text-muted-foreground">今週のアルコール</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-muted">
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-secondary">5回</div>
                                <div className="text-sm text-muted-foreground">今月の記録</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Weekly Chart */}
                    <Card className="bg-card border-muted">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                今週の飲酒量
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {["月", "火", "水", "木", "金", "土", "日"].map((day, index) => {
                                    const values = [0, 15, 0, 20, 25, 0, 2.5]
                                    const value = values[index]
                                    return (
                                        <div key={day} className="flex items-center gap-3">
                                            <div className="w-6 text-sm text-muted-foreground">{day}</div>
                                            <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all"
                                                    style={{ width: `${Math.min(value * 2, 100)}%` }}
                                                />
                                            </div>
                                            <div className="w-12 text-sm text-right">{value}g</div>
=======
            <main className="px-4 py-6 space-y-6">
                {/* Enhanced User Profile Section */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                {profile.avatar_img ? (
                                    <img
                                    src={profile.avatar_img}
                                    alt="avatar"
                                    className="h-16 w-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {profile.username ? profile.username[0] : "?"}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                                <div>
                                    <div className="font-bold text-lg">{profile.username}</div>
                                    <div className="text-sm text-muted-foreground">@{profile.username}</div>
                                    <div className="text-sm mt-1">{profile.bio}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="border-muted hover:bg-muted">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-card border-muted max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>プロフィール編集</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            <div>
                                                <Label htmlFor="username">ユーザー名</Label>
                                                <Input
                                                    id="username"
                                                    value={profile.username}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, username: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">メールアドレス</Label>
                                                <Input
                                                    id="email"
                                                    value={profile.email}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, email: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="bio">自己紹介</Label>
                                                <Textarea
                                                    id="bio"
                                                    value={profile.bio}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfile({ ...profile, bio: e.target.value })}
                                                    className="mt-2 bg-muted border-muted resize-none"
                                                    rows={2}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="favorite-drink">好きなお酒</Label>
                                                <Input
                                                    id="favorite-drink"
                                                    value={profile.favorite_drinks}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, favorite_drinks: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                    placeholder="例：クラフトビール、日本酒"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="motto">座右の銘</Label>
                                                <Input
                                                    id="motto"
                                                    value={profile.motto}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, motto: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                    placeholder="例：適度に楽しく、安全第一"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="drinking-history">飲酒歴</Label>
                                                <Input
                                                    id="drinking-history"
                                                    value={profile.drinkingHistory}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, drinkingHistory: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                    placeholder="例：3年、10年"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="favorite-style">好きな飲み方</Label>
                                                <Input
                                                    id="favorite-style"
                                                    value={profile.favoriteStyle}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, favoriteStyle: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                    placeholder="例：友達とワイワイ、一人でゆっくり"
                                                />
                                            </div>
                                            <Button className="w-full bg-primary hover:bg-accent" onClick={handleProfileSave}>
                                                保存
                                            </Button>
>>>>>>> e98fcd2c2db175dec868c351f1dd58ca39c2c446
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Logs */}
                    <Card className="bg-card border-muted">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">最近の記録</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentLogs.map((log) => (
                                <div key={log.id} className="p-4 bg-muted/50 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">{log.date}</div>
                                        <Badge variant="secondary" className="text-xs">
                                            {log.alcohol}g
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        {log.drinks.map((drink, index) => (
                                            <div key={index} className="text-sm">
                                                {drink}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getMoodIcon(log.mood)}
                                        <span className="text-sm text-muted-foreground">{log.mood}</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </main>

                {/* Invite Link Dialog */}
                <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                    <DialogContent className="bg-card border-muted">
                        <DialogHeader>
                            <DialogTitle>友達を招待</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">このリンクを友達に送って、YoiYoiに招待しましょう</p>
                            <div className="flex gap-2">
                                <Input value={inviteLink} readOnly className="bg-muted border-muted" />
                                <Button variant="outline" size="sm" onClick={copyInviteLink} className="border-muted hover:bg-muted">
                                    {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            {linkCopied && <p className="text-sm text-secondary">リンクをコピーしました！</p>}
                        </div>
                    </DialogContent>
                </Dialog>

<<<<<<< HEAD
                {/* Floating Action Button */}
                <Link to="/log/new">
                    <Button
                        size="lg"
                        className="fixed bottom-20 right-6 h-16 w-16 rounded-full bg-primary hover:bg-accent shadow-xl border-4 border-background z-10"
                    >
                        <Plus className="h-8 w-8" />
                    </Button>
=======
                        {/* Profile Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div>
                                    <span className="text-muted-foreground">好きなお酒:</span>
                                    <div className="font-medium">{profile.favorite_drinks}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">飲酒歴:</span>
                                    <div className="font-medium">{profile.drinkingHistory}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-muted-foreground">好きな飲み方:</span>
                                    <div className="font-medium">{profile.favoriteStyle}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">座右の銘:</span>
                                    <div className="font-medium text-secondary">"{profile.motto}"</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Action - Timeline Link */}
                <Link to="/timeline">
                    <Card className="bg-card border-muted cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 text-center">
                            <img src={logo} alt="YoiYoi Logo" className="h-8 w-8 text-secondary mx-auto mb-2" />
                            <div className="text-sm font-medium">タイムラインを見る</div>
                            <div className="text-xs text-muted-foreground mt-1">友達の投稿をチェック</div>
                        </CardContent>
                    </Card>
>>>>>>> e98fcd2c2db175dec868c351f1dd58ca39c2c446
                </Link>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted">
                    <div className="flex">
                        <Link to="/home" className="flex-1 p-4 text-center">
                            <div className="text-primary">ホーム</div>
                        </Link>
                        <Link to="/timeline" className="flex-1 p-4 text-center">
                            <div className="text-muted-foreground">タイムライン</div>
                        </Link>
                        <Link to="/stats" className="flex-1 p-4 text-center">
                            <div className="text-muted-foreground">統計</div>
                        </Link>
                    </div>
                </nav>
            </div>
        </html>
    )
}