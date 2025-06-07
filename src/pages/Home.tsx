"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, BarChart3, Users, Shield, Share2 } from "lucide-react"
import { Link } from 'react-router-dom'
import logo from '@/images/logo.png'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const { toast } = useToast()

  const handleShare = async () => {
    const shareUrl = window.location.href
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "リンクをコピーしました",
        description: "友達と共有できます",
        duration: 3000,
      })
    } catch (err) {
      toast({
        title: "コピーに失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="YoiYoi Logo" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            <h1 className="text-2xl font-bold">YoiYoi</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-relaxed text-left pl-4 font-shippori">
              宵酒<br />
              ほろ酔い<br />
              好い時間
            </h2>
            <p className="text-muted-foreground text-lg whitespace-nowrap text-left pl-4 font-shippori">「善い飲み方は、酔いの記録から。」</p>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3 py-8 text-center">
            {[
              {
                image: "/src/images/mealwith_logo.png",
                text: "「一気飲み」「空きっ腹に酒」してない？？",
              },
              {
                image: "/src/images/log_logo.png",
                text: "飲みの思い出を記録しよう",
              },
              {
                image: "/src/images/funSafe_logo.png",
                text: "健康で楽しい飲酒をサポート",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="group overflow-hidden border-none bg-card h-full transition-transform duration-300 transform hover:scale-105 shadow-md"
              >
                <div className="w-full">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-auto aspect-[4/3] sm:aspect-[16/9] object-contain border-none shadow-none m-0 p-0"
                  />

                </div>
                <CardContent className="flex items-center justify-center p-6 min-h-[6rem]">
                  <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>


          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link to="/login">
              <Button
                size="lg"
                className="w-full md:w-1/3 bg-primary hover:bg-accent text-primary-foreground font-semibold py-4 rounded-xl shadow-lg"
              >
                はじめる
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full md:w-1/3 border-muted hover:bg-muted bg-white"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 mr-2" />
              友達に共有する
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 mt-12 border-t border-muted">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 YoiYoi 飲酒記録アプリ</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-foreground">
              利用規約
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              プライバシー
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              お問い合わせ
            </Link>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
