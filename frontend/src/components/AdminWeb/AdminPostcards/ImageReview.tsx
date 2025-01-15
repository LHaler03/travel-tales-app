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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5185/api/');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image: string) => {
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
            src={image}
            alt={`Review ${index}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </ImageGrid>

      {selectedImage && (
        <Modal onClick={closeModal}>
          <ModalImage src={selectedImage} alt='Selected' />
          <ModalButtons>
            <ApproveButton
              onClick={() => {
                /* Handle approve logic */
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
