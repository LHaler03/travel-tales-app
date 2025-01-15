import { useState, useEffect } from 'react';
import {
  Title,
  ImageGrid,
  Modal,
  ModalImage,
  ModalButtons,
  Thumbnail,
} from './ImageReview.styled.tsx';
import { ApproveButton, DisapproveButton } from '../../../shared/ActionButton';
import axios from 'axios';

// const images = [
//   '/images/1.avif',
//   '/images/2.jpg',
//   '/images/1.avif',
//   '/images/2.jpg',
//   '/images/1.avif',
//   '/images/2.jpg',
//   '/images/1.avif',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/2.jpg',
//   '/images/1.avif',
//   '/images/1.avif',
//   '/images/1.avif',
//   '/images/1.avif',
//   '/images/1.avif',
// ];

const ImageReview = () => {
  const [selectedImage, setSelectedImage] = useState<{
    imageName: string;
    imageUrl: string;
  } | null>(null);
  const [images, setImages] = useState<
    { imageName: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/images-to-review`,
        );
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image: { imageName: string; imageUrl: string }) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Title>Image Review</Title>
      <ImageGrid>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image.imageUrl}
            alt={`Review ${index}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </ImageGrid>

      {selectedImage && (
        <Modal onClick={closeModal}>
          <ModalImage src={selectedImage.imageUrl} alt='Selected' />
          <ModalButtons>
            <ApproveButton
              onClick={async () => {
                const locationPartsArray = selectedImage.imageName.split('/');
                const locationId =
                  locationPartsArray[locationPartsArray.length - 2];
                await axios.post(
                  `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/approve-image`,
                  {
                    imageName: selectedImage.imageName,
                    locationId,
                  },
                );
              }}
            >
              Approve
            </ApproveButton>
            <DisapproveButton
              onClick={() => {
                /* Handle disapprove logic */
              }}
            >
              Disapprove
            </DisapproveButton>
          </ModalButtons>
        </Modal>
      )}
    </div>
  );
};

export default ImageReview;
