import axios from 'axios';
import React, { useState } from 'react';
import {
  City,
  Form,
  FormContainer,
  Comment,
  Rating,
  InputContainer,
  SubmitButton,
  Buttons,
} from './Review.styled';

type ReviewProps = {
  city: string;
  locationId: number;
};

export const Review: React.FC<ReviewProps> = ({ city, locationId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | ''>();
  const userId = '009790e7-34ed-47dd-bdb6-7376f2c406c7';

  const handleSubmit = async (rev: React.FormEvent) => {
    rev.preventDefault();
    try {
      await axios.post('http://localhost:5185/api/reviews', {
        comment,
        rating,
        locationId,
        userId,
      });

      setComment('');
      setRating('');
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <>
      <City>{city}</City>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <p>Rating:</p>
          <InputContainer>
            <Rating
              type='number'
              min={1}
              max={5}
              value={rating}
              onChange={(r) =>
                setRating(r.target.value === '' ? '' : Number(r.target.value))
              }
              placeholder='Rate 1-5'
              required
            />
          </InputContainer>
          <p>Comment:</p>
          <Comment
            value={comment}
            onChange={(c) => setComment(c.target.value)}
            placeholder='Write your review here...'
            required
            maxLength={500}
          />
          <Buttons>
            <SubmitButton type='submit'>Submit review</SubmitButton>
          </Buttons>
        </Form>
      </FormContainer>
    </>
  );
};
