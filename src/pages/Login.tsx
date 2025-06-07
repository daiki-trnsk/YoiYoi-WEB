import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import logo from '@/images/logo.png'

export default function Login() {
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        try {
            // TODO: 実際のGoogleログイン処理を実装
            console.log("Googleログインを開始します")
            // 仮のログイン成功処理
            navigate("/home")
        } catch (error) {
            console.error("ログインに失敗しました:", error)
        }
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
                            <h2 className="text-xl font-semibold text-center">ログイン</h2>
                            <div className="space-y-4">
                                <Button 
                                    className="w-full" 
                                    variant="outline"
                                    onClick={handleGoogleLogin}
                                >
                                    Googleでログイン
                                </Button>
                                <Button className="w-full" variant="outline">
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
