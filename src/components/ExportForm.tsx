import { type ChangeEvent,type FormEvent, useState } from "react"
import axios from "axios"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const API_BASE = import.meta.env.VITE_API_BASE

type ExportType = "users" | "blogs"

type UserFilters = {
  role: string
  isActive: string
  name: string
  email: string
  startDate: string
  endDate: string
  count: string
}

type BlogFilters = {
  title: string
  content: string
  authorId: string
  category: string
  tags: string
  status: string
  views: string
  likes: string
  commentsCount: string
  startDate: string
  endDate: string
  count: string
}

const defaultUserFilters: UserFilters = {
  role: "",
  isActive: "",
  name: "",
  email: "",
  startDate: "",
  endDate: "",
  count: ""
}

const defaultBlogFilters: BlogFilters = {
  title: "",
  content: "",
  authorId: "",
  category: "",
  tags: "",
  status: "",
  views: "",
  likes: "",
  commentsCount: "",
  startDate: "",
  endDate: "",
  count: ""
}

const ExportForm = ({ onClose }: { onClose?: () => void }) => {
  const [exportType, setExportType] = useState<ExportType>("users")
  const [userFilters, setUserFilters] = useState<UserFilters>(defaultUserFilters)
  const [blogFilters, setBlogFilters] = useState<BlogFilters>(defaultBlogFilters)
  const [downloading, setDownloading] = useState(false)

  const handleUserChange = (key: keyof UserFilters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserFilters((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleBlogChange = (key: keyof BlogFilters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBlogFilters((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const buildUrlWithParams = (type: ExportType) => {
    const filters = type === "users" ? userFilters : blogFilters
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        params.append(key, value)
      }
    })

    const query = params.toString()
    return `${API_BASE}/export/${type}${query ? `?${query}` : ""}`
  }

  const handleDownload = async (event: FormEvent) => {
    event.preventDefault()
    setDownloading(true)

    try {
      const url = buildUrlWithParams(exportType)
      const response = await axios.get(url, { responseType: "blob" })

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      })

      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = downloadUrl
      link.download = exportType === "users" ? "users.xlsx" : "blogs.xlsx"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download failed", error)
    } finally {
      setDownloading(false)
    }
  }

  const renderUserFields = () => (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={userFilters.role}
          onChange={handleUserChange("role")}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="isActive">Status</Label>
        <select
          id="isActive"
          value={userFilters.isActive}
          onChange={handleUserChange("isActive")}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Any</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Search by name"
          value={userFilters.name}
          onChange={handleUserChange("name")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="user@email.com"
          value={userFilters.email}
          onChange={handleUserChange("email")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDate">Created from</Label>
        <Input
          id="startDate"
          type="date"
          value={userFilters.startDate}
          onChange={handleUserChange("startDate")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">Created to</Label>
        <Input
          id="endDate"
          type="date"
          value={userFilters.endDate}
          onChange={handleUserChange("endDate")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="count">Limit</Label>
        <Input
          id="count"
          type="number"
          min={1}
          placeholder="Leave blank for all"
          value={userFilters.count}
          onChange={handleUserChange("count")}
        />
      </div>
    </div>
  )

  const renderBlogFields = () => (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Search by title"
          value={blogFilters.title}
          onChange={handleBlogChange("title")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Input
          id="content"
          placeholder="Text contained in content"
          value={blogFilters.content}
          onChange={handleBlogChange("content")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="authorId">Author Id</Label>
        <Input
          id="authorId"
          placeholder="author id"
          value={blogFilters.authorId}
          onChange={handleBlogChange("authorId")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="tech, lifestyle"
          value={blogFilters.category}
          onChange={handleBlogChange("category")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="tag1,tag2"
          value={blogFilters.tags}
          onChange={handleBlogChange("tags")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          placeholder="draft, published"
          value={blogFilters.status}
          onChange={handleBlogChange("status")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="views">Min views</Label>
        <Input
          id="views"
          type="number"
          min={0}
          placeholder="0"
          value={blogFilters.views}
          onChange={handleBlogChange("views")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="likes">Min likes</Label>
        <Input
          id="likes"
          type="number"
          min={0}
          placeholder="0"
          value={blogFilters.likes}
          onChange={handleBlogChange("likes")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="commentsCount">Min comments</Label>
        <Input
          id="commentsCount"
          type="number"
          min={0}
          placeholder="0"
          value={blogFilters.commentsCount}
          onChange={handleBlogChange("commentsCount")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDateBlog">Created from</Label>
        <Input
          id="startDateBlog"
          type="date"
          value={blogFilters.startDate}
          onChange={handleBlogChange("startDate")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDateBlog">Created to</Label>
        <Input
          id="endDateBlog"
          type="date"
          value={blogFilters.endDate}
          onChange={handleBlogChange("endDate")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="blogCount">Limit</Label>
        <Input
          id="blogCount"
          type="number"
          min={1}
          placeholder="Leave blank for all"
          value={blogFilters.count}
          onChange={handleBlogChange("count")}
        />
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <Button
            type="button"
            variant={exportType === "users" ? "default" : "outline"}
            onClick={() => setExportType("users")}
            className="w-full sm:w-auto"
          >
            Users
          </Button>
          <Button
            type="button"
            variant={exportType === "blogs" ? "default" : "outline"}
            onClick={() => setExportType("blogs")}
            className="w-full sm:w-auto"
          >
            Blogs
          </Button>
        </div>
      </div>
      <form onSubmit={handleDownload} className="space-y-6">
        <div>
          {exportType === "users" ? renderUserFields() : renderBlogFields()}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setUserFilters(defaultUserFilters)
              setBlogFilters(defaultBlogFilters)
            }}
            className="w-full sm:w-auto"
          >
            Clear filters
          </Button>
          <Button type="submit" disabled={downloading} className="w-full sm:w-auto">
            {downloading ? "Preparing..." : "Download Excel"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ExportForm
