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
  Editreview,
} from './Review.styled';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Review = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | ''>();
  const [errorrating, setErrorrating] = useState('');
  const [errorcomment, setErrorcomment] = useState('');
  const [submitsuccess, setSubmitsuccess] = useState(false);
  const [showreviewform, setShowreviewform] = useState(true);
  const [doublereview, setDoublereview] = useState(false);
  const [submiteditreview, setSubmiteditreview] = useState(false);
  const [reviewid, setReviewid] = useState<number | ''>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { city, locationId } = location.state || {};

  const handleSubmiteditreview = async () => {
    try {
      await axios.put(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/reviews/${reviewid}`,
        {
          comment,
          rating,
        },
      );
      setComment('');
      setRating('');
      setErrorrating('');
      setErrorcomment('');
      setShowreviewform(false);
      setSubmitsuccess(true);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  const handleSubmit = async (rev: React.FormEvent) => {
    rev.preventDefault();
    setSubmitsuccess(false);

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
      setDoublereview(false);
      setShowreviewform(false);
      setSubmitsuccess(true);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setDoublereview(true);
        setShowreviewform(false);
      }
      console.error('Error submitting review', error);
    }
  };

  const handleEditReview = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/reviews/user/${user?.id}/location/${locationId}`,
      );
      const userreview = response.data;
      setComment(userreview.comment);
      setRating(userreview.rating);
      setReviewid(userreview.id);
      setDoublereview(false);
      setSubmiteditreview(true);
      setShowreviewform(true);
    } catch (error) {
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
                {submiteditreview ? (
                  <SubmitButton onClick={handleSubmiteditreview}>
                    Submit edited review
                  </SubmitButton>
                ) : (
                  <SubmitButton type='submit'>Submit review</SubmitButton>
                )}
              </Buttons>
            </Form>
          </FormContainer>
        </>
      )}
      {submitsuccess && (
        <>
          <ReturnContainer>
            <Success>
              Your review was submitted successfully! Thank you!
            </Success>
            <Buttons>
              <Editreview onClick={handleEditReview}>Edit review</Editreview>
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
            </Buttons>
          </ReturnContainer>
        </>
      )}
      {doublereview && (
        <>
          <ReturnContainer>
            <Error>
              You can not submit multiple reviews! If you wish to change your
              existing press the edit review button
            </Error>
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
              <Editreview onClick={handleEditReview}>Edit review</Editreview>
            </Buttons>
          </ReturnContainer>
        </>
      )}
    </>
  );
};
