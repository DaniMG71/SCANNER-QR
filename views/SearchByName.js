import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchByName = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setPredictions([]);
      return;
    }

    // limpiar timeout anterior
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 500); // espera 500ms después de que el usuario deja de escribir

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const fetchProducts = async (text) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${text}&search_simple=1&action=process&json=1`
      );
      const data = await response.json();

      if (data.products) {
        setPredictions(data.products.slice(0, 5));
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error("Error buscando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Lista de predicciones */}
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.code?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.predictionItem}
              onPress={() => navigation.navigate("ProductDetail", { code: item.code })}
            >
              <Text style={styles.predictionText}>{item.product_name || "Sin nombre"}</Text>
              <Text style={styles.predictionBrand}>{item.brands}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {loading && <Text style={{ marginTop: 10 }}>Buscando...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 45,
    marginBottom: 15,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "RobotoSlab_400Regular",
    flex: 1,
    color: "#000",
  },
  predictionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  predictionText: {
    fontSize: 16,
    fontFamily: "RobotoSlab_700Bold",
    color: "#333",
  },
  predictionBrand: {
    fontSize: 13,
    color: "#666",
    fontFamily: "RobotoSlab_400Regular",
  },
});

export default SearchByName;
