import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom"

export default function Contact() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">お問い合わせ</h1>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">お名前</label>
                <Input placeholder="山田 太郎" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">メールアドレス</label>
                <Input type="email" placeholder="example@email.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">お問い合わせ内容</label>
                <Textarea
                  placeholder="お問い合わせ内容を入力してください"
                  className="min-h-[200px]"
                />
              </div>

              <Button className="w-full">送信する</Button>
            </form>

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