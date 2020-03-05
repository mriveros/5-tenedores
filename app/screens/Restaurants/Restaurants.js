import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const limitRestaurants = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("restaurants")
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });
    (async () => {
      const resultRestaurants = [];
      const restaurants = db
        .collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurants);
      await restaurants.get().then(response => {
        setStartRestaurants(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          let restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });

        setRestaurants(resultRestaurants);
      });
    })();
  }, []);

  const handleLoadMore = async () => {
    const resultRestaurant = [];
    restaurant.length < totalRestaurants && setIsLoading(true);
    const restaurantDb = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(8);

    await restaurant.Db.get().then(response => {
      if (response.docs.length > 0) {
        setStartRestaurants(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurant.push({ restaurant });
      });
      setRestaurants([...restaurants, ...resultRestaurant]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
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
