import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from '@/images/logo.png'

export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // TODO: 実際の新規登録処理を実装
            console.log("新規登録を開始します", formData)
            // 仮の登録成功処理
            navigate("/home")
        } catch (error) {
            console.error("登録に失敗しました:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container max-w-md mx-auto px-4 py-8">
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="YoiYoi Logo" className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">YoiYoi</h1>
                    </div>

                    <Card className="w-full">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-center">新規登録</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">お名前</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="山田 太郎"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">メールアドレス</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">パスワード</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="8文字以上"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="パスワードを再入力"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    登録する
                                </Button>
                            </form>

                            <div className="text-center text-sm text-muted-foreground">
                                <p>すでにアカウントをお持ちの方は</p>
                                <Link to="/login" className="text-primary hover:underline">
                                    ログイン
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                        トップページに戻る
                    </Link>
                </div>
            </div>
        </div>
    )
} 