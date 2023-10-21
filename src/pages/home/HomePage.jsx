import { Link } from "react-router-dom";

const HomePage = () => {

   return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Jem's repair</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in your heart
        </p>
        <address className="public__addr">
          Jem's actions
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner:Jem</p>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
};

export default HomePage;
