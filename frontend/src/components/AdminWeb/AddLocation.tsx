import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  Description,
  Form,
  FormField,
  Label,
  Input,
  FileInput,
  Button,
  UploadContainer,
} from './AddLocation.styled';

const AddLocation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    lat: '',
    lon: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // We expect exactly two images, but can allow more validation later.
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the location data to send via the API.
    const locationData = {
      name: formData.name,
      country: formData.country,
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
    };

    try {
      // First, send location data (adjust endpoint as needed)
      const response = await axios.put(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/locations`,
        locationData,
      );

      // Optionally, handle image uploads (this can be sent in a separate request)
      // Here you could use FormData to send the images and the location id obtained from response
      if (imageFiles.length >= 2) {
        const formDataImages = new FormData();
        // For example, append two images:
        formDataImages.append('image1', imageFiles[0]);
        formDataImages.append('image2', imageFiles[1]);
        // If the API returns the new location id, you can add it too:
        formDataImages.append('locationId', response.data.id);

        await axios.post(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/locations/upload-images`,
          formDataImages,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
      }

      setMessage('Location added successfully!');
      // Reset form or redirect as needed.
    } catch (error) {
      console.error('Error adding location:', error);
      setMessage('Failed to add location.');
    }
  };

  return (
    <Container>
      <Title>Add New Location</Title>
      <Description>
        Please fill in the details below. Enter the location’s display name,
        country, and its coordinates. You can also upload at least two images
        for the location. The coordinates may be obtained via an address search
        API.
      </Description>

      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor='name'>Display Name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Enter location name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor='country'>Country</Label>
          <Input
            id='country'
            name='country'
            type='text'
            placeholder='Enter country'
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor='lat'>Latitude</Label>
          <Input
            id='lat'
            name='lat'
            type='text'
            placeholder='Enter latitude'
            value={formData.lat}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor='lon'>Longitude</Label>
          <Input
            id='lon'
            name='lon'
            type='text'
            placeholder='Enter longitude'
            value={formData.lon}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField>
          <Label>Upload Images (minimum 2)</Label>
          <UploadContainer>
            <FileInput
              type='file'
              accept='image/*'
              multiple
              onChange={handleFileChange}
              required
            />
          </UploadContainer>
        </FormField>

        <Button type='submit'>Add Location</Button>
      </Form>

      {message && <p>{message}</p>}
    </Container>
  );
};

export default AddLocation;
