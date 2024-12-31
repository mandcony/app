import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Qa6FaGp5CnbRec5A131WMvI4xQ4VE8hx1FxRii3qFoRSnxs5iJrLRQdTqYgjFkNIeESkcu38CuZP9NdxXvyZfjf00Ngubc0yn');

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems, totalAmount } = route.params;
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    // Create a PaymentIntent on the client side
    const { error, paymentIntent } = await stripe.createPayment({
      amount: totalAmount * 100, // amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    if (error) {
      console.error('Payment creation error', error);
      setLoading(false);
      return;
    }

    // Confirm the payment with the client secret
    const { error: confirmError, paymentIntent: confirmedPaymentIntent } = await confirmPayment(paymentIntent.client_secret, {
      type: 'Card',
      billingDetails: {
        // Add your billing details here
      },
    });

    if (confirmError) {
      console.error('Payment confirmation error', confirmError);
    } else if (confirmedPaymentIntent) {
      console.log('Payment successful', confirmedPaymentIntent);
      alert('Payment successful!');
      navigation.goBack();
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
        <Text style={styles.payButtonText}>Pay ${totalAmount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  card: {
    backgroundColor: '#efefef',
  },
  payButton: {
    backgroundColor: '#0984e3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;