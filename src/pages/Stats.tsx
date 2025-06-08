"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"


export default function StatsPage() {
    const [period, setPeriod] = useState<"week" | "month">("week")

    const weeklyData = [
        { day: "月", amount: 0 },
        { day: "火", amount: 15 },
        { day: "水", amount: 0 },
        { day: "木", amount: 20 },
        { day: "金", amount: 25 },
        { day: "土", amount: 0 },
        { day: "日", amount: 2.5 },
    ]

    const drinkTypes = [
        { name: "ビール", amount: 35, percentage: 56, color: "bg-yellow-500" },
        { name: "ハイボール", amount: 15, percentage: 24, color: "bg-amber-600" },
        { name: "ワイン", amount: 8, percentage: 13, color: "bg-purple-500" },
        { name: "日本酒", amount: 4.5, percentage: 7, color: "bg-blue-500" },
    ]

    const maxAmount = Math.max(...weeklyData.map((d) => d.amount))

    return (
        <div className="min-h-screen dark bg-background text-foreground pb-20">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center gap-4">
                    <Link href="/home">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
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

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-card border-muted">
                        <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-primary">62.5g</div>
                            <div className="text-xs text-muted-foreground">総アルコール</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-muted">
                        <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-secondary">8.9g</div>
                            <div className="text-xs text-muted-foreground">平均/日</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card border-muted">
                        <CardContent className="p-4 text-center">
                            <div className="text-xl font-bold text-accent">5日</div>
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
                            <div className="text-sm font-medium text-secondary">今週のアドバイス</div>
                            <p className="text-sm text-muted-foreground">適度な飲酒を心がけましょう。休肝日も大切です！</p>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-muted">
                <div className="flex">
                    <Link to ="/home" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">ホーム</div>
                    </Link>
                    <Link to ="/timeline" className="flex-1 p-4 text-center">
                        <div className="text-muted-foreground">タイムライン</div>
                    </Link>
                    <Link to ="/stats" className="flex-1 p-4 text-center">
                        <div className="text-primary">統計</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
