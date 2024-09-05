# Strapi v4 utils

## Description

This library provides functions to interact with a Strapi v4 API and some more utilities.

## Configuration

> [!NOTE]
> You need to configure environment variables if you want to interact with the Strapi API

- `API_URL`: The URL of the Strapi API
- `API_TOKEN`: The API token to authenticate with the Strapi API

## Functions

### `queryAPI<T>`

Query a Strapi API and flatten the response. It's always JSON what we are receiving from the API, and we are getting rid of the `attributes` property.

This function is formatted in a way that it can be used within nextjs and benefit from the fetcher function.

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

### `getImageUrlForSize`

Provide a valid image from a Strapi response. This functions provides the nearest image size to the requested one.

Example:

```ts
getImageUrlForSize(annoyotronImage, "thumbnail")
// => returns the thumbnail URL of the image

getImageUrlForSize(annoyotronImage, "large")
// => returns the large URL of the image, if available. If not, it returns the next best size, i.e. medium, and so on.
```

## Developed by

```
schnaq GmbH
c/o TechHub.K67
Kasernenstr. 67
40213 Düsseldorf
Germany
```
