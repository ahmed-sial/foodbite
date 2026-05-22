import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const SignIn = () => {
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordInvalid, setPasswordInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async () => {
    setEmailInvalid(false);
    setPasswordInvalid(false);
    if (!emailRegex.test(email)) {
      setEmailInvalid(true);
      return;
    }
    if (password.length < 8) {
      setPasswordInvalid(true);
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>FOODBITE</Text>
          <Text style={styles.mutedText}>Welcome Back</Text>
        </View>
        <VStack>
          <View style={styles.inputBox}>
            {/* Email */}
            <FormControl isInvalid={isEmailInvalid} size="lg" isRequired>
              <FormControlLabel>
                <FormControlLabelText>EMAIL</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="xl">
                <InputField
                  keyboardType="email-address"
                  type="text"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChangeText={setEmail}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon
                  as={AlertCircleIcon}
                  className="text-red-500"
                />
                <FormControlErrorText className="text-red-500">
                  Invalid email format.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            {/* Password */}
            <FormControl isInvalid={isPasswordInvalid} size="lg" isRequired>
              <FormControlLabel>
                <FormControlLabelText>PASSWORD</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="xl">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
              <FormControlError>
                <FormControlErrorIcon
                  as={AlertCircleIcon}
                  className="text-red-500"
                />
                <FormControlErrorText className="text-red-500">
                  Password must be at least 8 characters long.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button
              style={styles.button}
              size="xl"
              variant="solid"
              action="primary"
              disabled={isLoading}
              onPress={onSubmit}
            >
              <ButtonText>Sign in</ButtonText>
              {isLoading ? <ButtonSpinner color="gray" /> : null}
            </Button>
          </View>
        </VStack>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerMutedText}>New to FoodBite? </Text>
        <Link href={"/(auth)/sign-up"} replace>
          <Text style={styles.link}>Sign up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignSelf: "stretch",
    margin: ms(20),
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: ms(32),
    fontWeight: "600",
  },
  mutedText: {
    color: "#949492",
    fontSize: ms(18),
  },
  inputBox: {
    margin: ms(10),
  },
  button: {
    margin: ms(8),
  },
  footer: {
    flexDirection: "row",
  },
  footerMutedText: {
    color: "#949492",
    fontSize: ms(14),
  },
  link: {
    fontWeight: "700",
    fontSize: ms(14),
  },
});
