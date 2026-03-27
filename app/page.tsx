import { cookies } from "next/headers"
import { UrlManager } from "@/components/url-manager"
import { ThemeToggle } from "@/components/theme-toggle"
import { InfoBox } from "@/components/info-box"
import { EmbeddedViewer } from "@/components/embedded-viewer"

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

      <div className="max-w-4xl mx-auto space-y-4">
        <EmbeddedViewer savedUrl={savedUrl} />
      </div>
    </div>
  )
}
