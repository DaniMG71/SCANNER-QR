import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const QrScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setLoading(true);
    setProduct(null);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      const json = await response.json();

      if (json.status === 1) {
        setProduct(json.product);
      } else {
        setProduct({ error: "Producto no encontrado en la base de datos." });
      }
    } catch (err) {
      console.error(err);
      setProduct({ error: "Error consultando la API" });
    }

    setLoading(false);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "qr"], // soporta EAN y QR
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ alignItems: "center", padding: 20 }}>
          {loading && <ActivityIndicator size="large" color="#B71C1C" />}
          {product && !product.error && (
            <View style={styles.card}>
              {product.image_url ? (
                <Image source={{ uri: product.image_url }} style={styles.cardImage} />
              ) : (
                <View style={[styles.cardImage, { justifyContent: "center", alignItems: "center" }]}>
                  <Text>No Image</Text>
                </View>
              )}
              <Text style={styles.cardTitle}>{product.product_name || "Sin nombre"}</Text>
              <Text style={styles.cardSubText}>{product.brands || "Marca desconocida"}</Text>
            </View>
          )}
          {product && product.error && (
            <Text style={{ color: "red", fontSize: 16 }}>{product.error}</Text>
          )}

          <TouchableOpacity
            style={styles.scanAgain}
            onPress={() => {
              setScanned(false);
              setProduct(null);
            }}
          >
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={{ color: "#fff", marginLeft: 10 }}>Escanear de nuevo</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  camera: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    width: "100%",
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
  },
  cardImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#000" },
  cardSubText: { fontSize: 16, color: "#555", marginTop: 5 },
  scanAgain: {
    flexDirection: "row",
    backgroundColor: "#0066B3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});

export default QrScanner;
