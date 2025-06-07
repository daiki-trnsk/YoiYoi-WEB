"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, BarChart3, Users, Shield } from "lucide-react"
import { Link } from 'react-router-dom'
import logo from '@/images/logo.png'

export default function Home() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="YoiYoi Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">YoiYoi</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              飲んだお酒を記録して、<br />
              楽しく振り返る
            </h2>
            <p className="text-muted-foreground text-lg">安全に楽しく飲むための"酔い記録帳"</p>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3 py-8 text-left">
            {[
              {
                icon: <BarChart3 className="h-6 w-6 text-secondary" />,
                text: "一気飲みしてない？空腹で飲んでない？"
              },
              {
                icon: <Users className="h-6 w-6 text-secondary" />,
                text: "あなたの飲み方を振り返ろう"
              },
              {
                icon: <Shield className="h-6 w-6 text-secondary" />,
                text: "安全で楽しい飲酒をサポート"
              },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-muted h-full">
                <CardContent className="p-4 flex items-start gap-3">
                  {item.icon}
                  <p className="text-sm">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link to="/login">
              <Button
                size="lg"
                className="w-full md:w-1/3 bg-primary hover:bg-accent text-primary-foreground font-semibold py-4 rounded-xl shadow-lg"
              >
                はじめる
              </Button>
            </Link>
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
    </div>
  )
}
