import axios from 'axios';
import React, { useState } from 'react';

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
      <h1>{city}</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
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
          </div>
          <textarea
            value={comment}
            onChange={(c) => setComment(c.target.value)}
            placeholder='Write your review here...'
            required
          />
          <button type='submit'>Submit review</button>
        </form>
      </div>
    </>
  );
};
