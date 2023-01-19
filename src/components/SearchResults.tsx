import { typeHits } from "@/pages/api/types";
type Props = {
  items: typeHits[];
};

export default function SearchResults({ items }: Props) {
  return (
    <>
      {items.map(function (item) {
        return (
          <div key={item.document.title} className="item">
            <a
              href={item.document.link}
              className="item-title"
              target="_blank"
              rel="noreferrer"
            >
              {item.document.title}
            </a>
            <div>
              <p className="gray-text fs-14">{item.document.desc}</p>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
}
