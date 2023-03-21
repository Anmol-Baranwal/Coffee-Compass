import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>The Coffee </span>
        <span className={styles.title2}>Stores</span>
      </h1>
      <p className={styles.subTitle}>View coffee stores nearby</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonTxt}
        </button>
      </div>
    </div>
  );
};

export default Banner;
