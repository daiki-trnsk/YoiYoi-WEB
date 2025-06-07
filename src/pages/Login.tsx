import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, MessageCircle, User } from "lucide-react"
import { Link } from "react-router-dom"


export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Wine className="h-10 w-10 text-primary" />
                        <h1 className="text-3xl font-bold">YoiYoi</h1>
                    </div>
                    <p className="text-muted-foreground">ログインして始める</p>
                </div>

                {/* Login Card */}
                <Card className="bg-card border-muted shadow-lg">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl">アカウント認証</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* LINE Login */}
                        <Link to ="/home">
                            <Button
                                className="w-full bg-[#00B900] hover:bg-[#00A000] text-white font-semibold py-4 rounded-xl flex items-center gap-3"
                                size="lg"
                            >
                                <MessageCircle className="h-5 w-5" />
                                LINEでログイン
                            </Button>
                        </Link>

                        {/* Guest Login */}
                        <Link to ="/home">
                            <Button
                                variant="outline"
                                className="w-full border-muted hover:bg-muted text-foreground font-semibold py-4 rounded-xl flex items-center gap-3"
                                size="lg"
                            >
                                <User className="h-5 w-5" />
                                ゲストで始める
                            </Button>
                        </Link>

                        {/* Info */}
                        <div className="pt-4 text-center">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                このアプリではあなたの飲酒記録を
                                <br />
                                安全に管理します
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Back to Home */}
                <div className="text-center">
                    <Link to ="/" className="text-sm text-muted-foreground hover:text-foreground">
                        ← トップページに戻る
                    </Link>
                </div>
            </div>
        </div>
    )
}
