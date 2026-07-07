import { PortableText } from '@portabletext/react'
import { getPost, getPosts } from '../../../lib/sanity-client'
import { urlFor } from '../../../sanity/lib/image'
import styles from './page.module.css'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug.current }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Maslow`,
    description: post.excerpt,
  }
}

const components = {
  block: {
    normal: ({ children }) => <p className={styles.bodyP}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.bodyH2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.bodyH3}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={styles.bodyQuote}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value.href} className={styles.link} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={styles.bodyUl}>{children}</ul>,
    number: ({ children }) => <ol className={styles.bodyOl}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.bodyLi}>{children}</li>,
    number: ({ children }) => <li className={styles.bodyLi}>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <img
          src={urlFor(value).width(800).auto('format').url()}
          alt={value.alt || ''}
          className={styles.bodyImg}
        />
      )
    },
  },
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          {post.author && <span className={styles.author}>by {post.author}</span>}
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </div>
      {post.mainImage?.asset?._ref && (
        <img
          src={urlFor(post.mainImage).width(1200).auto('format').url()}
          alt={post.mainImage.alt || post.title}
          className={styles.coverImg}
        />
      )}
      <div className={styles.body}>
        {post.body && <PortableText value={post.body} components={components} />}
      </div>
    </div>
  )
}