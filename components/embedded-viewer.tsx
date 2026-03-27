"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmbeddedViewerProps {
  savedUrl: string
}

export function EmbeddedViewer({ savedUrl }: EmbeddedViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const handleAllowAccess = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "top-level-user-gesture" }, "*")
  }

  return (
    <>
      <Button type="button" onClick={handleAllowAccess} disabled={!savedUrl}>
        Allow access
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {savedUrl ? (
              <iframe
                ref={iframeRef}
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
    </>
  )
}