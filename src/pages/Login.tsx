import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import logo from '@/images/logo.png'
import { useState } from "react"

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("https://yoiyoi-api-dev.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            console.log(data)

            if (data.access_token) {
                // ② access_tokenをlocalStorageに保存
                localStorage.setItem("access_token", data.access_token);
                // ③ ユーザー情報も保存したければここで
                localStorage.setItem("user", JSON.stringify(data.user));
                // ④ ログイン後にページ遷移
                navigate("/home");
            } else {
                alert("ログインに失敗しました");
            }
        } catch (error) {
            alert("エラーが発生しました");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleGoogleLogin = () => {
        // TODO: Googleログイン処理を実装
        console.log("Googleログインを開始します")
        navigate("/home")
    }

    const handleAppleLogin = () => {
        // TODO: Appleログイン処理を実装
        console.log("Appleログインを開始します")
        navigate("/home")
    }

    return (
        <div className="min-h-screen dark bg-background text-foreground">
            <div className="container max-w-md mx-auto px-4 py-8">
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="YoiYoi Logo" className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">YoiYoi</h1>
                    </div>

                    <Card className="w-full">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-center">ログイン</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                        placeholder="パスワードを入力"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    ログイン
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        または
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleGoogleLogin}
                                >
                                    Googleでログイン
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleAppleLogin}
                                >
                                    Appleでログイン
                                </Button>
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                <p>アカウントをお持ちでない方は</p>
                                <Link to="/signup" className="text-primary hover:underline">
                                    新規登録
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
