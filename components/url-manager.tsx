"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ExternalLink, Edit, Save, X } from "lucide-react"
import { submitUrl, clearUrl } from "@/app/actions"

interface UrlManagerProps {
  savedUrl: string
}

export function UrlManager({ savedUrl }: UrlManagerProps) {
  const [isEditing, setIsEditing] = useState(!savedUrl)
  const [currentUrl, setCurrentUrl] = useState(savedUrl)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (savedUrl) {
      setIsEditing(false)
      setCurrentUrl(savedUrl)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    await submitUrl(formData)
    setIsEditing(false)
  }

  const handleClear = async () => {
    await clearUrl()
    setIsEditing(true)
    setCurrentUrl("")
  }

  if (isEditing) {
    return (
      <div className="space-y-4">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-lg font-semibold">
              {savedUrl ? "Update URL:" : "Enter URL to display:"}
            </Label>
            <div className="flex gap-2">
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                className="flex-1 h-12 text-lg"
                required
              />
              <Button type="submit" size="lg" className="px-6">
                <Save className="h-4 w-4 mr-2" />
                {savedUrl ? "Update" : "Submit"}
              </Button>
              {savedUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleCancel}
                  className="px-6 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </form>
        {savedUrl && (
          <div className="flex justify-end">
            <Button variant="destructive" size="sm" onClick={handleClear}>
              Clear URL
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between bg-background border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <ExternalLink className="h-4 w-4 text-green-600 flex-shrink-0" />
        <span className="text-sm text-muted-foreground flex-shrink-0">You are now viewing:</span>
        <span className="font-medium text-foreground break-all">{savedUrl}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleEdit} className="ml-4 flex-shrink-0 bg-transparent">
        <Edit className="h-4 w-4 mr-2" />
        Edit
      </Button>
    </div>
  )
}
