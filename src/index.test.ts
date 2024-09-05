import { describe, expect, it } from "vitest"
import { flattenAttributes, getImageUrlForSize } from "./index"
import { Image } from "./models"

export const annoyotronImage: Image = {
  id: 5,
  name: "Annoyotron_full_800w.webp",
  alternativeText: null,
  caption: null,
  width: 800,
  height: 716,
  formats: {
    thumbnail: {
      name: "thumbnail_Annoyotron_full_800w.webp",
      hash: "thumbnail_Annoyotron_full_800w_78989563b1",
      ext: ".webp",
      mime: "image/webp",
      path: null,
      width: 174,
      height: 156,
      size: 7.45,
      url: "https://some.path.to.image/thumbnail_Annoyotron_full_800w_78989563b1.webp",
    },
    medium: {
      name: "medium_Annoyotron_full_800w.webp",
      hash: "medium_Annoyotron_full_800w_78989563b1",
      ext: ".webp",
      mime: "image/webp",
      path: null,
      width: 750,
      height: 671,
      size: 36.67,
      url: "https://some.path.to.image/medium_Annoyotron_full_800w_78989563b1.webp",
    },
    small: {
      name: "small_Annoyotron_full_800w.webp",
      hash: "small_Annoyotron_full_800w_78989563b1",
      ext: ".webp",
      mime: "image/webp",
      path: null,
      width: 500,
      height: 448,
      size: 24.66,
      url: "https://some.path.to.image/small_Annoyotron_full_800w_78989563b1.webp",
    },
  },
  hash: "Annoyotron_full_800w_78989563b1",
  ext: ".webp",
  mime: "image/webp",
  size: 39.89,
  url: "https://some.path.to.image/Annoyotron_full_800w_78989563b1.webp",
  previewUrl: null,
  provider: "aws-s3",
  createdAt: "2024-01-31T15:29:58.394Z",
  updatedAt: "2024-01-31T15:29:58.394Z",
}

export const annoyotron = {
  id: 2,
  username: "annoyotron",
  email: "annoy@o.tron",
  provider: "local",
  confirmed: false,
  blocked: false,
  type: "private",
  createdAt: "2024-01-31T15:27:20.580Z",
  updatedAt: "2024-01-31T15:30:04.047Z",
  firstName: null,
  lastName: null,
  profilePicture: annoyotronImage,
  uuid: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
}

const wireAnnoyotronImage = {
  data: {
    id: 7,
    attributes: {
      name: "annoyotron.webp",
      alternativeText: null,
      caption: null,
      width: 400,
      height: 358,
      formats: {
        thumbnail: {
          name: "thumbnail_annoyotron.webp",
          hash: "thumbnail_annoyotron_3fc49feef2",
          ext: ".webp",
          mime: "image/webp",
          path: null,
          width: 174,
          height: 156,
          size: 7.65,
          url: "https://annoyotron.webp",
        },
      },
      hash: "annoyotron_3fc49feef2",
      ext: ".webp",
      mime: "image/webp",
      size: 21.65,
      url: "https://annoyotron.webp",
      previewUrl: null,
      provider: "aws-s3",
      createdAt: "2023-07-20T14:59:23.631Z",
      updatedAt: "2023-07-20T14:59:23.631Z",
    },
  },
}

const convertedAnnoyotronImage: Image = {
  id: 7,
  name: "annoyotron.webp",
  alternativeText: null,
  caption: null,
  width: 400,
  height: 358,
  formats: {
    thumbnail: {
      name: "thumbnail_annoyotron.webp",
      hash: "thumbnail_annoyotron_3fc49feef2",
      ext: ".webp",
      mime: "image/webp",
      path: null,
      width: 174,
      height: 156,
      size: 7.65,
      url: "https://annoyotron.webp",
    },
  },
  hash: "annoyotron_3fc49feef2",
  ext: ".webp",
  mime: "image/webp",
  size: 21.65,
  url: "https://annoyotron.webp",
  previewUrl: null,
  provider: "aws-s3",
  createdAt: "2023-07-20T14:59:23.631Z",
  updatedAt: "2023-07-20T14:59:23.631Z",
}

const strapiArticle = {
  id: 1,
  attributes: {
    createdAt: "2023-06-19T12:31:54.071Z",
    updatedAt: "2023-06-19T12:35:56.054Z",
    publishedAt: "2023-06-19T12:35:56.053Z",
    slug: "this-is-a-slug",
    kicker: "...",
    headline: "...",
    teaser: "...",
    body: [
      {
        id: 2,
        __component: "articles.content",
        content: "...",
      },
      {
        id: 2,
        __component: "articles.image",
        media: wireAnnoyotronImage,
      },
      {
        id: 2,
        __component: "articles.content-with-media-left",
        content: "...",
        media: wireAnnoyotronImage,
      },
      {
        id: 2,
        __component: "articles.content-with-media-right",
        content: "...",
        media: wireAnnoyotronImage,
      },
    ],
  },
}

const convertedArticle = {
  id: 1,
  createdAt: "2023-06-19T12:31:54.071Z",
  updatedAt: "2023-06-19T12:35:56.054Z",
  publishedAt: "2023-06-19T12:35:56.053Z",
  slug: "this-is-a-slug",
  kicker: "...",
  headline: "...",
  teaser: "...",
  body: [
    {
      id: 2,
      __component: "articles.content",
      content: "...",
    },
    {
      id: 2,
      __component: "articles.image",
      media: convertedAnnoyotronImage,
    },
    {
      id: 2,
      __component: "articles.content-with-media-left",
      content: "...",
      media: convertedAnnoyotronImage,
    },
    {
      id: 2,
      __component: "articles.content-with-media-right",
      content: "...",
      media: convertedAnnoyotronImage,
    },
  ],
}

const nestedInput = {
  id: 1,
  attributes: {
    publishedAt: "2023-06-19T12:35:56.053Z",
    headerImage: {
      data: {
        id: 42,
        attributes: {
          caption: "foo",
        },
      },
    },
  },
}

const nestedOutput = {
  id: 1,
  publishedAt: "2023-06-19T12:35:56.053Z",
  headerImage: {
    id: 42,
    caption: "foo",
  },
}

const nullValueInput = {
  id: 1,
  attributes: {
    publishedAt: "2023-06-19T12:35:56.053Z",
    updatedAt: null,
    headerImage: {
      data: {
        id: 42,
        attributes: {
          caption: "foo",
        },
      },
    },
  },
}

const nullValueOutput = {
  id: 1,
  publishedAt: "2023-06-19T12:35:56.053Z",
  updatedAt: null,
  headerImage: {
    id: 42,
    caption: "foo",
  },
}

const arrayOutput = {
  id: 1,
  attributes: {
    topics: {
      data: [
        {
          id: 2,
          attributes: {
            name: "Lokaltiere",
            icon: "MapPin",
            color: "orange-light",
            createdAt: "2023-07-07T08:51:14.003Z",
            updatedAt: "2023-07-11T09:13:00.804Z",
            slug: "lokaltiere",
          },
        },
        {
          id: 1,
          attributes: {
            name: "Sport",
            icon: "Circle",
            color: "blue-light",
            createdAt: "2023-07-06T11:40:30.395Z",
            updatedAt: "2023-07-11T09:12:45.125Z",
            slug: "sport",
          },
        },
      ],
    },
  },
}

const correctArrayOutput = {
  id: 1,
  topics: [
    {
      id: 2,
      name: "Lokaltiere",
      icon: "MapPin",
      color: "orange-light",
      createdAt: "2023-07-07T08:51:14.003Z",
      updatedAt: "2023-07-11T09:13:00.804Z",
      slug: "lokaltiere",
    },
    {
      id: 1,
      name: "Sport",
      icon: "Circle",
      color: "blue-light",
      createdAt: "2023-07-06T11:40:30.395Z",
      updatedAt: "2023-07-11T09:12:45.125Z",
      slug: "sport",
    },
  ],
}

const articlesResponseWithAuthors = {
  data: [
    {
      id: 1,
      attributes: {
        createdAt: "2023-06-19T12:31:54.071Z",
        updatedAt: "2023-07-25T15:47:08.899Z",
        publishedAt: "2023-06-19T12:35:56.053Z",
        authors: {
          data: [
            {
              id: 5,
              attributes: {
                username: "leni",
              },
            },
            {
              id: 4,
              attributes: {
                username: "ally",
              },
            },
          ],
        },
      },
    },
  ],
}

describe("flattenAttributes", () => {
  it("should remove the attributes and move all keys up", () => {
    expect(flattenAttributes(strapiArticle)).toStrictEqual(convertedArticle)
  })
  it("should remove attributes in nested structures", () => {
    expect(flattenAttributes(nestedInput)).toStrictEqual(nestedOutput)
  })
  it("should not remove null values", () => {
    expect(flattenAttributes(nullValueInput)).toStrictEqual(nullValueOutput)
  })
  it("should go sufficiently deep and not convert arrays to plain objects", () => {
    expect(flattenAttributes(arrayOutput)).toStrictEqual(correctArrayOutput)
  })
  it("should flatten the authors", () => {
    const articles = flattenAttributes(articlesResponseWithAuthors)
    expect(articles[0].authors[0].username).toStrictEqual("leni")
    expect(articles[0].authors[1].username).toStrictEqual("ally")
  })
})

describe("getImageUrlForSize", () => {
  it("should return the correct size", () => {
    expect(getImageUrlForSize(annoyotronImage, "thumbnail")!.url).toStrictEqual(
      "https://some.path.to.image/thumbnail_Annoyotron_full_800w_78989563b1.webp"
    )
    expect(getImageUrlForSize(annoyotronImage, "small")!.url).toStrictEqual(
      "https://some.path.to.image/small_Annoyotron_full_800w_78989563b1.webp"
    )
    expect(getImageUrlForSize(annoyotronImage, "medium")!.url).toStrictEqual(
      "https://some.path.to.image/medium_Annoyotron_full_800w_78989563b1.webp"
    )
    expect(getImageUrlForSize(annoyotronImage, "large")!.url).toStrictEqual(
      "https://some.path.to.image/medium_Annoyotron_full_800w_78989563b1.webp"
    )
    expect(getImageUrlForSize(annoyotronImage)!.url).toStrictEqual(
      "https://some.path.to.image/Annoyotron_full_800w_78989563b1.webp"
    )
  })
})
