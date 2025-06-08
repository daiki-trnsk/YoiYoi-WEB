import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function Terms() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">利用規約</h1>
            
            <div className="space-y-4 text-sm">
              <section>
                <h2 className="text-lg font-semibold mb-2">1. はじめに</h2>
                <p className="text-muted-foreground">
                  本規約は、YoiYoi（以下「当アプリ」）の利用条件を定めるものです。
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">2. 禁止事項</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>法令や公序良俗に反する行為</li>
                  <li>他のユーザーに迷惑をかける行為</li>
                  <li>当アプリの運営を妨害する行為</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-2">3. 免責事項</h2>
                <p className="text-muted-foreground">
                  当アプリは、ユーザーの飲酒に関する記録を管理するツールとして提供されますが、
                  飲酒に関する責任はユーザー自身にあります。
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