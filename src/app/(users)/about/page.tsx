import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Leaf, Zap, Globe, Phone, Mail } from "lucide-react"

export default function About() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-5">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    About Us
                                </h1>
                                <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-6xl/none">
                                    Ecosystem BMW
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, beatae nulla! Molestias id illum distinctio unde fugiat fugit natus libero!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}