import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

function SearchBar() {
  return (
    <Input style={styles.searchBar} size="xl" isFocused={false}>
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder="Search..." />
    </Input>
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    alignSelf: "stretch",
    margin: ms(10),
    backgroundColor: "#F1F1EC",
  },
});
