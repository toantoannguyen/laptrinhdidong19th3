import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Dữ liệu giả lập cho Top Categories (slideshow)
const categories = [
  {
    id: "1",
    title: "Pizza",
    image: "https://via.placeholder.com/150x100?text=Pizza",
  },
  {
    id: "2",
    title: "Burgers",
    image: "https://via.placeholder.com/150x100?text=Burgers",
  },
  {
    id: "3",
    title: "Steak",
    image: "https://via.placeholder.com/150x100?text=Steak",
  },
];

// Dữ liệu giả lập cho Popular Items
const popularItems = [
  {
    id: "1",
    name: "Food Viet Nam",
    price: 15,
    image: "https://via.placeholder.com/100x100?text=Food+Viet+Nam",
    discount: "10% OFF",
  },
  {
    id: "2",
    name: "Food By",
    price: 35,
    image: "https://via.placeholder.com/100x100?text=Food+By",
    discount: null,
  },
];

const ExplorerScreen = () => {
  // Trạng thái cho slideshow
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  // Render item cho Top Categories (slideshow)
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  // Render item cho Popular Items
  const renderPopularItem = ({ item }) => (
    <View style={styles.popularItem}>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularInfo}>
        <Text style={styles.popularName}>{item.name}</Text>
        <Text style={styles.popularPrice}>${item.price}</Text>
        {item.discount && (
          <Text style={styles.discountText}>{item.discount}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for meals or area"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Phần Top Categories (Slideshow) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={(e) => {
            const index = Math.floor(
              e.nativeEvent.contentOffset.x /
                (Dimensions.get("window").width - 40)
            );
            setCurrentSlide(index);
          }}
        />
      </View>

      {/* Phần Popular Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularItems}
          renderItem={renderPopularItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
  },
  filterText: {
    color: "blue",
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewAll: {
    color: "blue",
    fontSize: 16,
  },
  categoryItem: {
    width: 150,
    marginRight: 10,
    alignItems: "center",
  },
  categoryImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  popularItem: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  popularImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  popularInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  popularName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  popularPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  discountText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});

export default ExplorerScreen;
