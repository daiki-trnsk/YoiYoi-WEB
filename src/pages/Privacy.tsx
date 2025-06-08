import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function Privacy() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">プライバシーポリシー</h1>
            
            <div className="space-y-4 text-sm">
              <section>
                <h2 className="text-lg font-semibold mb-2">1. 収集する情報</h2>
                <p className="text-muted-foreground">
                  当アプリでは、以下の情報を収集する場合があります：
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>ユーザーが入力した飲酒記録</li>
                  <li>アカウント情報</li>
                  <li>利用統計情報</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">2. 情報の利用目的</h2>
                <p className="text-muted-foreground">
                  収集した情報は、以下の目的で利用されます：
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>サービスの提供・改善</li>
                  <li>ユーザーサポート</li>
                  <li>安全性の確保</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">3. 情報の保護</h2>
                <p className="text-muted-foreground">
                  当アプリは、収集した情報の適切な管理と保護に努めます。
                </p>
              </section>
            </div>

            <div className="text-center">
              <Link to="/">
                <Button variant="outline">トップページに戻る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 