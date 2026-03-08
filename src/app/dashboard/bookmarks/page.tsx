'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, X } from 'lucide-react'
import { useBreadcrumbs } from '@/context/BreadcrumbContext'

interface Bookmark {
  id: number
  userId: string
  bookmark: string
  createdAt: string
  updatedAt: string
}

export default function BookmarksPage() {
  const { user } = useAuth()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [newBookmark, setNewBookmark] = useState('')
  const [addLoading, setAddLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { setBreadcrumbs } = useBreadcrumbs()
  
    useEffect(() => {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Bookmarks' }
      ])
    }, [setBreadcrumbs])

  const fetchBookmarks = async () => {
    if (!user) return

    try {
      setFetchLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('Bookmark')
        .select('*')
        .eq('userId', user.id)
        .order('createdAt', { ascending: false })

      if (fetchError) {
        setError(fetchError.message)
        return
      }

      setBookmarks(data || [])
    } catch (err) {
      setError('Failed to fetch bookmarks')
      console.error('Fetch error:', err)
    } finally {
      setFetchLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBookmarks()
    }
  }, [user])

  const handleAddBookmark = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newBookmark.trim()) return

    try {
      setAddLoading(true)
      setError(null)

      const { error: insertError } = await supabase.from('Bookmark').insert([
        {
          userId: user.id,
          bookmark: newBookmark.trim(),
        },
      ])

      if (insertError) {
        setError(insertError.message)
        return
      }

      setNewBookmark('')
      setShowForm(false)
      fetchBookmarks()
    } catch (err) {
      setError('Failed to add bookmark')
      console.error('Add error:', err)
    } finally {
      setAddLoading(false)
    }
  }

  const handleDeleteBookmark = async (id: number) => {
    try {
      const { error: deleteError } = await supabase
        .from('Bookmark')
        .delete()
        .eq('id', id)
        .eq('userId', user?.id)

      if (deleteError) {
        setError(deleteError.message)
        return
      }

      setBookmarks(bookmarks.filter((b) => b.id !== id))
    } catch (err) {
      setError('Failed to delete bookmark')
      console.error('Delete error:', err)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Bookmark
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950 p-4 text-sm text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {showForm && (
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add New Bookmark</CardTitle>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBookmark} className="space-y-4">
              <Input
                placeholder="Enter bookmark URL or name"
                value={newBookmark}
                onChange={(e) => setNewBookmark(e.target.value)}
                disabled={addLoading}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={addLoading}>
                  {addLoading ? 'Adding...' : 'Add Bookmark'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {fetchLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading bookmarks...</p>
        </div>
      ) : bookmarks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No bookmarks yet</p>
              <Button onClick={() => setShowForm(true)} variant="outline">
                Create your first bookmark
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="truncate text-base">
                  {bookmark.bookmark}
                </CardTitle>
                <CardDescription className="text-xs">
                  ID: {bookmark.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Created:</strong>{' '}
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Updated:</strong>{' '}
                    {new Date(bookmark.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <div className="border-t p-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                  className="w-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
