"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Camera, Smile, Meh, Frown, Hash, Wine, BarChart3, Calendar } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function LogNew() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        drinks: [""],
        mood: "楽しい",
        comment: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // TODO: 実際の記録保存処理を実装
            console.log("記録を保存します", formData)
            navigate("/home")
        } catch (error) {
            console.error("記録の保存に失敗しました:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDrinkChange = (index: number, value: string) => {
        const newDrinks = [...formData.drinks]
        newDrinks[index] = value
        setFormData(prev => ({
            ...prev,
            drinks: newDrinks
        }))
    }

    const addDrinkField = () => {
        setFormData(prev => ({
            ...prev,
            drinks: [...prev.drinks, ""]
        }))
    }

    const removeDrinkField = (index: number) => {
        const newDrinks = formData.drinks.filter((_, i) => i !== index)
        setFormData(prev => ({
            ...prev,
            drinks: newDrinks
        }))
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wine className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">YoiYoi</h1>
                    </div>
                    <Link to="/home">
                        <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="px-4 py-6">
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">新しい記録</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">日付</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>飲んだお酒</Label>
                                {formData.drinks.map((drink, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={drink}
                                            onChange={(e) => handleDrinkChange(index, e.target.value)}
                                            placeholder="例：ビール 500ml"
                                            required
                                        />
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeDrinkField(index)}
                                                className="border-muted hover:bg-muted"
                                            >
                                                削除
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addDrinkField}
                                    className="w-full border-muted hover:bg-muted"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    お酒を追加
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mood">気分</Label>
                                <select
                                    id="mood"
                                    name="mood"
                                    value={formData.mood}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded-md border border-muted bg-muted"
                                    required
                                >
                                    <option value="楽しい">楽しい</option>
                                    <option value="リラックス">リラックス</option>
                                    <option value="普通">普通</option>
                                    <option value="疲れた">疲れた</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comment">コメント</Label>
                                <Textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder="今日の感想や気分を書いてみましょう"
                                    rows={3}
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                記録を保存
                            </Button>
                        </form>
                    </CardContent>
                </Card>
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
                        <div className="text-muted-foreground">統計</div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
