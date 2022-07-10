import Header from '../header/header';

function NotFound():JSX.Element {
  return (
    <div>
      <main >
        <Header/>
        <div >
          <section>
            <h1 style={{textAlign: 'center'}}>404 Page Not Found</h1>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
