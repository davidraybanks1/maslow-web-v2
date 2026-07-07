import Link from 'next/link'
import { getPosts } from '../../lib/sanity-client'
import { urlFor } from '../../sanity/lib/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Blog — Maslow',
  description: 'Thoughts on needs, anxiety, and living with more intention.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>Blog</div>
        <h1 className={styles.headline}>Thoughts on living<br /><em>with more intention.</em></h1>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className={styles.postList}>
          {posts.map(post => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className={styles.postItem}>
              {post.mainImage?.asset?._ref && (
                <img
                  src={urlFor(post.mainImage).width(800).height(400).auto('format').fit('crop').url()}
                  alt={post.mainImage.alt || post.title}
                  className={styles.postImg}
                />
              )}
              <div className={styles.postMeta}>
                <span className={styles.postDate}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {post.categories?.length > 0 && (
                  <span className={styles.postCategory}>{post.categories[0]}</span>
                )}
              </div>
              <div className={styles.postTitle}>{post.title}</div>
              {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}</p>}
              <span className={styles.postRead}>Read →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}