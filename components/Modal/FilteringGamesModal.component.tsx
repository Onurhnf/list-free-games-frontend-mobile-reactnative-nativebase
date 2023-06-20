import {
  Center,
  Modal,
  View,
  Text,
  Button,
  Box,
  CheckIcon,
  Select,
  VStack,
} from "native-base";
import {
  CategoryEnum,
  PlatformEnum,
} from "../../enums/Games/GamesParameters.enum";
import { memo, useState } from "react";

function FilteringGamesModal({
  setShowFilterModal,
  showFilterModal,
  setFilter,
}: any) {
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");

  return (
    <Center>
      <Modal
        bg="#0002"
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      >
        <Modal.Content
          borderRadius={30}
          _light={{ bg: "blueGray.200" }}
          _dark={{ bg: "coolGray.800" }}
          maxWidth="450px"
        >
          <Modal.CloseButton />
          <Modal.Header
            _light={{ bg: "blueGray.200" }}
            _dark={{ bg: "coolGray.800", _text: { color: "blueGray.300" } }}
            _text={{ fontWeight: "bold" }}
          >
            Filter
          </Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              <View>
                <Text fontWeight={"bold"}>Category</Text>
                <Box maxW="300">
                  <Select
                    selectedValue={category}
                    minWidth="200"
                    accessibilityLabel="Choose Category"
                    placeholder="Choose Category"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                  >
                    {Object.keys(CategoryEnum).map((item, index) => {
                      return (
                        <Select.Item
                          _dark={{
                            bg: "coolGray.800",
                            _text: { color: "blueGray.200" },
                          }}
                          key={index}
                          label={item.replaceAll("_", " ")}
                          value={
                            CategoryEnum[item as keyof typeof CategoryEnum]
                          }
                        />
                      );
                    })}
                  </Select>
                </Box>
              </View>
              <View>
                <Text fontWeight={"bold"}>Platform</Text>
                <Box maxW="300">
                  <Select
                    selectedValue={platform}
                    minWidth="200"
                    accessibilityLabel="Choose Platform"
                    placeholder="Choose Platform"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setPlatform(itemValue)}
                  >
                    {Object.keys(PlatformEnum).map((item, index) => {
                      return (
                        <Select.Item
                          _dark={{
                            bg: "coolGray.800",
                            _text: { color: "blueGray.200" },
                          }}
                          key={index}
                          label={item.replaceAll("_", " ")}
                          value={
                            PlatformEnum[item as keyof typeof PlatformEnum]
                          }
                        />
                      );
                    })}
                  </Select>
                </Box>
              </View>
            </VStack>
          </Modal.Body>
          <Modal.Footer
            _light={{ bg: "blueGray.200" }}
            _dark={{ bg: "coolGray.800", _text: { color: "blueGray.300" } }}
            _text={{ fontWeight: "bold" }}
          >
            <Button.Group isAttached size="md">
              <Button
                variant="outline"
                colorScheme="orange"
                onPress={() => {
                  setFilter({
                    platform: "",
                    category: "",
                  });
                  setCategory("");
                  setPlatform("");
                  setShowFilterModal(false);
                }}
              >
                Reset
              </Button>
              <Button
                onPress={() => {
                  setFilter({
                    platform,
                    category,
                  });
                  setShowFilterModal(false);
                }}
              >
                Filter
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default memo(FilteringGamesModal);
