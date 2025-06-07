"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, BarChart3, Users, Shield, Share2 } from "lucide-react"
import { Link } from 'react-router-dom'
import logo from '@/images/logo.png'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy, Check } from "lucide-react"
import { useState } from "react"



export default function Home() {

  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)

  const openShareDialog = () => {
    setShareUrl(window.location.href)
    setShowShareDialog(true)
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
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

      {/* メインコンテンツ */}
      <main className="px-4 py-8">
        {/* 背景画像セクション（横幅いっぱい） */}
        <div className="relative w-full h-[400px]">
          <img
            src="/src/images/background.png"
            alt="背景画像"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-background/50 to-background" />


          {/* テキストは中央寄せにしたいので max-w をここで指定 */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 text-white">
            <h2 className="text-3xl md:text-4xl font-bold leading-relaxed text-left font-shippori">
              宵酒<br />
              ほろ酔い<br />
              好い時間
            </h2>
            <p className="text-lg whitespace-nowrap pt-8 text-left font-shippori">
              「善い飲み方は、酔いの記録から。」
            </p>
          </div>
        </div>



        {/* Features */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 pt-8 pb-8 text-center">
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full md:w-1/3">
              <Button
                size="lg"
                className="w-full text-white font-semibold py-4 rounded-xl shadow-lg bg-primary bg-gradient-to-r from-orange-400 to-pink-700 hover:from-orange-500 hover:to-pink-800"
              >
                はじめる
              </Button>
            </Link>

            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full md:w-1/3 text-white font-semibold py-4 rounded-xl shadow-lg bg-gradient-to-r from-orange-400 to-pink-700 hover:from-orange-500 hover:to-pink-800"
                  onClick={openShareDialog}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  友達に共有する
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-card border-muted">
                <DialogHeader>
                  <DialogTitle>共有リンク</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">このリンクをコピーして友達に送ってね！</p>
                  <div className="flex gap-2">
                    <Input value={shareUrl} readOnly className="bg-muted border-muted" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyShareLink}
                      className="border-muted hover:bg-muted"
                    >
                      {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {linkCopied && <p className="text-sm text-secondary">リンクをコピーしました！</p>}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 mt-12 border-t border-muted" >
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 YoiYoi 飲酒記録アプリ</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-foreground">利用規約</Link>
            <Link to="/privacy" className="hover:text-foreground">プライバシー</Link>
            <Link to="/contact" className="hover:text-foreground">お問い合わせ</Link>
          </div>
        </div>
      </footer >
    </div>
  )
}
