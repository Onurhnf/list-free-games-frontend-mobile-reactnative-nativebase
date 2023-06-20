import { Button, Text, Center, Modal, Radio } from "native-base";
import { SortByEnum } from "../../enums/Games/GamesParameters.enum";
import { memo } from "react";

function SortingGamesModal({
  setShowSortModal,
  showSortModal,
  setSort,
  sort,
}: any) {
  return (
    <Center>
      <Modal
        bg="#0002"
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
      >
        <Modal.Content
          borderRadius={30}
          _light={{ bg: "blueGray.200" }}
          _dark={{ bg: "coolGray.800" }}
          maxWidth="400px"
        >
          <Modal.CloseButton />
          <Modal.Header
            _light={{ bg: "blueGray.200" }}
            _dark={{ bg: "coolGray.800", _text: { color: "blueGray.300" } }}
            borderColor="trueGray.700"
            _text={{ fontWeight: "bold" }}
          >
            Sort
          </Modal.Header>
          <Modal.Body>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="sort"
              value={sort}
              onChange={(nextValue) => {
                setSort(nextValue);
              }}
            >
              {Object.keys(SortByEnum).map((item, index) => {
                return (
                  <Radio
                    mb={3}
                    _dark={{
                      bg: "coolGray.800",
                      _text: { color: "blueGray.200" },
                    }}
                    key={index}
                    value={SortByEnum[item as keyof typeof SortByEnum]}
                    my={1}
                  >
                    <Text mb={2}>{item.replaceAll("_", " ")}</Text>
                  </Radio>
                );
              })}
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer
            _light={{ bg: "blueGray.200" }}
            _dark={{ bg: "coolGray.800", _text: { color: "blueGray.300" } }}
            _text={{ fontWeight: "bold" }}
          >
            <Button
              onPress={() => setSort("")}
              variant="outline"
              colorScheme="orange"
            >
              Reset
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default memo(SortingGamesModal);
