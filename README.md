# Strapi v4 utils

## Description

This library provides functions to interact with a Strapi v4 API and some more utilities.

## Installation

```bash
npm install @schnaq/strapi4-utils
# or
yarn add @schnaq/strapi4-utils
# or
pnpm install @schnaq/strapi4-utils
# ...
```

## Configuration

> [!NOTE]
> You need to configure environment variables if you want to interact with the Strapi API.

- `STRAPI_API_URL`: The URL of the Strapi API. Also looks up the public variable `NEXT_PUBLIC_STRAPI_API_URL` if you are using nextjs and are using a client component.
- `STRAPI_API_TOKEN`: The API token to authenticate with the Strapi API. Also looks up the public variable `NEXT_PUBLIC_STRAPI_API_TOKEN` if you are using nextjs and are using a client component.

## Functions

### `queryAPI<T>`

Query a Strapi API and flatten the response. It's always JSON what we are receiving from the API, and we are getting rid of the `attributes` property.

This function is formatted as a vector to be supported with hooks, like `useSWR`.

Example:

```ts
// import { Event } from "my/awesome/types"

/**
 * Fetch an event from the API. The data is flattened and of type Event.
 */
export async function getEvent(eventId: Event["id"]) {
  const response: Event = await queryAPI<Event>([`/events/${eventId}`])
  return response?.data
}
```

Example: Usage in a react context

```ts
async function getMyBoxes() {
  const { data: session, status } = useSession()
  const [boxes, setBoxes] = useState<Box[]>()

  useSWR(
    status === "authenticated"
      ? [`/boxes`, undefined, "GET", session?.accessToken]
      : null,
    queryAPI<Box[]>,
    {
      onSuccess: (boxes) => {
        setBoxes(boxes?.data)
      },
    }
  )
}
```

### `getImageUrlForSize`

Provide a valid image from a Strapi response. This functions provides the nearest image size to the requested one.

Example:

```ts
getImageUrlForSize(annoyotronImage, "thumbnail")
// => returns the thumbnail URL of the image

getImageUrlForSize(annoyotronImage, "large")
// => returns the large URL of the image, if available. If not, it returns the next best size, i.e. medium, and so on.
```

## Release

To release a new version, run the following command:

```bash
pnpm release
```

## Developed by

```
schnaq GmbH
c/o TechHub.K67
Kasernenstr. 67
40213 Düsseldorf
Germany
```
