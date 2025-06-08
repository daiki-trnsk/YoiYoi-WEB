"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "@/images/logo.png"

export default function StatsPage() {
    const [period, setPeriod] = useState<"week" | "month">("week")
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            const token = localStorage.getItem("access_token")
            try {
                const res = await fetch(`https://yoiyoi-api-dev.onrender.com/stats/${period}`, {
                    headers: { "Authorization": `${token}` }
                })
                if (!res.ok) throw new Error("データ取得に失敗しました")
                const data = await res.json()
                setStats(data)
            } catch {
                alert("データ取得に失敗しました")
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [period])

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

    // グラフ用データ
    const weeklyData = stats?.alcohol_by_weekday
        ? Object.entries(stats.alcohol_by_weekday).map(([en, amount]) => ({
            day: weekdayMap[en] || en,
            amount: amount as number
        }))
        : []

    const maxAmount = weeklyData.length > 0 ? Math.max(...weeklyData.map((d) => d.amount)) : 0

    // 種類別
    const drinkTypes = stats?.alcohol_by_drink_type
        ? (() => {
            const colors = ["bg-yellow-500", "bg-amber-600", "bg-purple-500", "bg-blue-500", "bg-pink-500", "bg-green-500"]
            const entries = Object.entries(stats.alcohol_by_drink_type).map(([name, amount], idx) => ({
                name,
                amount: amount as number,
                color: colors[idx % colors.length],
            }))
            const totalDrinkAmount = entries.reduce((sum, d) => sum + d.amount, 0)
            return entries.map(d => ({
                ...d,
                percentage: totalDrinkAmount > 0 ? Math.round((d.amount / totalDrinkAmount) * 100) : 0
            }))
        })()
        : []

    return (
        <div className="min-h-screen dark bg-background text-foreground pb-20">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center gap-4">
                    <Link to="/home">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-8 w-8" />
                        </Button>
                    </Link>
                    <img src={logo} alt="YoiYoi Logo" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <h1 className="text-xl font-bold">YoiYoi - 統計</h1>
                </div>
            </header>

            <main className="px-4 py-6 space-y-6">
                {/* Period Toggle */}
                <div className="flex gap-2">
                    <Button
                        variant={period === "week" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPeriod("week")}
                        className={period === "week" ? "bg-primary hover:bg-accent" : "border-muted hover:bg-muted"}
                    >
                        週間
                    </Button>
                    <Button
                        variant={period === "month" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPeriod("month")}
                        className={period === "month" ? "bg-primary hover:bg-accent" : "border-muted hover:bg-muted"}
                    >
                        月間
                    </Button>
                </div>

                {loading || !stats ? (
                    <div className="text-center text-muted-foreground py-10">読み込み中...</div>
                ) : (
                    <>
                        {/* Summary Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="bg-card border-muted">
                                <CardContent className="p-4 text-center">
                                    <div className="text-xl font-bold text-primary">{stats.total_alcohol_gram}g</div>
                                    <div className="text-xs text-muted-foreground">総アルコール</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-muted">
                                <CardContent className="p-4 text-center">
                                    <div className="text-xl font-bold text-primary">{stats.average_alcohol_gram?.toFixed(1)}g</div>
                                    <div className="text-xs text-muted-foreground">平均/日</div>
                                </CardContent>
                            </Card>
                            <Card className="bg-card border-muted">
                                <CardContent className="p-4 text-center">
                                    <div className="text-xl font-bold text-primary">{stats.actual_drink_days}日</div>
                                    <div className="text-xs text-muted-foreground">飲酒日数</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Alcohol Trend Chart */}
                        <Card className="bg-card border-muted">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    アルコール量の推移
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {weeklyData.map((data, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">{data.day}曜日</span>
                                                <span className="font-medium">{data.amount}g</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                                    style={{
                                                        width: maxAmount > 0 ? `${(data.amount / maxAmount) * 100}%` : "0%",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Drink Types */}
                        <Card className="bg-card border-muted">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    お酒の種類別
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {drinkTypes.map((drink, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${drink.color}`} />
                                                <span className="text-sm font-medium">{drink.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {drink.percentage}%
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">{drink.amount}g</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full ${drink.color} rounded-full transition-all duration-500`}
                                                style={{ width: `${drink.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Health Tips */}
                        <Card className="bg-card border-muted">
                            <CardContent className="p-4">
                                <div className="text-center space-y-2">
                                    <div className="text-sm font-medium text-primary">今週のアドバイス</div>
                                    <p className="text-sm text-muted-foreground">適度な飲酒を心がけましょう。休肝日も大切です！</p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted">
                <div className="flex">
                    <Link to="/home" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">ホーム</div>
                    </Link>
                    <Link to="/timeline" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">タイムライン</div>
                    </Link>
                    <Link to="/stats" className="flex-1 p-4 text-center">
                        <div className="text-primary">統計</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
