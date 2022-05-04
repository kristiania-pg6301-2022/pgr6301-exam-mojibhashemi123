import "../css/listArticle.css";

export function ListArticle() {
  return <div>{<Show />}</div>;
}

function Show() {
  function handleClick(el) {
    document.getElementById("sidebar").classList.toggle("active");
  }

  return (
    <div id="sidebar" onClick={({ target }) => handleClick(target)}>
      <h1>Articles</h1>
      <div className={"toggle-btn"}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li>Sport(333)</li>
        <li>Crime(222)</li>
        <li>Ikraine(33)</li>
        <li>Car(3)</li>
      </ul>
    </div>
  );
}
