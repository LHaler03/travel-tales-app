import { useState } from 'react';
import { StyledFaStar, StarInput } from './Star.styled';

export const Star = () => {
  const [rating, setRating] = useState<number>(3);
  const [starcolor, _] = useState<number>(0);
  const [hoverstar, setHoverstar] = useState<number>(0);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const currentrating = index + 1;
        return (
          <label>
            <StarInput
              type='radio'
              name='rate'
              value={currentrating}
              onClick={() => setRating(currentrating)}
              aria-label={`Rate ${currentrating} stars`}
            />
            <StyledFaStar
              color={
                currentrating <= (hoverstar || starcolor || rating || 0)
                  ? 'yellow'
                  : 'white'
              }
              onMouseEnter={() => setHoverstar(currentrating)}
              onMouseLeave={() => setHoverstar(0)}
            />
          </label>
        );
      })}
    </div>
  );
};
