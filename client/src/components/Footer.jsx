import style from "../css/app.module.css";

const Footer = () => {
  return (
    <footer id="footer" className={style.footer}>
      <div className={style.social}>
        <a className="nav-link" href="instagram">
          <i className="bi bi-instagram" />
        </a>
        <a className="nav-link" href="facebook">
          <i className="bi bi-facebook" />
        </a>
        <a className="nav-link" href="twitter">
          <i className="bi bi-twitter" />
        </a>
        <a className="nav-link" href="github">
          <i className="bi bi-github" />
        </a>
        <a className="nav-link" href="envelope">
          <i className="bi bi-envelope" />
        </a>
      </div>
      <small>This is some Copiright statement - 2023</small>
    </footer>
  );
};

export default Footer;
