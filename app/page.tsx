import { cookies } from "next/headers"
import { Card, CardContent } from "@/components/ui/card"
import { UrlManager } from "@/components/url-manager"
import { ThemeToggle } from "@/components/theme-toggle"
import { InfoBox } from "@/components/info-box"

export default async function Home() {
  // Get the URL from cookies
  const cookieStore = await cookies()
  const savedUrl = cookieStore.get("iframe-url")?.value || ""

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header with Theme Toggle */}
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">URL Viewer</h1>
        <ThemeToggle />
      </div>

      {/* Hideable Info Box */}
      <InfoBox />

      {/* Unified URL Manager */}
      <div className="max-w-4xl mx-auto">
        <UrlManager savedUrl={savedUrl} />
      </div>

      {/* Iframe Card - Fills the card completely */}
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {savedUrl ? (
              <iframe
                src={savedUrl}
                className="w-full h-[600px] border-0"
                sandbox="allow-popups allow-top-navigation allow-scripts allow-forms allow-storage-access-by-user-activation allow-same-origin"
                title="URL Viewer"
              />
            ) : (
              <div className="w-full h-[600px] flex items-center justify-center bg-muted text-muted-foreground">
                <div className="text-center space-y-2">
                  <div className="text-xl font-medium">No URL set</div>
                  <div className="text-sm">Enter a URL above to display content here</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
