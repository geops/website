import BlogListItem from "./BlogListItem.js";

export default function BlogList({ list }) {
  return (
    <>
      <div className="bg-gray-lighter">
        {list.map((item) => (
          <BlogListItem item={item} key={item.slug} />
        ))}
      </div>
    </>
  );
}
