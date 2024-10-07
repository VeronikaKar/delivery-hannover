import s from "./Loader.module.css";
export default function ({ myHeight }) {
  return (
    <div style={{ height: myHeight }} className={s.container}>
      <div className={s.loader}></div>
    </div>
  );
}
