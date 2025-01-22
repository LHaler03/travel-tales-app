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
  UploadContainer,
  Search,
  Success,
  Error,
  ReturnContainer,
  Buttons,
} from './AddLocation.styled';
import { ReviewButton } from '../../shared/ActionButton';
import { useNavigate } from 'react-router-dom';

const AddLocation: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [name, Setname] = useState('');
  const [showform, setShowform] = useState(true);
  const [messagenoname, setMessagenoname] = useState(false);
  const [messageSucces, setMessageSucces] = useState(false);
  const [messagenoaddress, setMessagenoaddress] = useState(false);
  const [messagevalidaddress, setMessagevalidaddress] = useState(false);
  const [messagetwopictures, setMessagetwopictures] = useState(false);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{
    lat: number | '';
    lon: number | '';
  }>({
    lat: '',
    lon: '',
  });
  const [locationDetails, setLocationDetails] = useState({
    country: '',
  });
  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessagenoaddress(false);
    setMessagevalidaddress(false);
    if (!address) {
      setMessagenoaddress(true);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address,
        )}&format=json&addressdetails=1`,
      );
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        const { lat, lon, address } = response.data[0];
        const country = address?.country || 'N/A';
        setCoordinates({ lat, lon });
        setLocationDetails({ country });
      } else {
        setMessagevalidaddress(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessagetwopictures(false);
    if (e.target.files) {
      // We expect exactly two images, but can allow more validation later.
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imageFiles.length);
    if (!address) {
      setMessagenoaddress(true);
      return;
    }
    if (!name) {
      setMessagenoname(true);
      return;
    }
    if (imageFiles.length < 2) {
      setMessagetwopictures(true);
      return;
    }
    const locationData = {
      name: name,
      country: locationDetails.country,
      lat: coordinates.lat,
      lon: coordinates.lon,
    };

    try {
      const response = await axios.put(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/locations`,
        locationData,
      );

      const formDataImages = new FormData();
      formDataImages.append('image1', imageFiles[0]);
      formDataImages.append('image2', imageFiles[1]);
      formDataImages.append('locationId', response.data.id);

      await axios.post(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/locations/upload-images`,
        formDataImages,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      setCoordinates({ lat: '', lon: '' });
      setLocationDetails({ country: '' });
      Setname('');
      setShowform(false);
      setMessageSucces(true);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <>
      {showform && (
        <>
          <Container>
            <Title>Add New Location</Title>
            <Description>
              Please enter address of the location you want to add!
            </Description>
            <div>
              <Search
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <ReviewButton onClick={handleSearch}>Search</ReviewButton>
            </div>
            {messagenoaddress && <Error>Please enter an address!</Error>}
            {messagevalidaddress && (
              <Error>Please enter an valid address!</Error>
            )}
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor='name'>Location:</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Enter location name...'
                  value={name}
                  onChange={(c) => {
                    Setname(c.target.value);
                    setMessagenoname(false);
                  }}
                />
              </FormField>
              {messagenoname && <Error>Please enter an valid address!</Error>}
              <FormField>
                <Label htmlFor='country'>Country:</Label>
                <Input
                  id='country'
                  name='country'
                  type='text'
                  placeholder='Country'
                  value={locationDetails.country}
                  required
                  readOnly
                />
              </FormField>

              <FormField>
                <Label htmlFor='lat'>Latitude:</Label>
                <Input
                  id='lat'
                  name='lat'
                  type='text'
                  placeholder='Latitude'
                  value={coordinates.lat}
                  required
                  readOnly
                />
              </FormField>

              <FormField>
                <Label htmlFor='lon'>Longitude:</Label>
                <Input
                  id='lon'
                  name='lon'
                  type='text'
                  placeholder='Longitude'
                  value={coordinates.lon}
                  required
                  readOnly
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
                  />
                </UploadContainer>
              </FormField>
              {messagetwopictures && (
                <Error>Please upload at least 2 pictures!</Error>
              )}
              <ReviewButton type='submit'>Add Location</ReviewButton>
            </Form>
          </Container>
        </>
      )}
      {messageSucces && (
        <>
          <ReturnContainer>
            <Success>Location added successfully!</Success>
            <Buttons>
              <ReviewButton onClick={() => navigate('/addlocation')}>
                Add another location
              </ReviewButton>
              <ReviewButton onClick={() => navigate('/adminDashboard')}>
                Return to admin dashboard
              </ReviewButton>
            </Buttons>
          </ReturnContainer>
        </>
      )}
    </>
  );
};

export default AddLocation;
