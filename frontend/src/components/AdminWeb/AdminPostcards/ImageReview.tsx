import { useState } from 'react';
import { Title, ImageGrid, Modal, ModalImage, ModalButtons, ApproveButton, DisapproveButton, Thumbnail } from './ImageReview.styled.tsx'; // Uključujemo stilove

const images = [
  '/images/1.avif',
  '/images/2.jpg',
  '/images/1.avif',
  '/images/2.jpg',
  '/images/1.avif',
  '/images/2.jpg',
  '/images/1.avif',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/2.jpg',
  '/images/1.avif',
  '/images/1.avif',
  '/images/1.avif',
  '/images/1.avif',
  '/images/1.avif',


];

const ImageReview = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          <ModalImage src={selectedImage} alt="Selected" />
          <ModalButtons>
            <ApproveButton>Approve</ApproveButton>
            <DisapproveButton>Disapprove</DisapproveButton>
          </ModalButtons>
        </Modal>
      )}
    </div>
  );
};

export default ImageReview;
