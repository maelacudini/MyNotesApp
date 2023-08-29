import loading from "../assets/loading.png";
import style from "../css/app.module.css";

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.shadow}></div>
      <div className={style.shadow}></div>
      <div className={style.shadow}></div>
    </div>
  );
};

export default Loading;
