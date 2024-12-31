import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

// Array of images from the "assets/images" folder
const journeyImages = [
  require('../assets/images/0F04F927-2236-4EE1-BDB6-E0FB75A07D8A.jpg'),
  require('../assets/images/4EF61767-0D2D-4221-AB53-D4E869742736.jpg'),
  require('../assets/images/5F5EB97E-30DD-43BB-AA2E-07747AD22D0A.jpg'),
  require('../assets/images/8D5D78AE-2AE0-443D-B6A4-3F07A6933700.jpg'),
  require('../assets/images/11BC3CF4-158D-487D-887D-87325C6963F3.jpg'),
  require('../assets/images/64E51ECE-C2F3-4E95-BC78-3509830F221F.jpg'),
  require('../assets/images/77A6E163-17A9-4CF5-8D1D-EE38EA7E313B.jpg'),
  require('../assets/images/078D6D3C-46DE-4F0A-B506-DC3C2C2069EF.jpg'),
  require('../assets/images/592EF70D-CB84-479D-92AC-CDCDAA4B5142.jpg'),
  require('../assets/images/71587C5F-F643-4486-9A78-C53274A3B75A.jpg'),
  require('../assets/images/AB4B5798-D4ED-4342-86C2-3F48F26A01F1.jpg'),
  require('../assets/images/B3504862-2F35-44CA-8D02-E49CE693ADAF.jpg'),
  require('../assets/images/C1D9ED80-1B15-4CBA-A221-B7D987FC1B54.jpg'),
  require('../assets/images/F5DEEA37-885D-4F98-898A-AFCAE0AA546E.jpg'),
  require('../assets/images/IMG_0064.jpg'),
  
];

const Info = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ethos Section */}
      <View style={styles.ethosContainer}>
        <Text style={styles.ethosText}>
          Maicol & Co. isn’t just about clothes – Our pieces tell stories – your stories;
          they’re about repping where you’ve been, where you’re going, and how you make it happen.
        </Text>
        <Text style={styles.ethosText}>
          Built with authenticity, we are driven to inspire and innovate. Every stitch, every design,
          and every detail reflects the energy of the culture that shapes us.
        </Text>
      </View>

      {/* Image Gallery */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Journey</Text>
        <View style={styles.imageGallery}>
          {journeyImages.map((image, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => openImageModal(image)}>
              <Image source={image} style={styles.image} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>

      {/* Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.fullImage} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  ethosContainer: {
    marginTop: 60, // Added spacing to avoid clipping at the top
    marginBottom: 40,
  },
  ethosText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default Info;
