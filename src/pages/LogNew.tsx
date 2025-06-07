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
import { ArrowLeft, Plus, X, Camera, Smile, Meh, Frown, Hash } from "lucide-react"
import { Link } from "react-router-dom"


export default function NewLogPage() {
    const [drinks, setDrinks] = useState([{ name: "", amount: "", unit: "", strength: "" }])
    const [selectedMood, setSelectedMood] = useState("")
    const [hashtags, setHashtags] = useState<string[]>([])
    const [hashtagInput, setHashtagInput] = useState("")
    const [checks, setChecks] = useState({
        notEmpty: false,
        notBinge: false,
        withFood: false,
    })

    const drinkOptions = [
        "ビール",
        "ハイボール",
        "サワー",
        "日本酒",
        "ワイン",
        "ウイスキー",
        "焼酎",
        "カクテル",
        "チューハイ",
        "梅酒",
        "その他",
    ]

    const unitOptions = [
        { value: "cup", label: "杯" },
        { value: "mega", label: "メガ杯" },
        { value: "long", label: "ロング缶" },
        { value: "short", label: "ショート缶" },
        { value: "bottle", label: "瓶" },
    ]

    const strengthOptions = [
        { value: "3", label: "3%" },
        { value: "5", label: "5%" },
        { value: "7", label: "7%" },
        { value: "9", label: "9%" },
        { value: "12", label: "12%" },
        { value: "15", label: "15%" },
        { value: "20", label: "20%" },
        { value: "25", label: "25%" },
        { value: "weak", label: "弱い" },
        { value: "normal", label: "普通" },
        { value: "strong", label: "強い" },
        { value: "very_strong", label: "とても強い" },
        { value: "unknown", label: "不明" },
    ]

    const popularHashtags = [
        "ビール",
        "晩酌",
        "仕事終わり",
        "日本酒",
        "ワイン",
        "同僚",
        "家飲み",
        "乾杯",
        "金曜日",
        "週末",
        "居酒屋",
        "バー",
    ]

    const addDrink = () => {
        setDrinks([...drinks, { name: "", amount: "", unit: "", strength: "" }])
    }

    const removeDrink = (index: number) => {
        setDrinks(drinks.filter((_, i) => i !== index))
    }

    const updateDrink = (index: number, field: string, value: string) => {
        const newDrinks = [...drinks]
        newDrinks[index] = { ...newDrinks[index], [field]: value }
        setDrinks(newDrinks)
    }

    const addHashtag = (tag: string) => {
        if (tag && !hashtags.includes(tag)) {
            setHashtags([...hashtags, tag])
        }
        setHashtagInput("")
    }

    const removeHashtag = (tag: string) => {
        setHashtags(hashtags.filter((t) => t !== tag))
    }

    const moods = [
        { id: "happy", label: "楽しい", icon: Smile, color: "text-secondary" },
        { id: "normal", label: "普通", icon: Meh, color: "text-blue-400" },
        { id: "sad", label: "だるい", icon: Frown, color: "text-muted-foreground" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center gap-4">
                    <Link to ="/home">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">YoiYoi - 飲酒記録</h1>
                </div>
            </header>

            <main className="px-4 py-6 space-y-6">
                {/* Date */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-4">
                        <Label htmlFor="date" className="text-sm font-medium">
                            日付
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            defaultValue={new Date().toISOString().split("T")[0]}
                            className="mt-2 bg-muted border-muted"
                        />
                    </CardContent>
                </Card>

                {/* Drinks */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">飲んだお酒</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {drinks.map((drink, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">お酒 {index + 1}</Label>
                                    {drinks.length > 1 && (
                                        <Button variant="ghost" size="sm" onClick={() => removeDrink(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {/* Drink Name */}
                                    <div>
                                        <Label className="text-xs text-muted-foreground">お酒の種類</Label>
                                        <Select onValueChange={(value) => updateDrink(index, "name", value)}>
                                            <SelectTrigger className="bg-background border-muted">
                                                <SelectValue placeholder="お酒を選択" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {drinkOptions.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Amount and Unit */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs text-muted-foreground">量</Label>
                                            <Input
                                                placeholder="数量"
                                                type="number"
                                                className="bg-background border-muted"
                                                value={drink.amount}
                                                onChange={(e) => updateDrink(index, "amount", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-muted-foreground">単位</Label>
                                            <Select onValueChange={(value) => updateDrink(index, "unit", value)}>
                                                <SelectTrigger className="bg-background border-muted">
                                                    <SelectValue placeholder="単位" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {unitOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Strength */}
                                    <div>
                                        <Label className="text-xs text-muted-foreground">度数・強さ</Label>
                                        <Select onValueChange={(value) => updateDrink(index, "strength", value)}>
                                            <SelectTrigger className="bg-background border-muted">
                                                <SelectValue placeholder="度数または強さを選択" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {strengthOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" onClick={addDrink} className="w-full border-muted hover:bg-muted">
                            <Plus className="h-4 w-4 mr-2" />
                            お酒を追加
                        </Button>
                    </CardContent>
                </Card>

                {/* Safety Checks */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">安全チェック</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="not-empty" className="text-sm">
                                空腹で飲んでいない
                            </Label>
                            <Switch
                                id="not-empty"
                                checked={checks.notEmpty}
                                onCheckedChange={(checked) => setChecks({ ...checks, notEmpty: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="not-binge" className="text-sm">
                                一気飲みしていない
                            </Label>
                            <Switch
                                id="not-binge"
                                checked={checks.notBinge}
                                onCheckedChange={(checked) => setChecks({ ...checks, notBinge: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="with-food" className="text-sm">
                                食事と一緒に飲んだ
                            </Label>
                            <Switch
                                id="with-food"
                                checked={checks.withFood}
                                onCheckedChange={(checked) => setChecks({ ...checks, withFood: checked })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Mood */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">気分</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            {moods.map((mood) => (
                                <Button
                                    key={mood.id}
                                    variant={selectedMood === mood.id ? "default" : "outline"}
                                    className={`p-4 h-auto flex-col gap-2 ${selectedMood === mood.id ? "bg-primary hover:bg-accent" : "border-muted hover:bg-muted"
                                        }`}
                                    onClick={() => setSelectedMood(mood.id)}
                                >
                                    <mood.icon className={`h-6 w-6 ${mood.color}`} />
                                    <span className="text-sm">{mood.label}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Hashtags */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Hash className="h-5 w-5" />
                            ハッシュタグ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Current Hashtags */}
                        {hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {hashtags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        #{tag}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeHashtag(tag)} />
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Add Hashtag */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="ハッシュタグを入力"
                                value={hashtagInput}
                                onChange={(e) => setHashtagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addHashtag(hashtagInput)
                                    }
                                }}
                                className="bg-muted border-muted"
                            />
                            <Button
                                variant="outline"
                                onClick={() => addHashtag(hashtagInput)}
                                className="border-muted hover:bg-muted"
                            >
                                追加
                            </Button>
                        </div>

                        {/* Popular Hashtags */}
                        <div>
                            <Label className="text-xs text-muted-foreground">人気のハッシュタグ</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {popularHashtags.map((tag) => (
                                    <Button
                                        key={tag}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 text-xs border-muted hover:bg-muted"
                                        onClick={() => addHashtag(tag)}
                                    >
                                        #{tag}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comment */}
                <Card className="bg-card border-muted">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">コメント</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="今日の飲み会はどうでしたか？"
                            className="bg-muted border-muted resize-none"
                            rows={3}
                        />
                    </CardContent>
                </Card>

                {/* Photo Upload */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-4">
                        <Button variant="outline" className="w-full border-muted hover:bg-muted border-dashed py-8">
                            <Camera className="h-6 w-6 mr-2" />
                            写真を追加（任意）
                        </Button>
                    </CardContent>
                </Card>

                {/* Share Toggle */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="share" className="text-sm">
                                他ユーザーにシェア
                            </Label>
                            <Switch id="share" />
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-muted">
                <Link to ="/home">
                    <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold py-4 rounded-xl"
                    >
                        保存
                    </Button>
                </Link>
            </div>
        </div>
    )
}
