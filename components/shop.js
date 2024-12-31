import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from 'react-native';

const products = [
  {
    id: '2',
    name: 'Zip-Through Boxy Hoodie',
    category: 'Sweaters',
    images: [
      require('../assets/hoodies/DWWHOODIE.png'),
      require('../assets/hoodies/DWWHOODIEBACK.png'),
    ],
    price: '$80.00',
    stripeLink: 'https://buy.stripe.com/8wM8zt1yJ1uR3D2aEI',
  },
  {
    id: '1',
    name: 'Jogger Sweatpants',
    category: 'Pants',
    images: [
      require('../assets/pants/DWWPANT.png'),
      require('../assets/pants/DWWPANTBACK.png'),
    ],
    price: '$80.00',
    stripeLink: 'https://buy.stripe.com/bIYeXRelv7Tf8XmbIL',
  },
];

const { width, height } = Dimensions.get('window');

const Shop = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleCheckout = (stripeLink) => {
    Linking.openURL(stripeLink).catch(() =>
      Alert.alert('Error', 'Unable to open the checkout link.')
    );
  };

  return (
    <View style={styles.container}>
      {/* Enlarged Image Modal */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.fullImage} resizeMode="contain" />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Front Image */}
            <TouchableOpacity onPress={() => handleImageClick(item.images[0])}>
              <Image source={item.images[0]} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>

            {/* Back Image */}
            <TouchableOpacity onPress={() => handleImageClick(item.images[1])}>
              <Image source={item.images[1]} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>

            {/* Product Info and Buy Button */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => handleCheckout(item.stripeLink)}
              >
                <Text style={styles.checkoutButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center', // Center images and text
  },
  image: {
    width: width * 0.8, // Wider image for better display
    height: 200,
    marginBottom: 10, // Space between images
    borderRadius: 8,
  },
  infoContainer: {
    alignItems: 'center', // Center text and button
  },
  name: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#00b894',
    marginBottom: 10,
  },
  checkoutButton: {
    padding: 10,
    backgroundColor: '#0984e3',
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#fff', // White background
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width * 0.9, // Larger size for better focus
    height: height * 0.7,
    resizeMode: 'contain',
  },
});

export default Shop;
