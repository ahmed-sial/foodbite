import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms } from "react-native-size-matters";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isFirstNameInvalid, setFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setLastNameInvalid] = useState(false);
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordInvalid, setPasswordInvalid] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = () => {
    setFirstNameInvalid(false);
    setLastNameInvalid(false);
    setEmailInvalid(false);
    setPasswordInvalid(false);

    if (firstName.trim().length < 2) {
      setFirstNameInvalid(true);
      return;
    }
    if (lastName.trim().length < 2) {
      setLastNameInvalid(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailInvalid(true);
      return;
    }
    if (password.length < 8) {
      setPasswordInvalid(true);
      return;
    }

    // TODO: call your signup API here
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>FOODBITE</Text>
          <Text style={styles.mutedText}>Create an Account</Text>
        </View>

        <VStack>
          <View style={styles.inputBox}>
            {/* First Name + Last Name side by side */}
            <HStack style={styles.nameRow}>
              {/* First Name */}
              <View style={styles.nameField}>
                <FormControl
                  isInvalid={isFirstNameInvalid}
                  size="lg"
                  isRequired
                >
                  <FormControlLabel>
                    <FormControlLabelText>FIRST NAME</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size="xl">
                    <InputField
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon
                      as={AlertCircleIcon}
                      className="text-red-500"
                    />
                    <FormControlErrorText className="text-red-500">
                      Too short.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </View>

              {/* Last Name */}
              <View style={styles.nameField}>
                <FormControl isInvalid={isLastNameInvalid} size="lg" isRequired>
                  <FormControlLabel>
                    <FormControlLabelText>LAST NAME</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size="xl">
                    <InputField
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon
                      as={AlertCircleIcon}
                      className="text-red-500"
                    />
                    <FormControlErrorText className="text-red-500">
                      Too short.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </View>
            </HStack>

            {/* Email */}
            <FormControl isInvalid={isEmailInvalid} size="lg" isRequired>
              <FormControlLabel>
                <FormControlLabelText>EMAIL</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size="xl">
                <InputField
                  type="text"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  onPress={() => setShowPassword(!showPassword)}
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

            {/* Submit */}
            <Button
              style={styles.button}
              size="xl"
              variant="solid"
              action="primary"
              disabled={isLoading}
              onPress={onSubmit}
            >
              <ButtonText>Sign up</ButtonText>
              {isLoading ? <ButtonSpinner color="gray" /> : null}
            </Button>
          </View>
        </VStack>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerMutedText}>Already have an account? </Text>
        <Link href={"/(auth)/sign-in"} replace>
          <Text style={styles.link}>Sign in</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  nameRow: {
    gap: ms(10),
  },
  nameField: {
    flex: 1,
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
