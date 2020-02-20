import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  return (
    <ScrollView>
      <ImageRestaurant imageRestaurant={imagesSelected[0]} />
      <FormAdd />
      <UploadImagen
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}
function ImageRestaurant(props) {
  const { imageRestaurant } = props;

  return (
    <View style={styles.viewPhoto}>
      {imageRestaurant ? (
        <Image
          source={{ uri: imageRestaurant }}
          style={{ width: WidthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: WidthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImagen(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    const resultPermissionCamera = resultPermission.permissions.cameraRoll;
    if (resultPermissionCamera.status === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes y activarlos manualmente",
        5000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar ninguna imagen.",
          3000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };
  const removeImage = image => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar Imagen.",
      "Estas seguro de eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter(imageUrl => imageUrl !== image)
            )
        }
      ],
      { cancelable: false }
    );
  };

  console.log(imagesSelected);
  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map(imageRestaurant => (
        <Avatar
          key={imageRestaurant}
          onPress={() => removeImage(imageRestaurant)}
          style={styles.miniatureStyle}
          source={{ uri: imageRestaurant }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="nombre del Restaurante"
        containerStyle={styles.input}
        onChange={() => console.log("nombre del restaurante actualizado")}
      />

      <Input
        placeholder="dirección"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: "#c2c2c2",
          onPress: () => console.log("Selecciona la ubicación")
        }}
        onChange={() => console.log("direccion del restaurante actualizado")}
      />
      <Input
        placeholder="Descripción del restaurante"
        multiline={true}
        containerStyle={styles.textArea}
        onChange={() => console.log("descripción actualizada")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
