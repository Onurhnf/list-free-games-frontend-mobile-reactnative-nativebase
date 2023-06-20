import { HStack, Button, Divider } from "native-base";

export default function SortFilterHeader({
  setShowSortModal,
  setShowFilterModal,
}: any) {
  return (
    <Button.Group
      isAttached
      colorScheme="blue"
      borderRadius={0}
      variant="outline"
      justifyContent="center"
      size="md"
      divider={<Divider orientation="vertical" />}
    >
      <Button
        _dark={{ _text: { color: "white" }, borderBottomColor: "coolGray.500" }}
        onPress={() => setShowSortModal(true)}
        flex={1}
      >
        Sort
      </Button>
      <Button
        _dark={{ _text: { color: "white" }, borderBottomColor: "coolGray.500" }}
        onPress={() => setShowFilterModal(true)}
        flex={1}
      >
        Filter
      </Button>
    </Button.Group>
  );
}
