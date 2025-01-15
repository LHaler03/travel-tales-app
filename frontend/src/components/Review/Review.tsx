import axios from 'axios';
import React, { useState } from 'react';
import {
  City,
  Form,
  FormContainer,
  Comment,
  Rating,
  RatingContainer,
  SubmitButton,
  Buttons,
  RatingNumbers,
  RatingDots,
  Error,
} from './Review.styled';
import { useAuth } from '../../context/AuthContext';

type ReviewProps = {
  city: string;
  locationId: number;
};

export const Review: React.FC<ReviewProps> = ({ city, locationId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | ''>();
  const [errorrating, setErrorrating] = useState('');
  const [errorcomment, setErrorcomment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (rev: React.FormEvent) => {
    rev.preventDefault();

    if (!rating) {
      setErrorrating('Please enter a rating!!!');
      return;
    }
    if (!comment) {
      setErrorcomment('Please enter a comment!!!');
      return;
    }
    try {
      await axios.post(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/reviews`,
        {
          comment,
          rating,
          locationId,
          userId: user?.id,
        },
      );

      setComment('');
      setRating('');
      setErrorrating('');
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <>
      <City>{city}</City>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <p>Rating:*</p>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((dots) => (
              <Rating key={dots}>
                <RatingNumbers>{dots}</RatingNumbers>
                <RatingDots
                  key={dots}
                  select={dots <= (rating || 0)}
                  onClick={() => {
                    setRating(dots);
                    setErrorrating('');
                  }}
                >
                  ●
                </RatingDots>
              </Rating>
            ))}
          </RatingContainer>
          {errorrating && <Error>{errorrating}</Error>}
          <p>Comment:*</p>
          <Comment
            value={comment}
            onChange={(c) => {
              setComment(c.target.value);
              setErrorcomment('');
            }}
            placeholder='Write your review here...'
            maxLength={500}
          />
          {errorcomment && <Error>{errorcomment}</Error>}
          <Buttons>
            <SubmitButton type='submit'>Submit review</SubmitButton>
          </Buttons>
        </Form>
      </FormContainer>
    </>
  );
};
