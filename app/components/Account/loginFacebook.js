import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook() {
  const login = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      {
        permissions: FacebookApi.permissions
      }
    );
    console.log(type);
  };
  return (
    <SocialIcon
      title="Iniciar Sesión con Facebook"
      button
      type="facebook"
      onPress={login}
    />
  );
}
