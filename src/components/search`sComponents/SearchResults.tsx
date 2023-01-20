/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { TypeHits } from "@/pages/api/types";

type Props = {
  items: TypeHits[];
};
export default function SearchResults({ items }: Props) {
  return (
    <>
      {items.map(function (item) {
        return (
          <div key={String(items.indexOf(item))} className="item">
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
            <div className="icon-container">
              <img src={item.document.icon} alt="icon" className="icon" />
              <div>
                <strong>User name</strong>
                <span className="gray-text">  lala</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
