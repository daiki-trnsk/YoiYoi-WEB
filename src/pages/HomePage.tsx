import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Plus, BarChart3, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="px-4 py-6 border-b border-muted">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wine className="h-6 w-6 text-primary" />
                        <h1 className="text-xl font-bold">YoiYoi</h1>
                    </div>
                    <Link to="/stats">
                        <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="px-4 py-6 space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/log/new">
                        <Card className="bg-card border-muted cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4 text-center">
                                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                                <div className="text-sm font-medium">記録を追加</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/timeline">
                        <Card className="bg-card border-muted cursor-pointer hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4 text-center">
                                <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                                <div className="text-sm font-medium">タイムライン</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Recent Activity */}
                <Card className="bg-card border-muted">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold mb-4">最近の記録</h2>
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center py-4">
                                まだ記録がありません
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Floating Action Button */}
            <Link to="/log/new">
                <Button
                    size="lg"
                    className="fixed bottom-20 right-6 h-16 w-16 rounded-full bg-primary hover:bg-accent shadow-xl border-4 border-background z-10"
                >
                    <Plus className="h-8 w-8" />
                </Button>
            </Link>
        </div>
    )
} 