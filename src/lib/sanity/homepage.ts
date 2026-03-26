import {createClient} from '@sanity/client'

type SanityAboutCard = {
  title?: string
  text?: string
}

type SanityReview = {
  rating?: number
  text?: string
  author?: string
  source?: string
}

type SanityHomepage = {
  heroTitle?: string
  heroHighlight?: string
  heroSubtitle?: string
  aboutEyebrow?: string
  aboutHeading?: string
  aboutCards?: SanityAboutCard[]
  reviewsEyebrow?: string
  reviewsHeading?: string
  reviewsIntro?: string
  reviews?: SanityReview[]
}

export type HomepageContent = {
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  aboutEyebrow: string
  aboutHeading: string
  aboutCards: Array<{title: string; text: string}>
  reviewsEyebrow: string
  reviewsHeading: string
  reviewsIntro: string
  reviews: Array<{rating: number; text: string; author: string; source: string}>
}

const query = `*[_type == "homepage"][0]{
  heroTitle,
  heroHighlight,
  heroSubtitle,
  aboutEyebrow,
  aboutHeading,
  aboutCards[]{
    title,
    text
  },
  reviewsEyebrow,
  reviewsHeading,
  reviewsIntro,
  reviews[]{
    rating,
    text,
    author,
    source
  }
}`

const hasSanityConfig = () =>
  Boolean(import.meta.env.SANITY_PROJECT_ID && import.meta.env.SANITY_DATASET)

const getClient = () =>
  createClient({
    projectId: import.meta.env.SANITY_PROJECT_ID,
    dataset: import.meta.env.SANITY_DATASET,
    apiVersion: '2025-01-01',
    useCdn: true,
  })

const sanitizeText = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback

const sanitizeCards = (
  cards: SanityAboutCard[] | undefined,
  fallback: Array<{title: string; text: string}>
) => {
  if (!Array.isArray(cards) || cards.length === 0) return fallback
  const normalized = cards
    .map((card) => ({
      title: sanitizeText(card?.title, ''),
      text: sanitizeText(card?.text, ''),
    }))
    .filter((card) => card.title && card.text)
  return normalized.length > 0 ? normalized : fallback
}

const sanitizeReviews = (
  reviews: SanityReview[] | undefined,
  fallback: Array<{rating: number; text: string; author: string; source: string}>
) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return fallback
  const normalized = reviews
    .map((review) => ({
      rating:
        typeof review?.rating === 'number'
          ? Math.max(1, Math.min(5, Math.round(review.rating)))
          : 5,
      text: sanitizeText(review?.text, ''),
      author: sanitizeText(review?.author, ''),
      source: sanitizeText(review?.source, 'Google recenze'),
    }))
    .filter((review) => review.text && review.author)
  return normalized.length > 0 ? normalized : fallback
}

export const getHomepageContent = async (
  fallback: HomepageContent
): Promise<HomepageContent> => {
  if (!hasSanityConfig()) return fallback

  try {
    const data = await getClient().fetch<SanityHomepage | null>(query)
    if (!data) return fallback

    return {
      heroTitle: sanitizeText(data.heroTitle, fallback.heroTitle),
      heroHighlight: sanitizeText(data.heroHighlight, fallback.heroHighlight),
      heroSubtitle: sanitizeText(data.heroSubtitle, fallback.heroSubtitle),
      aboutEyebrow: sanitizeText(data.aboutEyebrow, fallback.aboutEyebrow),
      aboutHeading: sanitizeText(data.aboutHeading, fallback.aboutHeading),
      aboutCards: sanitizeCards(data.aboutCards, fallback.aboutCards),
      reviewsEyebrow: sanitizeText(data.reviewsEyebrow, fallback.reviewsEyebrow),
      reviewsHeading: sanitizeText(data.reviewsHeading, fallback.reviewsHeading),
      reviewsIntro: sanitizeText(data.reviewsIntro, fallback.reviewsIntro),
      reviews: sanitizeReviews(data.reviews, fallback.reviews),
    }
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback content.', error)
    return fallback
  }
}
