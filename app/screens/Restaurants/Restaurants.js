import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);
  return (
    <View style={styles.viewBody}>
      <Text> Estamos en Restaurantes.</Text>
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}
function AddRestaurantButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
