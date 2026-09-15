import Icon from "./Icon";
export default function Footer() {
  return (
    <footer className="container footer">
      <a href="#home" className="footer-name">
        Asfand Yar<span className="accent">.</span>
      </a>
      <p>© {new Date().getFullYear()} Asfand Yar</p>
      <a href="#home">
        Back to top{" "}
        <Icon name="arrow" style={{ transform: "rotate(-90deg)" }} />
      </a>
    </footer>
  );
}
