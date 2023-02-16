import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>The coffee</span>
        <span className={styles.title2}>Project</span>
      </h1>
      <p className={styles.subTitle}>view coffee stores nearby</p>
      <button className={styles.button} onClick={props.handleOnClick} >{props.buttonTxt}</button>
    </div>
  );
};

export default Banner;
