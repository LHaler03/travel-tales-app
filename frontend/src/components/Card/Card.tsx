import { Cards, Cardmap, SingleCard, Picture, City } from './Card.styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const data = [
  {
    grad: 'Pariz',
    image: './images/eiffeltower.png',
  },
  {
    grad: 'New York',
    image: './images/kipslobode.png',
  },
  {
    grad: 'London',
    image: './images/bigben.png',
  },
  {
    grad: 'LA',
    image: './images/hollywood.png',
  },
  {
    grad: 'Rio de Janeiro',
    image: './images/christ.png',
  },
];

export const Card = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <>
      <Cards>
        <Cardmap>
          <Slider {...settings}>
            {data.map((d, index) => (
              <SingleCard key={index}>
                <Picture>
                  <img src={d.image} alt={d.grad} />
                </Picture>
                <City>
                  <p>{d.grad}</p>
                </City>
              </SingleCard>
            ))}
          </Slider>
        </Cardmap>
      </Cards>
    </>
  );
};
