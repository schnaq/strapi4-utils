import {
  Headers,
  Image,
  ImageFormats,
  ImageWithDimensions,
  StrapiResponse,
} from "@/models"

/**
 * Query data from the API. Coerces the response to the given type.
 */
export async function queryAPI<T>([
  path,
  body,
  method,
  apiUrl = process.env.STRAPI_API_URL,
  token = process.env.STRAPI_API_TOKEN,
]: [string, any?, string?, string?, string?]): Promise<
  StrapiResponse<T> | undefined
> {
  const headers: Headers = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": body ? "application/json" : "text/plain",
  }

  const result = await fetch(`${apiUrl}${path}`, {
    method: method ? method : body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (result.ok) {
    try {
      const json = await result.json()
      if (Array.isArray(json.data)) {
        json.data = json.data.map(flattenAttributes)
      } else {
        json.data = flattenAttributes(json.data)
      }
      return json
    } catch (e) {
      console.warn("Could not parse JSON from API response.")
    }
  } else {
    console.warn("API request failed. Status code:", result.status)
    console.warn(result)
    console.warn(await result.json())
  }
}

/**
 * Flattens the attributes of an object.
 */
export function flattenAttributes(obj: any): any {
  if (!obj) {
    return null
  }

  let result = {}

  for (const key of Object.keys(obj) as string[]) {
    const value = obj[key]
    if (key === "attributes" || key === "data") {
      if (Array.isArray(value)) {
        // Early return, if it's an array inside data / attributes
        // https://docs.strapi.io/dev-docs/api/rest The meta in a nested response list is inside
        // the arrays, so the early return should do no harm.
        return value.map((value: any) => flattenAttributes(value))
      } else {
        Object.assign(result, flattenAttributes(value))
      }
    } else {
      // Check for a key, which contains of a collection of components, which need to be flattened
      if (key === "body" || key === "items") {
        if (Array.isArray(value)) {
          // @ts-ignore
          result[key] = value.map((value: any) => flattenAttributes(value))
        }
      } else {
        // @ts-ignore
        result[key] =
          typeof value === "object" ? flattenAttributes(value) : value
      }
    }
  }
  return result
}

/**
 * Return the URL for the image in the given size. Falls back to the next smaller size, if the
 * requested size is not available.
 */
export function getImageUrlForSize(
  image: Image | undefined,
  size?: ImageFormats
): ImageWithDimensions | undefined {
  if (!image) {
    return
  }
  if (!size) {
    return {
      url: image.url,
      width: image.width,
      height: image.height,
    }
  }
  if (image.formats) {
    const formats = image.formats
    const selectedFormat = formats[size]
    if (selectedFormat) {
      return {
        url: selectedFormat.url,
        width: selectedFormat.width,
        height: selectedFormat.height,
      }
    } else if (formats.large) {
      return {
        url: formats.large.url,
        width: formats.large.width,
        height: formats.large.height,
      }
    } else if (formats.medium) {
      return {
        url: formats.medium.url,
        width: formats.medium.width,
        height: formats.medium.height,
      }
    } else if (formats.small) {
      return {
        url: formats.small.url,
        width: formats.small.width,
        height: formats.small.height,
      }
    } else if (formats.thumbnail) {
      return {
        url: formats.thumbnail.url,
        width: formats.thumbnail.width,
        height: formats.thumbnail.height,
      }
    }
  }
  return {
    url: image.url,
    width: image.width,
    height: image.height,
  }
}
