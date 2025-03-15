import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const banners = [
    { id: 1, image: "https://via.placeholder.com/600x300.png?text=New+Arrivals" },
    { id: 2, image: "https://via.placeholder.com/600x300.png?text=Trending+Now" },
    { id: 3, image: "https://via.placeholder.com/600x300.png?text=Exclusive+Discounts" },
  ];

  const categories = [
    { id: 1, name: "Dresses", image: "https://via.placeholder.com/100x100.png?text=Dresses" },
    { id: 2, name: "Tops", image: "https://via.placeholder.com/100x100.png?text=Tops" },
    { id: 3, name: "Bottoms", image: "https://via.placeholder.com/100x100.png?text=Bottoms" },
    { id: 4, name: "Shoes", image: "https://via.placeholder.com/100x100.png?text=Shoes" },
  ];

  const trendingProducts = [
    { id: 1, name: "Floral Dress", price: "$29.99", image: "https://via.placeholder.com/150.png?text=Floral+Dress" },
    { id: 2, name: "Casual Sneakers", price: "$39.99", image: "https://via.placeholder.com/150.png?text=Casual+Sneakers" },
    { id: 3, name: "Denim Jacket", price: "$49.99", image: "https://via.placeholder.com/150.png?text=Denim+Jacket" },
  ];

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.image }} style={styles.banner} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Clothique</Text>
        <TouchableOpacity>
          <Icon name="shopping-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Carousel Slider */}
      <Carousel
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 40}
        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trending Products */}
      <Text style={styles.sectionTitle}>Trending Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
        {trendingProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* CTA Buttons */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaText}>Shop Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up & Get 20% Off</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  logo: { fontSize: 28, fontWeight: "bold", color: "#000" },
  banner: { width: width - 40, height: 200, borderRadius: 10, resizeMode: "cover", marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  categoryScroll: { flexDirection: "row", marginVertical: 10 },
  categoryCard: { alignItems: "center", marginRight: 15 },
  categoryImage: { width: 80, height: 80, borderRadius: 50, marginBottom: 5 },
  categoryText: { fontSize: 14, fontWeight: "500" },
  productScroll: { flexDirection: "row", marginVertical: 10 },
  productCard: { alignItems: "center", marginRight: 15, backgroundColor: "#f8f8f8", padding: 10, borderRadius: 10 },
  productImage: { width: 120, height: 120, borderRadius: 10, marginBottom: 5 },
  productName: { fontSize: 14, fontWeight: "600" },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#e60023" },
  ctaButton: { backgroundColor: "#e60023", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signupButton: { backgroundColor: "#000", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  signupText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;
