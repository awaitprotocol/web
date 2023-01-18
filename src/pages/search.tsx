import Image from "next/image";
import styles from "@/styles/search.module.css";
import filters from "../assets/images/filter.png";
import close from "../assets/images/close.png";
import search from "../assets/images/icons-search.png";

const Search = () => {
  const getResult = () => {
    ///
  };
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerText}>
            Search<span className="color-orange">.</span>
          </h1>
          <p className={styles.text}>
            <span className="gray-text">Searching for information on</span>
            <strong> Bodybuilding</strong>
          </p>
        </div>
        <div>
          <form className={styles.searchForm}>
            <input placeholder="..." className={styles.search} type="text" />
            <div className="float-right btns">
              <div className={styles.container}>
                <Image src={close} alt="close" className={styles.image} />
              </div>
              <div className={styles.container}>
                <Image src={filters} alt="filters" className={styles.image} />
              </div>
              <figure className="btn" type="submit" onClick={getResult}>
                <Image
                  src={search}
                  alt="search-icon"
                  className={styles.image}
                />
                <figcaption>Go!</figcaption>
              </figure>
            </div>
          </form>
        </div>
      </div>
      <div>...список...</div>
    </div>
  );
};
export default Search;
