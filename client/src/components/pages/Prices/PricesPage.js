import { Alert, Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getConcerts } from '../../../redux/concertsRedux';

const Prices = () => {
  const concerts = useSelector(getConcerts);

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <Alert color='info'>
        Attention!{' '}
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </Alert>

      {concerts.map((concert) => (
        <div key={concert._id}>
          <h2>Day {concert.day}</h2>
          <p>Price: {concert.price}$</p>

          {concert.day === 1 && (
            <p>
              Workshops: "Rock Music Style", "How to make you voice grooowl",
              "Make your voice stronger", "History of Rock"
            </p>
          )}
          {concert.day === 2 && (
            <p>
              Workshops: "Find your real tune", "Find your real YOU", "Fell the
              music", "Jam session"
            </p>
          )}
          {concert.day === 3 && (
            <p>
              Workshops: "Increase your vocal range", "How to properly warmup
              before singing", "It's time for YOU!"
            </p>
          )}
        </div>
      ))}
    </Container>
  );
};

export default Prices;
