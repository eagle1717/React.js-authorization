import styles from "assets/styles/PageContainer.module.css";

export default function PageContainer(props) {
  return <div className={styles.container}>{props.children}</div>;
}
