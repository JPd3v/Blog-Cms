import { Link } from 'react-router-dom';
import DeleteArticleButton from './DeleteArticleButton';
import type { Article } from './UserArticles';

interface ComponentProps {
  article: Article;
}

export default function ArticlePreview({ article }: ComponentProps) {
  const articleDate = new Date(article.published_date).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <h1 className="article-preview__title">
        <Link to={`/article/${article._id}`}>{article.title}</Link>
      </h1>

      <p
        className={`article-preview__state ${
          article.published
            ? 'article-preview__state--published'
            : 'article-preview__state--not-published'
        }`}
      >
        {article.published ? 'Published' : 'Not Published'}
      </p>

      <p className="article-preview__content">
        <Link to={`/article/${article._id}`}>{article.content}</Link>
      </p>

      <p className="article-preview__date">
        {articleDate === 'Invalid Date'
          ? 'Article never was published'
          : articleDate}
      </p>

      <div className="article-preview__delete-button">
        <DeleteArticleButton
          articleId={article._id}
          articleTitle={article.title}
        />
      </div>
    </>
  );
}
