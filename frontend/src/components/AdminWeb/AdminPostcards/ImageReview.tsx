import { useState, useEffect } from 'react';
import {
  Title,
  ImageGrid,
  Modal,
  ModalImage,
  ModalButtons,
  Thumbnail,
  Picturereview,
  Picturecity,
} from './ImageReview.styled.tsx';
import { ApproveButton, DisapproveButton } from '../../../shared/ActionButton';
import axios from 'axios';

const ImageReview = (imageReviewProps: { handleVisit: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<{
    imageName: string;
    imageUrl: string;
  } | null>(null);
  const [images, setImages] = useState<
    { imageName: string; imageUrl: string; locationName: string }[]
  >([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

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

    imageReviewProps.handleVisit();
    fetchImages();
  }, [refreshTrigger]);

  const handleImageClick = (image: { imageName: string; imageUrl: string }) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getLocationId = (imageName: string) => {
    const locationPartsArray = imageName.split('/');
    return locationPartsArray[locationPartsArray.length - 2];
  };

  const approveImage = async (selectedImage: {
    imageName: string;
    imageUrl: string;
  }) => {
    const locationId = getLocationId(selectedImage.imageName);
    await axios.post(
      `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/approve-image`,
      {
        imageName: selectedImage.imageName,
        locationId,
      },
    );
    setRefreshTrigger((prev) => prev + 1);
  };

  const rejectImage = async (selectedImage: {
    imageName: string;
    imageUrl: string;
  }) => {
    const locationId = getLocationId(selectedImage.imageName);
    await axios.post(
      `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/reject-image`,
      {
        imageName: selectedImage.imageName,
        locationId,
      },
    );
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <Title>Image Review</Title>
      <ImageGrid>
        {images.map((image, index) => (
          <Picturereview>
            <Thumbnail
              key={index}
              src={image.imageUrl}
              alt={`Review ${index}`}
              onClick={() => handleImageClick(image)}
            />
            <Picturecity>{image.locationName}</Picturecity>
          </Picturereview>
        ))}
      </ImageGrid>

      {selectedImage && (
        <Modal onClick={closeModal}>
          <ModalImage src={selectedImage.imageUrl} alt='Selected' />
          <ModalButtons>
            <ApproveButton onClick={async () => approveImage(selectedImage)}>
              Approve
            </ApproveButton>
            <DisapproveButton onClick={() => rejectImage(selectedImage)}>
              Disapprove
            </DisapproveButton>
          </ModalButtons>
        </Modal>
      )}
    </div>
  );
};

export default ImageReview;
