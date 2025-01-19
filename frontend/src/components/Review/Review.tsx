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
  Success,
  ReturnContainer,
  Returnbutton,
} from './Review.styled';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Review = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | ''>();
  const [errordoublesubmit, setErrordoublesubmit] = useState('');
  const [errorrating, setErrorrating] = useState('');
  const [errorcomment, setErrorcomment] = useState('');
  const [submitsuccess, setSubmitsuccess] = useState('');
  const [showreviewform, setShowreviewform] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { city, locationId } = location.state || {};

  const handleSubmit = async (rev: React.FormEvent) => {
    rev.preventDefault();
    setErrordoublesubmit('');
    setSubmitsuccess('');

    if (!rating) {
      setErrorrating('Please enter a rating!!!');
      return;
    }
    if (!comment) {
      setErrorcomment('Please enter a comment!!!');
      return;
    }
    console.log('review: ', {
      comment,
      rating,
      locationId,
      userId: user?.id,
    });
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
      setErrorcomment('');
      setErrordoublesubmit('');
      setShowreviewform(false);
      setSubmitsuccess('Your review was submitted successfully! Thank you!');
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrordoublesubmit('You can not review a location twice!!');
      }
      console.error('Error submitting review', error);
    }
  };

  return (
    <>
      {showreviewform && (
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
                <Returnbutton
                  onClick={() =>
                    navigate('/fullmap', {
                      state: {
                        locationIdreview: locationId,
                        city,
                        showModalreview: true,
                      },
                    })
                  }
                >
                  Return to map
                </Returnbutton>
                <SubmitButton type='submit'>Submit review</SubmitButton>
              </Buttons>
              {errordoublesubmit && <Error>{errordoublesubmit}</Error>}
            </Form>
          </FormContainer>
        </>
      )}
      {submitsuccess && (
        <>
          <ReturnContainer>
            <Success>{submitsuccess}</Success>
            <Returnbutton
              onClick={() =>
                navigate('/fullmap', {
                  state: {
                    locationIdreview: locationId,
                    city,
                    showModalreview: true,
                  },
                })
              }
            >
              Return to map
            </Returnbutton>
          </ReturnContainer>
        </>
      )}
    </>
  );
};
