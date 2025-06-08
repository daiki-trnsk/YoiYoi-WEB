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
import { Plus, BarChart3, Calendar, Share2, Copy, Check, Edit, LogOut } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/images/logo.png'

export default function HomePage() {
    const [inviteLink, setInviteLink] = useState("")
    const [linkCopied, setLinkCopied] = useState(false)
    const [showInviteDialog, setShowInviteDialog] = useState(false)
    const [showProfileDialog, setShowProfileDialog] = useState(false)

    // APIから取得したデータ
    const [userInfo, setUserInfo] = useState<any>(null)
    const [weeklyStats, setWeeklyStats] = useState<any>(null)
    const [logsCount30, setLogsCount30] = useState<number>(0)
    const [recentLogs, setRecentLogs] = useState<any[]>([])

    // プロフィール編集用
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        avatar_img: "",
        bio: "",
        favorite_drinks: "",
        motto: "",
    })

    const navigate = useNavigate()

    // ここでlocalStorage参照
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token")
            if (!token) return
            try {
                const res = await fetch("https://yoiyoi-api-dev.onrender.com/home", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                })
                if (!res.ok) throw new Error("データ取得に失敗しました")
                const data = await res.json()
                setUserInfo(data.user_info)
                setWeeklyStats(data.weekly_stats)
                setLogsCount30(data.logs_count_30)
                setRecentLogs(data.recent_logs)
                setProfile({
                    username: data.user_info.username,
                    email: data.user_info.email,
                    avatar_img: data.user_info.avatar_img,
                    bio: data.user_info.bio,
                    favorite_drinks: data.user_info.favorite_drinks,
                    motto: data.user_info.motto,
                })
            } catch (e) {
                console.log(userInfo)
                alert("データ取得に失敗しました")
            }
        }
        fetchData()
    }, [])

    const handleProfileSave = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch("https://yoiyoi-api-dev.onrender.com/auth/me", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(profile),
            });

            if (!res.ok) throw new Error("プロフィール更新に失敗");
            const updatedUser = await res.json();
            setProfile({
                username: updatedUser.username,
                email: updatedUser.email,
                avatar_img: updatedUser.avatar_img,
                bio: updatedUser.bio,
                favorite_drinks: updatedUser.favorite_drinks,
                motto: updatedUser.motto,
            });
            setUserInfo(updatedUser);
            setShowProfileDialog(false);
            alert("プロフィールを保存しました！");
        } catch (e) {
            alert("プロフィール更新に失敗しました");
        }
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

    // const getMoodIcon = (mood: string) => {
    //     switch (mood) {
    //         case "楽しい":
    //             return <Smile className="h-4 w-4 text-secondary" />
    //         case "リラックス":
    //             return <Meh className="h-4 w-4 text-blue-400" />
    //         default:
    //             return <Meh className="h-4 w-4 text-muted-foreground" />
    //     }
    // }

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (token) {
                await fetch("https://yoiyoi-api-dev.onrender.com/auth/logout", {
                    method: "POST",
                    headers: {
                        "Authorization": `${token}`
                    }
                });
            }
        } catch (error) {
            console.error("ログアウト処理でエラーが発生しました:", error);
        } finally {
            // ローカルストレージのクリア
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            // セッションストレージのクリア
            sessionStorage.clear();
            // ログインページへリダイレクト
            navigate("/login");
        }
    };

    // 曜日を日本語に変換
    const weekdayMap: Record<string, string> = {
        "Mon": "月",
        "Tue": "火",
        "Wed": "水",
        "Thu": "木",
        "Fri": "金",
        "Sat": "土",
        "Sun": "日"
    }

    return (
        <div className="min-h-screen dark bg-background text-foreground ">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="YoiYoi Logo" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
                        <h1 className="text-xl font-bold">YoiYoi</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link to="/stats">
                            <Button variant="ghost" size="sm">
                                <BarChart3 className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

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
                                                <Label htmlFor="avatar_img">アイコン画像</Label>
                                                <Input
                                                    id="avatar_img"
                                                    value={profile.avatar_img}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, avatar_img: e.target.value })}
                                                    className="mt-2 bg-muted border-muted"
                                                />
                                            </div>
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
                                            <Button
                                                className="w-full bg-primary hover:bg-accent"
                                                onClick={handleProfileSave}
                                            >
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
                                    <div className="font-medium">{profile.favorite_drinks}</div>
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
                            <div className="text-2xl font-bold text-primary">
                                {weeklyStats ? `${weeklyStats.total_alcohol_ml}ml` : "--"}
                            </div>
                            <div className="text-sm text-muted-foreground">今週のアルコール</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-muted">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-secondary">
                                {logsCount30}回
                            </div>
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
                            {weeklyStats && weeklyStats.alcohol_by_weekday
                                ? Object.entries(weeklyStats.alcohol_by_weekday).map(([en, value]) => (
                                    <div key={en} className="flex items-center gap-3">
                                        <div className="w-6 text-sm text-muted-foreground">{weekdayMap[en] || en}</div>
                                        <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all"
                                                style={{ width: `${Math.min(Number(value) * 2, 100)}%` }}
                                            />
                                        </div>
                                        <div className="w-12 text-sm text-right">{String(value)}ml</div>
                                    </div>
                                ))
                                : <div className="text-muted-foreground text-sm">データがありません</div>
                            }
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Logs */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">最近の記録</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentLogs && recentLogs.length === 0 && (
                            <div className="text-muted-foreground text-sm">記録がありません</div>
                        )}
                        {recentLogs && recentLogs.map((log) => (
                            <div key={log.id} className="p-4 bg-muted/50 rounded-xl space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        {log.drink_date ? log.drink_date.slice(0, 10) : ""}
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {log.drinks.reduce((sum: number, d: any) => sum + d.amount_ml, 0)}ml
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    {log.drinks.map((drink: any, index: number) => (
                                        <div key={index} className="text-sm">
                                            {drink.name} {drink.amount_ml}ml（{drink.abv}%）
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* コメントや気分など必要に応じて */}
                                    <span className="text-sm text-muted-foreground">{log.comment}</span>
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

            {/* Floating Action Button */}
            <Link to="/log/new">
                <Button
                    size="lg"
                    className="fixed bottom-20 right-6 h-16 w-16 rounded-full bg-primary hover:bg-accent shadow-xl border-4 border-background z-10"
                >
                    <Plus className="h-8 w-8" />
                </Button>
            </Link>
        </div>
    )
}
