export type StrapiID = number | `${number}`

export type StrapiBaseProps = {
  id?: StrapiID
  createdBy?: User
  updatedBy?: User
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | Date
}

export type StrapiSearchParams = {
  populate?: string[] | Record<string, any>
  pagination?: {
    page: number
    pageSize?: number
    withCount?: boolean
    start?: number
    limit?: number
  }
  sort?: string[]
  filter?: Record<string, any>
  publicationState?: "live" | "preview"
  fields?: string[]
}

export type StrapiResponse<T> = {
  data: T
  error?: {
    status: number
    name: string
    message: string
    details: {
      name: string
      message: string
    }
  }
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type ImageWithDimensions = {
  url: string
  width: number
  height: number
}

export type ImageFormats = "thumbnail" | "small" | "medium" | "large"

/**
 * Image file formats as returned by the Strapi API.
 */
export type ImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

type ImageBaseAttributes = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: ImageFormat
    small?: ImageFormat
    medium?: ImageFormat
    large?: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata?: string
  createdAt: string
  updatedAt?: string
}

export type Image = StrapiBaseProps &
  ImageBaseAttributes & {
    id: StrapiID
  }

export type User = StrapiBaseProps & {
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  provider: string
  role?: number
  password?: string
}

export type Headers = {
  Authorization?: string
  "Content-Type"?: "application/json" | "text/plain"
  body?: string
}
